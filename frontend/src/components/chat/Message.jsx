import { memo } from 'react';

const MessageElement = ({
  username,
  body,
}) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

export default memo(MessageElement);
