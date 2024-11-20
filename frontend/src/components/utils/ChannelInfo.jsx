import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import useAuth from '../../hooks';

const ChannelInfo = ({ channelName, messagesCount }) => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {'# '}
          {auth.filterClean(channelName)}
        </b>
      </p>
      <span className="text-muted">{t('messagesTab.counter.count', { count: messagesCount })}</span>
    </div>
  );
};

export default memo(ChannelInfo);
