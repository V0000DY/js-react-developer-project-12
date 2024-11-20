import { useSelector } from 'react-redux';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './utils/NavBar.jsx';
import ChannelsTab from './utils/ChannelsTab.jsx';
import ChannelInfo from './utils/ChannelInfo.jsx';
import MessageTab from './utils/MessagesTab.jsx';
import MessageForm from './utils/MessageForm.jsx';
import {
  getChannels,
  getMessages,
  selectChannelById,
  selectMessagesByChannel,
} from '../services/apiSlice.jsx';
import useAuth from '../hooks/index.jsx';

const ChatPage = () => {
  const currentChannelId = useSelector((state) => state.ui.currentChannelId);
  const auth = useAuth();
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

  const handleError = (err) => {
    auth.notify({
      message: t('channelsTab.errors.socketIoError', { error: err.data.message }),
      type: 'error',
    });
  };

  if (isChannelsLoadingError) {
    handleError(channelsError);
  }

  if (isMessagesLoadingError) {
    handleError(messagesError);
  }

  return (
    <div className="d-flex flex-column vh-100">
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
