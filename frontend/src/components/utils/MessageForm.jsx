import { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup } from 'react-bootstrap';
import useAuth from '../../hooks/index.jsx';
import { addMessage } from '../../services/apiSlice.jsx';
import MessageInputBtn from './MessageInputBtn.jsx';

const MessageForm = ({ currentChannel }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [createMessage] = addMessage();
  const [inputText, setInputText] = useState('');

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const message = {
      body: inputText,
      username: auth.username,
      channelId: currentChannel.id,
    };
    createMessage(message);
    setInputText('');
  };

  const onChange = (e) => setInputText(e.target.value);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={handleSubmitMessage}>
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            placeholder={t('messagesTab.input.placeholder')}
            aria-label={t('messagesTab.input.aria_label')}
            name="body"
            id="inputEl"
            autoFocus
            value={inputText}
            onChange={onChange}
            className="border-0 p-0 ps-2"
          />
          <MessageInputBtn />
        </InputGroup>
      </Form>
    </div>
  );
};

export default memo(MessageForm);
