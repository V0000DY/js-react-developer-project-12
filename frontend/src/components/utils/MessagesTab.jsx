import { useRef, memo, useEffect } from 'react';
import Spinner from './Spinner.jsx';
import MessageElement from './MessageElement.jsx';
import { getMessages } from '../../services/apiSlice.jsx';

const renderMessage = ({
  id,
  username,
  body,
}) => <MessageElement key={id} username={username} body={body} />;

const MessageTab = () => {
  const messageBox = useRef(null);

  const {
    data: messagesList = [],
    isLoading: isMessagesListLoading,
  } = getMessages();

  useEffect(() => {
    const { scrollTop, scrollHeight, clientHeight } = messageBox.current;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    if (scrollPercentage > 90) {
      messageBox.current.scrollTo(0, scrollHeight);
    }
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messageBox}>
      {isMessagesListLoading && <Spinner />}
      {messagesList && messagesList.map(renderMessage)}
    </div>
  );
};

export default memo(MessageTab);
