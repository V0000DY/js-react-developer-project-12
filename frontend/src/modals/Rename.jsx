/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect } from 'react';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { allChannels, actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as uiActions } from '../slices/uiSlice.js';
import FormikInput from '../components/FormikInput.js';
import useAuth from '../hooks/index.jsx';

const Rename = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const channelsNames = useSelector(allChannels).map(({ name }) => name);

  const {
    modalInfo,
    onHide,
    socket,
    emit,
  } = props;

  const initialValues = {
    channelName: '',
  };

  const validationSchema = Yup.object().shape({
    channelName: Yup.string()
      .notOneOf(channelsNames, t('modals.rename.yupSchema.notOneOf')),
  });

  const onSubmit = async (values) => {
    try {
      console.log('Переименование сработало!');
      const renamedChannel = {
        id: modalInfo.channelId,
        name: values.channelName,
      };
      emit(socket, 'renameChannel', renamedChannel);
      socket.on('renameChannel', (channel) => {
        dispatch(channelsActions.renameChannel({
          id: channel.id,
          changes: { name: channel.name },
        }));
        dispatch(uiActions.setCurrentChannelId(channel.id));
      });
      onHide();
      auth.notify({
        message: t('modals.rename.toasts.success'),
        type: 'success',
      });
    } catch (err) {
      if (err) {
        auth.notify({
          message: t('modals.rename.toasts.error') + err,
          type: 'error',
        });
        return;
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
              <FormikInput
                controlId="channelName"
                label={t('modals.rename.main.input')}
                className="mb-2"
                autoComplete="channelName"
                placeholder="channelName"
                ref={inputRef}
              />
              <div className="d-flex justify-content-end">
                <Button variant="secondary" type="submit" className="me-2" onClick={onHide}>{t('modals.rename.main.resetButton')}</Button>
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
