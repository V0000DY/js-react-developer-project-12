/* eslint-disable functional/no-expression-statements */

import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import TopLine from './NavBarComp.jsx';
import ChannelsTab from './ChannelsTab.jsx';
import MessagesTab from './MessagesTab.jsx';

import routes from '../routes.js';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as uiActions } from '../slices/uiSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) return { Authorization: `Bearer ${userId.token}` };

  return {};
};

const PublicPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      console.log(data);
      dispatch(uiActions.setCurrentChannelId(data.currentChannelId));
      dispatch(channelsActions.addChannels(data.channels));
      dispatch(messagesActions.addMessages(data.messages));
    };

    fetchContent();
  }, [dispatch]);

  return (
    <div className="d-flex flex-column vh-100">
      <TopLine />
      <Container className="shadow rounded h-100 overflow-hidden my-4">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md="2" className="border-end px-0 bg-light flex-column d-flex">
            <ChannelsTab />
          </Col>
          <Col className="h-100 p-0">
            <MessagesTab />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PublicPage;
