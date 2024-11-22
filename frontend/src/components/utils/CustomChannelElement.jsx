import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import useAuth from '../../hooks';

const CustomChannelElement = ({
  id,
  channelName,
  buttonClass,
  showModal,
  handleSwitchChannel,
}) => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button variant={buttonClass} className="w-100 rounded-0 text-start text-truncate" onClick={() => handleSwitchChannel()}>
          <span className="me-1">#</span>
          {auth.filterClean(channelName)}
        </Button>
        <Dropdown.Toggle split variant={buttonClass} id={`dropdown-split-secondary:${id}`} className="flex-grow-0">
          <span className="visually-hidden">{t('channelsTab.dropdownMenu.toggleMenu')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('removing', id)}>{t('channelsTab.dropdownMenu.delete')}</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('renaming', id)}>{t('channelsTab.dropdownMenu.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default memo(CustomChannelElement);
