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

const Rename = (props) => {
  // const auth = useAuth();
  const [renameChannel] = editChannel();
  const { modalInfo, onHide } = props;
  const { data: channels = [] } = getChannels();
  const channelsNames = channels?.map(({ name }) => name);
  const inputRef = useRef();
  const { t } = useTranslation();

  const initialValues = {
    channelName: '',
  };

  const validationSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, t('modals.rename.yupSchema.min'))
      .max(20, t('modals.rename.yupSchema.max'))
      .notOneOf(channelsNames, t('modals.rename.yupSchema.notOneOf')),
  });

  const onSubmit = async (values) => {
    try {
      const renamedChannel = {
        id: modalInfo.channelId,
        editedChannel: { name: values.channelName },
      };
      await renameChannel(renamedChannel);
      onHide();
      // auth.notify({
      //   message: t('modals.rename.toasts.success'),
      //   type: 'success',
      // });
    } catch (err) {
      if (err) {
      //   auth.notify({
      //     message: t('modals.rename.toasts.error') + err,
      //     type: 'error',
      //   });
      //   return;
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
                ref={inputRef}
              />
              <div className="d-flex justify-content-end">
                <Button variant="secondary" type="reset" className="me-2" onClick={onHide}>{t('modals.rename.main.resetButton')}</Button>
                <Button variant="primary" type="submit">{t('modals.rename.main.submitButton')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
