import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Col } from 'react-bootstrap';

import Spinner from './Spinner';
import ChannelsTabHead from './ChannelsTabHead';
import RegularChannelElement from './RegularChannelElement';
import CustomChannelElement from './CustomChannelElement';

import { getChannels } from '../../services/apiSlice';
import { setCurrentChannelId, setCurrentChannelName } from '../../services/uiSlice';

const ChannelsTab = () => {
  const dispatch = useDispatch();

  const {
    data: channelsList = [],
    isLoading: isChannelsListLoading,
  } = getChannels();

  const currentChannelId = useSelector((state) => state.ui.currentChannelId);

  const renderChannel = (id, name, removable) => {
    const buttonClass = cn({
      secondary: id === currentChannelId,
      light: id !== currentChannelId,
    });

    const handleSwitchChannel = () => {
      dispatch(setCurrentChannelId(id));
      dispatch(setCurrentChannelName(name));
    };

    const showModal = () => {
      console.log('showModal');
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
    <Col xs={4} md="2" className="border-end px-0 bg-light flex-column d-flex">
      <ChannelsTabHead />
      {isChannelsListLoading && (
        <div>
          <Spinner />
        </div>
      )}
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsList
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
