import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getMessages } from '../../services/apiSlice';

const ChannelInfo = () => {
  const { t } = useTranslation();
  const {
    data: messagesList = [],
  } = getMessages();
  const currentChannelName = useSelector((state) => state.ui.currentChannelName);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {'# '}
          {currentChannelName}
        </b>
      </p>
      <span className="text-muted">{t('messagesTab.counter.count', { count: messagesList.length })}</span>
    </div>
  );
};

export default memo(ChannelInfo);
