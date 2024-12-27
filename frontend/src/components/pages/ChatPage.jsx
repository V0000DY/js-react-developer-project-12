import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { memo, useEffect, useState } from 'react';
import NavBar from '../NavBar.jsx';
import Channels from '../channels/index.jsx';
import ChatHead from '../chat/ChatHead.jsx';
import Chat from '../chat/Chat.jsx';
import ChatForm from '../chat/ChatForm.jsx';
import SideBar from '../channels/MobileSideBar.jsx';

const ChatPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Container className="shadow rounded h-100 overflow-hidden my-4">
        <Row className="h-100 bg-white flex-md-row">
          {isMobile
            ? (
              <SideBar />
            )
            : (
              <Channels
                size={4}
              />
            )}
          <Col className="h-100 p-0 text-start">
            <div className="d-flex flex-column h-100">
              <ChatHead />
              <Chat />
              <ChatForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default memo(ChatPage);
