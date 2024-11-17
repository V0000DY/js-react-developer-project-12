import { memo } from 'react';

const MessageElement = ({
  username,
  body,
}) => {
  console.log(`Компонент MessageElement отрисован в ${new Date().toLocaleTimeString()}`);
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {body}
    </div>
  );
};

export default memo(MessageElement);
