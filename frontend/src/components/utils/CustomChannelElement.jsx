import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

const CustomChannelElement = ({
  id,
  channelName,
  buttonClass,
  showModal,
  handleSwitchChannel,
}) => {
  const { t } = useTranslation();

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button variant={buttonClass} className="w-100 rounded-0 text-start btn" onClick={() => handleSwitchChannel()}>
          <span className="me-1">#</span>
          {channelName}
        </Button>
        <Dropdown.Toggle split variant={buttonClass} id="dropdown-split-secondary" className="flex-grow-0 rounded-0" />
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={() => showModal('removing', id)}>{t('channelsTab.dropdownMenu.delete')}</Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={() => showModal('renaming', id)}>{t('channelsTab.dropdownMenu.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default memo(CustomChannelElement);
