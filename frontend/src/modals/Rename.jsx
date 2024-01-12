/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect } from 'react';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { allChannels, actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as uiActions } from '../slices/uiSlice.js';

const Rename = (props) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const channelsNames = useSelector(allChannels).map(({ name }) => name);

  const {
    modalInfo,
    onHide,
    socket,
    emit,
  } = props;

  const schema = yup.object().shape({
    name: yup.string()
      .notOneOf(channelsNames, 'Канал с таким именем уже существует!'),
  });

  const f = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: () => {
      const renamedChannel = {
        id: modalInfo.channelId,
        name: f.values.name,
      };
      console.log(renamedChannel);
      emit(socket, 'renameChannel', renamedChannel);
      socket.on('renameChannel', (channel) => {
        dispatch(channelsActions.renameChannel({
          id: channel.id,
          changes: { name: channel.name },
        }));
        console.log(channel);
        dispatch(uiActions.setCurrentChannelId(channel.id));
        onHide();
      });
    },
    validationSchema: schema,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              name="name"
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              data-testid="input-name"
              className="mb-2"
              isInvalid={!!f.errors.name}
            />
            <FormControl.Feedback type="invalid">
              {f.errors.name}
            </FormControl.Feedback>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" type="submit" className="me-2" onClick={onHide}>Отменить</Button>
            <Button variant="primary" type="submit">Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
