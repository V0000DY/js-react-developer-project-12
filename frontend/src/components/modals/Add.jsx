import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Modal,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { addChannel, getChannels } from '../../store/apis/channelsApi.js';

const Add = (props) => {
  const { onHide } = props;
  const inputRef = useRef();
  const { t } = useTranslation();
  const [createChannel, { isLoading }] = addChannel();
  const { data: channels = [] } = getChannels();
  const channelsNames = channels?.map(({ name }) => name);

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const channel = {
          name: filter.clean(values.channelName.trim()),
        };
        await createChannel(channel).unwrap();
        onHide();
        toast.success(t('modals.rename.toasts.success'));
      } catch (err) {
        toast.error(t('modals.add.toasts.error') + err.data.message);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.add.main.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <FloatingLabel
              className="mb-2"
              controlId="channelName"
              label={t('modals.add.main.input')}
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
            <Button variant="secondary" type="reset" className="me-2" onClick={onHide}>{t('modals.add.main.resetButton')}</Button>
            <Button variant="primary" type="submit" disabled={isLoading}>{t('modals.add.main.submitButton')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
