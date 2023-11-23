/* eslint-disable functional/no-expression-statements */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';
import TopLine from './NavBarComp.jsx';

import routes from '../routes.js';

const getAuthHeader = () => {
  // @ts-ignore
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) return { Authorization: `Bearer ${userId.token}` };

  return {};
};

const PublicPage = () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      setContent(data);
      console.log(data);
    };

    fetchContent();
  }, []);

  const renderItems = (data) => {
    if (!data) return null;

    return (
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {data.map(({ id, name }) => (
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

  const renderChannel = (data) => {
    if (!data) return null;

    const { channels, currentChannelId, messages } = data;
    const currentChannelName = channels.find(({ id }) => id === currentChannelId).name;

    return (
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-">
            <b>{currentChannelName}</b>
          </p>
          <span className="text-muted">{`${messages.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {channels.map(({ id, name }) => (
            <div key={id} className="text-break mb-2">
              <b>{name}</b>
              :
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
              <Button type="submit" className="btn btn-group-vertical">
                --&gt
                <span className="visually-hidden">Отправить</span>
              </Button>
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
              <b>+</b>
            </div>
            {renderItems(content.channels)}
          </Col>
          <Col className="h-100 p-0">
            {renderChannel(content)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PublicPage;
