import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { getChannels, selectChannelById } from '../../store/apis/channelsApi.js';
import { getMessages, selectMessagesByChannel } from '../../store/apis/messagesApi.js';

const ChannelInfo = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.uiSlice.currentChannelId);

  const { currentChannel } = getChannels(undefined, {
    selectFromResult: (result) => ({
      ...result,
      currentChannel: selectChannelById(result, currentChannelId),
    }),
  });

  const {
    messagesFromChannel,
  } = getMessages(undefined, {
    selectFromResult: (result) => ({
      ...result,
      messagesFromChannel: selectMessagesByChannel(result, currentChannel?.id),
    }),
  });

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {'# '}
          {currentChannel?.name}
        </b>
      </p>
      <span className="text-muted">{t('messages.counter.count', { count: messagesFromChannel?.length })}</span>
    </div>
  );
};

export default memo(ChannelInfo);
