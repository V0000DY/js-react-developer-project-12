import { useSelector } from 'react-redux';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { memo } from 'react';
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

const ChatPage = () => {
  const currentChannelId = useSelector((state) => state.ui.currentChannelId);

  const {
    data: channels = [],
    currentChannel,
    isLoading: isChannelsLoading,
  } = getChannels(undefined, {
    selectFromResult: (result) => ({
      ...result,
      currentChannel: selectChannelById(result, currentChannelId),
    }),
  });

  const {
    messagesFromChannel,
    isLoading: isMessagesLoading,
  } = getMessages(undefined, {
    selectFromResult: (result) => ({
      ...result,
      messagesFromChannel: selectMessagesByChannel(result, currentChannel?.id),
    }),
  });

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
