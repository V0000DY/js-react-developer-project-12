import { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import TextInput from '../utils/TextInput';
import { editChannel, getChannels } from '../../services/apiSlice';
import useAuth from '../../hooks';

const Rename = (props) => {
  const auth = useAuth();
  const [renameChannel, { isLoading }] = editChannel();
  const { modalInfo, onHide } = props;
  const { data: channels = [] } = getChannels();
  const channelsNames = channels?.map(({ name }) => name);
  const currentChannel = channels.filter(({ id }) => id === modalInfo.channelId);
  const inputRef = useRef();
  const { t } = useTranslation();

  const initialValues = {
    channelName: '',
  };

  const validationSchema = Yup.object().shape({
    channelName: Yup.string()
      .trim()
      .min(3, t('modals.rename.yupSchema.charCount'))
      .max(20, t('modals.rename.yupSchema.charCount'))
      .notOneOf(channelsNames, t('modals.rename.yupSchema.notOneOf')),
  });

  const onSubmit = async (values) => {
    try {
      const renamedChannel = {
        id: modalInfo.channelId,
        editedChannel: { name: auth.filterClean(values.channelName.trim()) },
      };
      await renameChannel(renamedChannel).unwrap();
      onHide();
      auth.notify({
        message: t('modals.rename.toasts.success'),
        type: 'success',
      });
    } catch (err) {
      if (err) {
        auth.notify({
          message: t('modals.rename.toasts.error') + err.data.message,
          type: 'error',
        });
      }
      throw err;
    }
  };

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.rename.main.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <TextInput
                controlId="channelName"
                label={t('modals.rename.main.input')}
                className="mb-2"
                autoComplete="channelName"
                placeholder="channelName"
                value={currentChannel[0].name}
                ref={inputRef}
              />
              <div className="d-flex justify-content-end">
                <Button variant="secondary" type="reset" className="me-2" onClick={onHide}>{t('modals.rename.main.resetButton')}</Button>
                <Button variant="primary" type="submit" disabled={isLoading}>{t('modals.rename.main.submitButton')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
