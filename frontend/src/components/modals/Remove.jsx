import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { deleteChannel } from '../../services/apiSlice';
import useAuth from '../../hooks';

const Remove = (props) => {
  const auth = useAuth();
  const [removeChannel] = deleteChannel();
  const { t } = useTranslation();

  const {
    modalInfo,
    onHide,
  } = props;

  const initialValues = {};

  const onSubmit = async () => {
    const { channelId } = modalInfo;
    try {
      await removeChannel(channelId);
      onHide();
      auth.notify({
        message: t('modals.remove.toasts.success'),
        type: 'success',
      });
    } catch (err) {
      if (err) {
        auth.notify({
          message: t('modals.remove.toasts.error') + err,
          type: 'error',
        });
        return;
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
                <Button variant="danger" type="submit">{t('modals.remove.main.submitButton')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
