import {
  useState,
  memo,
  useRef,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { addMessage } from '../../store/apis/messagesApi.js';
import ChatInputBtn from './ChatInputBtn.jsx';

const MessageForm = ({ currentChannel }) => {
  const [createMessage] = addMessage();
  const [inputText, setInputText] = useState('');
  const { username } = useSelector((state) => state.authSlice);
  const { t } = useTranslation();
  const inputRef = useRef();

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    const message = {
      body: filter.clean(inputText),
      username,
      channelId: currentChannel.id,
    };
    try {
      await createMessage(message).unwrap();
      setInputText('');
    } catch (err) {
      if (err) {
        toast.error(t('messages.messageForm.error') + err.data.message);
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
