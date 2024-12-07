import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import { addChannel, getChannels } from '../../services/apiSlice';
import TextInput from '../utils/TextInput';
import useAuth from '../../hooks';

const Add = (props) => {
  const auth = useAuth();
  const [createChannel, { isLoading }] = addChannel();
  const { data: channels = [] } = getChannels();
  const channelsNames = channels?.map(({ name }) => name);
  const { onHide } = props;
  const inputRef = useRef();
  const { t } = useTranslation();

  const initialValues = {
    channelName: '',
  };

  const validationSchema = Yup.object().shape({
    channelName: Yup.string()
      .trim()
      .min(3, t('modals.add.yupSchema.charCount'))
      .max(20, t('modals.add.yupSchema.charCount'))
      .required(t('modals.add.yupSchema.required'))
      .notOneOf(channelsNames, t('modals.add.yupSchema.notOneOf')),
  });

  const onSubmit = async (values) => {
    try {
      const channel = {
        name: auth.filterClean(values.channelName.trim()),
      };
      await createChannel(channel).unwrap();
      onHide();
      auth.notify({
        message: t('modals.add.toasts.success'),
        type: 'success',
      });
    } catch (err) {
      if (err) {
        auth.notify({
          message: t('modals.add.toasts.error') + err.data.message,
          type: 'error',
        });
      }
      throw err;
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.add.main.title')}</Modal.Title>
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
                label={t('modals.add.main.input')}
                className="mb-2"
                autoComplete="channelName"
                placeholder="channelName"
                ref={inputRef}
              />
              <div className="d-flex justify-content-end">
                <Button variant="secondary" type="reset" className="me-2" onClick={onHide}>{t('modals.add.main.resetButton')}</Button>
                <Button variant="primary" type="submit" disabled={isLoading}>{t('modals.add.main.submitButton')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
