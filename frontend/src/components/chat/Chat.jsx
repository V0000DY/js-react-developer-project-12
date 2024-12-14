import { useRef, memo, useEffect } from 'react';
import Spinner from '../common/Spinner.jsx';
import Message from './Message.jsx';

const renderMessage = ({
  id,
  username,
  body,
}) => <Message key={id} username={username} body={body} />;

const MessageTab = ({ messages, isMessagesLoading }) => {
  const messageBox = useRef(null);

  useEffect(() => {
    const { scrollHeight } = messageBox.current;
    messageBox.current.scrollTo(0, scrollHeight);
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messageBox}>
      {isMessagesLoading && <Spinner />}
      {messages && messages.map(renderMessage)}
    </div>
  );
};

export default memo(MessageTab);
