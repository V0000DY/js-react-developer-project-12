import { useRef, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getMessages, selectMessagesByChannel } from '../../store/apis/messagesApi.js';
import Spinner from '../Spinner.jsx';
import Message from './Message.jsx';

const renderMessage = ({
  id,
  username,
  body,
}) => <Message key={id} username={username} body={body} />;

const Chat = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.uiSlice.currentChannelId);
  const {
    messagesFromChannel,
    isLoading: isMessagesLoading,
    isError: isMessagesLoadingError,
    error: messagesError,
  } = getMessages(undefined, {
    selectFromResult: (result) => ({
      ...result,
      messagesFromChannel: selectMessagesByChannel(result, currentChannelId),
    }),
  });

  const messageBox = useRef(null);

  useEffect(() => {
    if (isMessagesLoadingError) {
      toast.error(t('messages.error', { error: messagesError.error }));
    }
  }, [isMessagesLoadingError, messagesError, t]);

  useEffect(() => {
    const { scrollHeight } = messageBox.current;
    messageBox.current.scrollTo(0, scrollHeight);
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-3" ref={messageBox}>
      {isMessagesLoading && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      {messagesFromChannel && messagesFromChannel.map(renderMessage)}
    </div>
  );
};

export default memo(Chat);
