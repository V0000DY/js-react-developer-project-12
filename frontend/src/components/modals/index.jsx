import { createContext, useMemo, useState } from 'react';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

export const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [modalInfo, setModalInfo] = useState({ type: null, channelId: null });
  const showModal = (type, channelId = null) => {
    setModalInfo({ type, channelId });
  };
  const hideModal = () => {
    setModalInfo({ type: null, channelId: null });
  };
  const { type } = modalInfo;

  const Component = modals[type];

  const modalContextMemoValue = useMemo(() => ({
    modalInfo,
    showModal,
  }), [modalInfo]);

  return (
    <ModalContext.Provider value={modalContextMemoValue}>
      {children}
      { type ? <Component onHide={hideModal} modalInfo={modalInfo} /> : null }
    </ModalContext.Provider>
  );
};
