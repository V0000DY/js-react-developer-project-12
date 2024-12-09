import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './utils/NavBar.jsx';
import ChannelsTab from './utils/ChannelsTab.jsx';
import ChannelInfo from './utils/ChannelInfo.jsx';
import MessageTab from './utils/MessagesTab.jsx';
import MessageForm from './utils/MessageForm.jsx';
import {
  apiSlice,
  getChannels,
  getMessages,
  selectChannelById,
  selectMessagesByChannel,
} from '../services/apiSlice.jsx';
import useAuth from '../hooks/index.jsx';
import { setDefaultChannelId } from '../services/uiSlice.js';

const ChatPage = ({ socket }) => {
  const currentChannelId = useSelector((state) => state.ui.currentChannelId);
  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    data: channels = [],
    currentChannel,
    isLoading: isChannelsLoading,
    isError: isChannelsLoadingError,
    error: channelsError,
  } = getChannels(undefined, {
    selectFromResult: (result) => ({
      ...result,
      currentChannel: selectChannelById(result, currentChannelId),
    }),
  });

  const {
    messagesFromChannel,
    isLoading: isMessagesLoading,
    isError: isMessagesLoadingError,
    error: messagesError,
  } = getMessages(undefined, {
    selectFromResult: (result) => ({
      ...result,
      messagesFromChannel: selectMessagesByChannel(result, currentChannel?.id),
    }),
  });

  const handleError = (err, source) => {
    if (err.data.message === 'Unauthorized') {
      auth.logOut();
      return;
    }
    auth.notify({
      message: t(`${source}Tab.error`, { error: err.data.message }),
      type: 'error',
    });
  };

  if (isChannelsLoadingError) {
    handleError(channelsError, 'channels');
  }

  if (isMessagesLoadingError) {
    handleError(messagesError, 'messages');
  }

  useEffect(() => {
    dispatch(setDefaultChannelId());
  }, [dispatch]);

  useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      dispatch(apiSlice.util.updateQueryData('getChannels', undefined, (draft) => {
        if (!draft.find((channel) => channel.id === newChannel.id)) {
          draft.push(newChannel);
        }
      }));
    });

    socket.on('removeChannel', ({ id }) => {
      if (currentChannelId === id) {
        dispatch(setDefaultChannelId());
      }
      dispatch(apiSlice.util.invalidateTags([{ type: 'Channel', id }]));
      dispatch(apiSlice.util.updateQueryData(
        'getMessages',
        undefined,
        (draft) => draft.filter((message) => message.channelId !== id),
      ));
    });

    socket.on('renameChannel', ({ id }) => {
      dispatch(apiSlice.util.invalidateTags([{ type: 'Channel', id }]));
    });

    socket.on('newMessage', (newMessage) => {
      dispatch(apiSlice.util.updateQueryData('getMessages', undefined, (draft) => {
        if (!draft.find((message) => message.id === newMessage.id)) {
          draft.push(newMessage);
        }
      }));
    });
  }, [socket, dispatch, currentChannelId]);

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Container className="shadow rounded h-100 overflow-hidden my-4">
        <Row className="h-100 bg-white flex-md-row">
          <ChannelsTab
            currentChannel={currentChannel}
            isChannelsLoading={isChannelsLoading}
            channels={channels}
          />
          <Col className="h-100 p-0 text-start">
            <div className="d-flex flex-column h-100">
              <ChannelInfo
                channelName={currentChannel?.name}
                messagesCount={messagesFromChannel?.length}
              />
              <MessageTab
                messages={messagesFromChannel}
                isMessagesLoading={isMessagesLoading}
              />
              <MessageForm currentChannel={currentChannel} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default memo(ChatPage);
