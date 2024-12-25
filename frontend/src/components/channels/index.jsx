import { memo, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { Col } from 'react-bootstrap';

import Spinner from '../Spinner.jsx';
import Head from './Head.jsx';
import RegularChannelElement from './RegularChannelElement.jsx';
import CustomChannelElement from './CustomChannelElement.jsx';

import { setCurrentChannelId } from '../../store/slices/uiSlice.js';
import { ModalContext } from '../../context/modalsProvider.jsx';
import { getChannels, selectChannelById } from '../../store/apis/channelsApi.js';

const Channels = ({ size }) => {
  const dispatch = useDispatch();
  const modal = useContext(ModalContext);
  const { showModal } = modal;
  const { currentChannelId } = useSelector((state) => state.uiSlice);
  const { t } = useTranslation();

  const {
    data: channels = [],
    currentChannel,
    isLoading: isChannelsLoading,
    isError: isChannelsLoadingError,
    error: channelsError,
  } = getChannels(undefined, {
    selectFromResult: (result) => ({
      ...result,
      currentChannel: selectChannelById(result, currentChannelId),
    }),
  });

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

  useEffect(() => {
    if (isChannelsLoadingError) {
      toast.error(t('channels.error', { error: channelsError.error }));
    }
  }, [isChannelsLoadingError, channelsError, t]);

  return (
    <Col sm={size} lg="2" className="border-end px-0 bg-light flex-column d-flex h-100">
      <Head showModal={showModal} />
      {isChannelsLoading && (
        <div className="text-center">
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

export default memo(Channels);
