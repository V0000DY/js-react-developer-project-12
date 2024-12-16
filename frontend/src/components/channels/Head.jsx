import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Plus from '../../assets/Plus';

const ChannelsTabHead = ({ showModal }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-1 mb-2 ps-4 pe-2 p-4 justify-content-between">
      <b>{t('channelsTab.channelsList.title')}</b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => showModal('adding')}>
        <Plus />
        <span className="visually-hidden">{t('channelsTab.channelsList.addButton')}</span>
      </button>
    </div>
  );
};

export default memo(ChannelsTabHead);
