import { useSelector } from 'react-redux';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import NavBar from '../NavBar.jsx';
import Channels from '../channels/index.jsx';
import ChatHead from '../chat/ChatHead.jsx';
import Chat from '../chat/Chat.jsx';
import ChatForm from '../chat/ChatForm.jsx';
import { getChannels, selectChannelById } from '../../store/apis/channelsApi.js';
import { getMessages, selectMessagesByChannel } from '../../store/apis/messagesApi.js';

const ChatPage = () => {
  const currentChannelId = useSelector((state) => state.uiSlice.currentChannelId);
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

  useEffect(() => {
    const handleError = (err, source) => {
      toast.error(t(`${source}.error`, { error: err.error }));
    };

    if (isChannelsLoadingError) {
      handleError(channelsError, 'channels');
    }

    if (isMessagesLoadingError) {
      handleError(messagesError, 'messages');
    }
  }, [isChannelsLoadingError, isMessagesLoadingError, channelsError, messagesError, t]);

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Container className="shadow rounded h-100 overflow-hidden my-4">
        <Row className="h-100 bg-white flex-md-row">
          <Channels
            currentChannel={currentChannel}
            isChannelsLoading={isChannelsLoading}
            channels={channels}
          />
          <Col className="h-100 p-0 text-start">
            <div className="d-flex flex-column h-100">
              <ChatHead
                channelName={currentChannel?.name}
                messagesCount={messagesFromChannel?.length}
              />
              <Chat
                messages={messagesFromChannel}
                isMessagesLoading={isMessagesLoading}
              />
              <ChatForm currentChannel={currentChannel} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default memo(ChatPage);
