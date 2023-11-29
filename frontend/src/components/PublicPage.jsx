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
  // @ts-ignore
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
