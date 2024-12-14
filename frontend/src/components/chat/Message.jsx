import { memo } from 'react';
import useAuth from '../../hooks';

const MessageElement = ({
  username,
  body,
}) => {
  const { auth } = useAuth();
  return (
    <div className="text-break mb-2">
      <b>{auth.filterClean(username)}</b>
      {': '}
      {auth.filterClean(body)}
    </div>
  );
};

export default memo(MessageElement);
