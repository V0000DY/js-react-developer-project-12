import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const renderModal = (
  modalInfo,
  hideModal,
) => {
  const { type } = modalInfo;
  if (!type) return null;
  const Component = modals[type];
  return <Component onHide={hideModal} modalInfo={modalInfo} />;
};

export default renderModal;
