import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';
import cn from 'classnames';
import Spinner from './utils/Spinner.jsx';
import NavBar from './utils/NavBar.jsx';
import { getChanels } from '../services/channelsApi.jsx';
import { getMessages } from '../services/messagesApi.jsx';

const renderChannel = (id, name, currentChannelId) => {
  const buttonClass = cn({
    secondary: id === currentChannelId,
    light: id !== currentChannelId,
  });
  const regularChannel = (
    <li key={id} className="nav-item w-100">
      <Button variant={buttonClass} className="w-100 rounded-0 text-start btn">
        <span className="me-1">#</span>
        {name}
      </Button>
    </li>
  );
  return regularChannel;
};

const ChatPage = () => {
  const {
    data: channelsList = [],
    isLoading: isChannelsListLoading,
  } = getChanels();
  const {
    data: messagesList = [],
    isLoading: ismessagesListLoading,
  } = getMessages();

  return (
    <div className="d-flex flex-column vh-100">
      <NavBar />
      <Container className="shadow rounded h-100 overflow-hidden my-4">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md="2" className="border-end px-0 bg-light flex-column d-flex">
            <div className="d-flex mt-1 mb-2 ps-4 pe-2 p-4 justify-content-between">
              <b>Channels list</b>
              <button type="button" className="p-0 text-primary btn btn-group-vertical">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                  />
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
                <span className="visually-hidden">Add channel</span>
              </button>
            </div>
            {isChannelsListLoading && <Spinner />}
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
              {channelsList
                .map(({ id, name }) => renderChannel(id, name))}
            </ul>
          </Col>
          <Col className="h-100 p-0 text-start">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    {'# '}
                    currentChannelName
                  </b>
                </p>
                <span className="text-muted">curMes.leng</span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5">
                <div className="text-break mb-2">
                  {ismessagesListLoading && <Spinner />}
                  {messagesList && messagesList
                    .map(({ id, username, entity }) => (
                      <div key={id} className="text-break mb-2">
                        <b>{username}</b>
                        {': '}
                        {entity}
                      </div>
                    ))}
                  <b>username</b>
                  {': '}
                  message
                </div>
              </div>
              <div className="mt-auto px-5 py-3">
                <Form noValidate className="py-1 border rounded-2">
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="messagesTab.input.placeholder"
                      aria-label="messagesTab.input.aria_label"
                      name="body"
                      id="inputEl"
                      autoFocus
                      className="border-0 p-0 ps-2"
                    />
                    <button type="submit" className="btn btn-group-vertical border-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                        />
                      </svg>
                      <span className="visually-hidden">messagesTab.input.sendButton</span>
                    </button>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatPage;
