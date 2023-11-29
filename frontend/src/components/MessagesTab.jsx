import React from 'react';
import {
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { uiSelector } from '../slices/uiSlice.js';

const MessagesTab = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const channelId = useSelector(uiSelector);

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

export default MessagesTab;
