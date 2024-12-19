import { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import {
  Modal,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { editChannel, getChannels } from '../../store/apis/channelsApi.js';

const Rename = (props) => {
  const { modalInfo, onHide } = props;
  const inputRef = useRef();
  const { t } = useTranslation();
  const [renameChannel, { isLoading }] = editChannel();
  const { data: channels = [] } = getChannels();
  const channelsNames = channels?.map(({ name }) => name);
  const currentChannel = channels.find(({ id }) => id === modalInfo.channelId);

  const initialValues = {
    channelName: currentChannel.name,
  };

  const validationSchema = Yup.object().shape({
    channelName: Yup.string()
      .trim()
      .min(3, t('modals.rename.yupSchema.charCount'))
      .max(20, t('modals.rename.yupSchema.charCount'))
      .notOneOf(channelsNames, t('modals.rename.yupSchema.notOneOf')),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const renamedChannel = {
          id: modalInfo.channelId,
          editedChannel: { name: filter.clean(values.channelName.trim()) },
        };
        await renameChannel(renamedChannel).unwrap();
        onHide();
        toast.success(t('modals.rename.toasts.success'));
      } catch (err) {
        toast.error(t('modals.rename.toasts.error') + err.data.message);
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.rename.main.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <FloatingLabel
              className="mb-2"
              controlId="channelName"
              label={t('modals.rename.main.input')}
            >
              <Form.Control
                isInvalid={formik.errors.channelName && formik.touched.channelName}
                onChange={formik.handleChange}
                value={formik.values.channelName}
                autoComplete="channelName"
                name="channelName"
                type="text"
                ref={inputRef}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.channelName}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" type="reset" className="me-2" onClick={onHide}>{t('modals.rename.main.resetButton')}</Button>
            <Button variant="primary" type="submit" disabled={isLoading}>{t('modals.rename.main.submitButton')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
