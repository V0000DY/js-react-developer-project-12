import { memo } from 'react';
import { Button } from 'react-bootstrap';

const RegularChannelElement = ({
  channelName,
  buttonClass,
  handleSwitchChannel,
}) => (
  <li className="nav-item w-100">
    <Button variant={buttonClass} className="w-100 rounded-0 text-start btn" onClick={() => handleSwitchChannel()}>
      <span className="me-1">#</span>
      {channelName}
    </Button>
  </li>
);

export default memo(RegularChannelElement);
