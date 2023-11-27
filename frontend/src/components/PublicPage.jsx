/* eslint-disable functional/no-expression-statements */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from 'react-bootstrap';
import TopLine from './NavBarComp.jsx';

import routes from '../routes.js';

import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { actions as messagesActions, selectors as messagesSelectors } from '../slices/messagesSlice.js';

const getAuthHeader = () => {
  // @ts-ignore
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) return { Authorization: `Bearer ${userId.token}` };

  return {};
};

const PublicPage = () => {
  const [currentChannelId, setCurrentChannelId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      setCurrentChannelId(data.currentChannelId);
      console.log(data);
      dispatch(channelsActions.addChannels(data.channels));
      dispatch(messagesActions.addMessages(data.messagess));
    };

    fetchContent();
  }, [dispatch]);

  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);

  const renderItems = (channelsList) => {
    if (!channelsList) return null;

    return (
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsList.map(({ id, name }) => (
          <li key={id} className="nav-item w-100">
            <button type="button" className="w-100 rounded-0 text-start btn">
              <span className="me-1">#</span>
              {name}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const renderChannel = (channelId) => {
    if (!channelId) return null;

    const currentChannelName = channels.find(({ id }) => id === channelId).name;

    return (
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {'# '}
              {currentChannelName}
            </b>
          </p>
          <span className="text-muted">{`${messages.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages && messages.map(({ id, name }) => (
            <div key={id} className="text-break mb-2">
              <b>{name}</b>
              {': '}
              {id}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form noValidate className="py-1 border rounded-2">
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Введите сообщение..."
                aria-label="Новое сообщение"
                name="body"
                className="border-0 p-0 ps-2"
              />
              <button type="submit" disabled className="btn btn-group-vertical border-0">
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
                <span className="visually-hidden">Отправить</span>
              </button>
            </InputGroup>
          </Form>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column vh-100">
      <TopLine />
      <Container className="shadow rounded h-100 overflow-hidden my-4">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md="2" className="border-end px-0 bg-light flex-column d-flex">
            <div className="d-flex mt-1 mb-2 ps-4 pe-2 p-4 justify-content-between">
              <b>Каналы</b>
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
                <span className="visually-hidden">+</span>
              </button>
            </div>
            {renderItems(channels)}
          </Col>
          <Col className="h-100 p-0">
            {renderChannel(currentChannelId)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PublicPage;
