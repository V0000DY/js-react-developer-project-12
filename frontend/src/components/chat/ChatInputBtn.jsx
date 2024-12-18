import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const MessageInputBtn = ({ disabled }) => {
  const { t } = useTranslation();

  return (
    <button type="submit" className="btn btn-group-vertical" disabled={disabled}>
      <ArrowRightSquare size={20} />
      <span className="visually-hidden">{t('messages.input.sendButton')}</span>
    </button>
  );
};

export default memo(MessageInputBtn);
