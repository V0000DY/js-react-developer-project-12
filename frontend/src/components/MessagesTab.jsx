/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react';
import {
  Form,
  InputGroup,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import { allChannels } from '../slices/channelsSlice.js';
import { actions as messagesActions, selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { uiSelector } from '../slices/uiSlice.js';

const socket = io('http://localhost:5001');

const emit = (socketIO, event, arg) => {
  socketIO.timeout(2000).emit(event, arg, (err) => {
    // eslint-disable-next-line functional/no-conditional-statements
    if (err) {
      console.log(`При отправке события ${event} произошла ошибка ${err}. Повторная отправка через 2 секунды`);
      emit(socketIO, event, arg);
    }
  });
};

const MessagesTab = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [inputText, setInputText] = useState('');
  const channels = useSelector(allChannels);
  const currentChannelId = useSelector(uiSelector);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const { t } = useTranslation();

  if (!currentChannelId) return null;

  const currentChannelName = channels.find(({ id }) => id === currentChannelId).name;

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      entity: inputText,
      username: auth.username,
      channelId: currentChannelId,
    };
    emit(socket, 'newMessage', message);
    socket.on('newMessage', (newMessage) => {
      dispatch(messagesActions.addMessage(newMessage));
    });
    setInputText('');
  };

  const onChange = (e) => setInputText(e.target.value);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {'# '}
            {currentChannelName}
          </b>
        </p>
        <span className="text-muted">{t('messages.counter.count', { count: currentMessages.length })}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {currentMessages && currentMessages
          .map(({ id, username, entity }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>
              {': '}
              {entity}
            </div>
          ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Введите сообщение..."
              aria-label="Новое сообщение"
              name="body"
              id="inputEl"
              autoFocus
              value={inputText}
              onChange={onChange}
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
              <span className="visually-hidden">Отправить</span>
            </button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default MessagesTab;
