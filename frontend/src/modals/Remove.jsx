/* eslint-disable functional/no-expression-statements */
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { allChannels, actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions, selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { uiSelector, actions as uiActions } from '../slices/uiSlice.js';

const Remove = (props) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(uiSelector);
  const channels = useSelector(allChannels);
  const messages = useSelector(messagesSelectors.selectAll);
  const {
    modalInfo,
    onHide,
    socket,
    emit,
  } = props;
  const f = useFormik({
    initialValues: {},
    onSubmit: () => {
      const removedChannel = {
        id: modalInfo.channelId,
      };
      emit(socket, 'removeChannel', removedChannel);
      socket.on('removeChannel', (channel) => {
        dispatch(channelsActions.removeChannel(channel.id));
        const deletedMessagesIds = messages
          .filter(({ channelId }) => channelId === channel.id)
          .map(({ id }) => id);
        dispatch(messagesActions.removeMessages(deletedMessagesIds));
        // eslint-disable-next-line functional/no-conditional-statements
        if (channel.id === currentChannelId) {
          dispatch(uiActions.setCurrentChannelId(channels[0].id));
        }
        onHide();
      });
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <p className="lead">Уверены?</p>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" type="submit" className="me-2" onClick={onHide}>Отменить</Button>
            <Button variant="danger" type="submit">Удалить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
