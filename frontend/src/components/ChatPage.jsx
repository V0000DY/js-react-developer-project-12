import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import NavBar from './utils/NavBar.jsx';
import ChannelsTab from './utils/ChannelsTab.jsx';
import ChannelInfo from './utils/ChannelInfo.jsx';
import MessageTab from './utils/MessagesTab.jsx';
import MessageForm from './utils/MessageForm.jsx';

const ChatPage = () => (
  <div className="d-flex flex-column vh-100">
    <NavBar />
    <Container className="shadow rounded h-100 overflow-hidden my-4">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsTab />
        <Col className="h-100 p-0 text-start">
          <div className="d-flex flex-column h-100">
            <ChannelInfo />
            <MessageTab />
            <MessageForm />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default ChatPage;
