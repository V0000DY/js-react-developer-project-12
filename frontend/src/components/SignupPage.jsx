import React, {
  forwardRef,
  memo,
  useEffect,
  useRef,
} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Form,
  CardBody,
  FloatingLabel,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import imgUrl from '../assets/Celebrator.jpg';
import NavBar from './utils/NavBar.jsx';
import { userSignup } from '../services/apiSlice.jsx';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const Input = ({
  className,
  controlId,
  label,
  isInvalid,
  onChange,
  value,
  autoComplete,
  placeholder,
  type,
  error,
}, ref) => (
  <Form.Group>
    <FloatingLabel
      className={className}
      controlId={controlId}
      label={label}
    >
      <Form.Control
        isInvalid={isInvalid}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        name={controlId}
        type={type}
        ref={ref}
        required
      />
      <Form.Control.Feedback type="invalid" tooltip>
        {error}
      </Form.Control.Feedback>
    </FloatingLabel>
  </Form.Group>
);

const FormInput = memo(forwardRef(Input));

const SignupPage = () => {
  const [signup] = userSignup();
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .min(3, t('signupPage.yupSchema.username.charCount'))
      .max(20, t('signupPage.yupSchema.username.charCount')),
    password: Yup.string()
      .min(6, t('signupPage.yupSchema.password.min')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signupPage.yupSchema.confirmPassword.oneOf')),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const signupData = await signup({
          username: values.username.trim(),
          password: values.password,
          confirmPassword: values.confirmPassword,
        }).unwrap();
        localStorage.setItem('userId', JSON.stringify(signupData));
        auth.logIn(values.username);
        navigate('/', { replace: false });
      } catch (err) {
        if (err.status === 409) {
          formik.errors.username = ' ';
          formik.errors.password = ' ';
          formik.errors.confirmPassword = t('signupPage.errors.409');
          inputRef.current.select();
        } else {
          auth.notify({
            message: t('signupPage.errors.FETCH_ERROR'),
            type: 'error',
          });
        }
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <NavBar />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs="12" md="8" xxl="6">
            <Card className="shadow-sm">
              <CardBody className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <Image src={imgUrl} roundedCircle alt="Регистрация" />
                <Form
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-center mb-4">{t('signupPage.main.title')}</h1>
                  <FormInput
                    className="mb-3"
                    controlId="username"
                    label={t('signupPage.main.inputs.username')}
                    isInvalid={formik.errors.username && formik.touched.username}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    autoComplete="username"
                    placeholder={t('signupPage.main.inputs.username')}
                    name="username"
                    type="text"
                    error={formik.errors.username}
                    ref={inputRef}
                    required
                  />
                  <FormInput
                    className="mb-4"
                    controlId="password"
                    label={t('signupPage.main.inputs.password')}
                    isInvalid={formik.errors.password && formik.touched.password}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    autoComplete="new-password"
                    placeholder={t('signupPage.main.inputs.password')}
                    name="password"
                    type="password"
                    error={formik.errors.password}
                    required
                  />
                  <FormInput
                    className="mb-4"
                    controlId="confirmPassword"
                    label={t('signupPage.main.inputs.confirmPassword')}
                    isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    autoComplete="new-password"
                    placeholder={t('loginPage.main.inputs.password.placeholder')}
                    name="confirmPassword"
                    type="password"
                    error={formik.errors.confirmPassword}
                    required
                  />
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100"
                  >
                    {t('signupPage.main.submitButton')}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default memo(SignupPage);
