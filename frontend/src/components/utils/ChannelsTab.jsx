import { memo, useContext } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { Col } from 'react-bootstrap';

import Spinner from './Spinner';
import ChannelsTabHead from './ChannelsTabHead';
import RegularChannelElement from './RegularChannelElement';
import CustomChannelElement from './CustomChannelElement';

import { setCurrentChannelId } from '../../services/uiSlice';
import { ModalContext } from '../modals/index.jsx';

const ChannelsTab = ({
  currentChannel,
  channels,
  isChannelsLoading,
}) => {
  const dispatch = useDispatch();
  const modal = useContext(ModalContext);
  const { showModal } = modal;

  const renderChannel = (id, name, removable) => {
    const buttonClass = cn({
      secondary: id === currentChannel?.id,
    });

    const handleSwitchChannel = () => {
      dispatch(setCurrentChannelId(id));
    };

    return (
      removable
        ? (
          <CustomChannelElement
            key={id}
            id={id}
            channelName={name}
            buttonClass={buttonClass}
            handleSwitchChannel={handleSwitchChannel}
            showModal={showModal}
          />
        )
        : (
          <RegularChannelElement
            key={id}
            id={id}
            channelName={name}
            buttonClass={buttonClass}
            handleSwitchChannel={handleSwitchChannel}
          />
        )
    );
  };

  return (
    <Col xs={4} md="2" className="border-end px-0 bg-light flex-column d-flex h-100">
      <ChannelsTabHead showModal={showModal} />
      {isChannelsLoading && (
        <div>
          <Spinner />
        </div>
      )}
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels
          .map(({ id, name, removable }) => renderChannel(
            id,
            name,
            removable,
          ))}
      </ul>
    </Col>
  );
};

export default memo(ChannelsTab);
