import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  deleteChannel,
  deleteMessage,
  getMessages,
  selectMessagesByChannel,
} from '../../services/apiSlice';
import useAuth from '../../hooks';

const Remove = ({ modalInfo, onHide }) => {
  const { channelId } = modalInfo;
  const { messagesFromChannel } = getMessages(undefined, {
    selectFromResult: (result) => ({
      messagesFromChannel: selectMessagesByChannel(result, channelId),
    }),
  });
  const [removeChannel, { isLoading }] = deleteChannel();
  const [removeMessage] = deleteMessage();
  const { t } = useTranslation();
  const auth = useAuth();

  const initialValues = {};

  const onSubmit = async () => {
    try {
      await removeChannel(channelId).unwrap();
      messagesFromChannel.forEach(({ id }) => removeMessage(id).unwrap());
      onHide();
      auth.notify({
        message: t('modals.remove.toasts.success'),
        type: 'success',
      });
    } catch (err) {
      if (err) {
        auth.notify({
          message: t('modals.remove.toasts.error') + err.data.message,
          type: 'error',
        });
      }
      throw err;
    }
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.remove.main.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <p className="lead">{t('modals.remove.main.caution')}</p>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" type="submit" className="me-2" onClick={onHide}>{t('modals.remove.main.resetButton')}</Button>
                <Button variant="danger" type="submit" disabled={isLoading}>{t('modals.remove.main.submitButton')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
