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

const Add = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const channelsNames = useSelector(allChannels).map(({ name }) => name);
  const { onHide, socket, emit } = props;

  const initialValues = {
    channelName: '',
  };

  const validationSchema = Yup.object().shape({
    channelName: Yup.string()
      .required(t('modals.add.yupSchema.required'))
      .notOneOf(channelsNames, t('modals.add.yupSchema.notOneOf')),
  });

  const onSubmit = async (values) => {
    try {
      const channel = {
        name: values.channelName,
      };
      emit(socket, 'newChannel', channel);
      socket.on('newChannel', (newChannel) => {
        dispatch(channelsActions.addChannel(newChannel));
        dispatch(uiActions.setCurrentChannelId(newChannel.id));
      });
      onHide();
      auth.notify({
        message: t('modals.add.toasts.success'),
        type: 'success',
      });
    } catch (err) {
      if (err) {
        auth.notify({
          message: t('modals.add.toasts.error') + err,
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
              <FormikInput
                name="channelName"
                label={t('modals.add.main.input')}
                className="mb-2"
                autoComplete="channelName"
                placeholder="channelName"
                ref={inputRef}
              />
              <div className="d-flex justify-content-end">
                <Button variant="secondary" type="reset" className="me-2" onClick={onHide}>{t('modals.add.main.resetButton')}</Button>
                <Button variant="primary" type="submit">{t('modals.add.main.submitButton')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
