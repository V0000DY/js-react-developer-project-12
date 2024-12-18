import {
  useState,
  memo,
  useRef,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth.jsx';
import { addMessage } from '../../store/apiSlice.jsx';
import ChatInputBtn from './ChatInputBtn.jsx';

const MessageForm = ({ currentChannel }) => {
  const [createMessage] = addMessage();
  const [inputText, setInputText] = useState('');
  const { auth } = useAuth();
  const { t } = useTranslation();
  const inputRef = useRef();

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    const message = {
      body: inputText,
      username: auth.username,
      channelId: currentChannel.id,
    };
    try {
      await createMessage(message).unwrap();
      setInputText('');
    } catch (err) {
      if (err) {
        auth.toastify({
          message: t('messages.messageForm.error') + err.data.message,
          type: 'error',
        });
      }
      throw err;
    }
  };

  const onChange = (e) => setInputText(e.target.value);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={handleSubmitMessage}>
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            placeholder={t('messages.input.placeholder')}
            aria-label={t('messages.input.aria_label')}
            name="body"
            id="inputEl"
            ref={inputRef}
            autoFocus
            value={inputText}
            onChange={onChange}
            className="border-0 p-0 ps-2"
          />
          <ChatInputBtn disabled={!inputText} />
        </InputGroup>
      </Form>
    </div>
  );
};

export default memo(MessageForm);
