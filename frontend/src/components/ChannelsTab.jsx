/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { io } from 'socket.io-client';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { allChannels } from '../slices/channelsSlice.js';
import { actions as uiActions, uiSelector } from '../slices/uiSlice.js';
import getModal from '../modals/index.js';
import useAuth from '../hooks/index.jsx';

const socket = io('http://localhost:5001');

const ChannelsTab = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [modalInfo, setModalInfo] = useState({ type: null, channelId: null });
  const channelsList = useSelector(allChannels);
  const currentChannelId = useSelector(uiSelector);
  const { t } = useTranslation();

  if (!channelsList) return null;

  const emit = (socketIO, event, arg) => {
    socketIO.timeout(5000).emit(event, arg, (err) => {
      // eslint-disable-next-line functional/no-conditional-statements
      if (err) {
        auth.notify({
          message: t('channelsTab.errors.socketIoError', { evt: event, error: err }),
          type: 'error',
        });
        emit(socketIO, event, arg);
      }
    });
  };

  const renderModal = (
    modInfo,
    hideModal,
  ) => {
    const { type } = modInfo;
    if (!type) return null;
    const Component = getModal(type);
    return <Component onHide={hideModal} modalInfo={modInfo} socket={socket} emit={emit} />;
  };

  const renderChannel = (id, name, removable, curChannelId, handleSwitchChannel, showModal) => {
    const buttonClass = cn(
      {
        secondary: id === curChannelId,
        light: id !== curChannelId,
      },
    );
    const regularChannel = (
      <li key={id} className="nav-item w-100">
        <Button variant={buttonClass} className="w-100 rounded-0 text-start btn" onClick={handleSwitchChannel(id)}>
          <span className="me-1">#</span>
          {name}
        </Button>
      </li>
    );
    const customChannel = (
      <li key={id} className="nav-item w-100">
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button variant={buttonClass} className="w-100 rounded-0 text-start btn" onClick={handleSwitchChannel(id)}>
            <span className="me-1">#</span>
            {auth.filterClean(name)}
          </Button>
          <Dropdown.Toggle split variant={buttonClass} id="dropdown-split-secondary" className="flex-grow-0 rounded-0" />
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={() => showModal('removing', id)}>{t('channelsTab.dropdownMenu.delete')}</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={() => showModal('renaming', id)}>{t('channelsTab.dropdownMenu.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
    return (removable ? customChannel : regularChannel);
  };

  const showModal = (type, channelId = null) => setModalInfo({ type, channelId });
  const hideModal = () => setModalInfo({ type: null, channelId: null });

  const handleChannelClick = (channelId) => () => {
    dispatch(uiActions.setCurrentChannelId(channelId));
  };

  return (
    <>
      <div className="d-flex mt-1 mb-2 ps-4 pe-2 p-4 justify-content-between">
        <b>{t('channelsTab.channelsList.title')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => showModal('adding')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          <span className="visually-hidden">{t('channelsTab.channelsList.addButton')}</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsList
          .map(({ id, name, removable }) => renderChannel(
            id,
            name,
            removable,
            currentChannelId,
            handleChannelClick,
            showModal,
          ))}
      </ul>
      {renderModal(
        modalInfo,
        hideModal,
      )}
    </>
  );
};

export default ChannelsTab;
