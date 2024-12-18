import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';

const Head = ({ showModal }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-1 mb-2 ps-4 pe-2 p-4 justify-content-between">
      <b>{t('channels.channelsList.title')}</b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => showModal('adding')}>
        <PlusSquare size={20} />
        <span className="visually-hidden">{t('channels.channelsList.addButton')}</span>
      </button>
    </div>
  );
};

export default memo(Head);
