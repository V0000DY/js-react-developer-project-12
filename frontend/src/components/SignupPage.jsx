import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
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
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import TextInput from './utils/TextInput.jsx';
import imgUrl from '../images/Celebrator.jpg';
import NavBar from './utils/NavBar.jsx';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const SignupPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signupPage.yupSchema.username.charCount'))
      .max(20, t('signupPage.yupSchema.username.charCount'))
      .required(t('signupPage.yupSchema.username.required')),
    password: Yup.string()
      .min(6, t('signupPage.yupSchema.password.min'))
      .required(t('signupPage.yupSchema.password.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signupPage.yupSchema.confirmPassword.oneOf'))
      .required(t('signupPage.yupSchema.confirmPassword.required')),
  });

  const onSubmit = async (values, formikBag) => {
    try {
      const res = await axios.post(routes.signupPath(), values);
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn(values.username);
      navigate('/', { replace: false });
    } catch (err) {
      if (err.isAxiosError && err.code === 'ERR_NETWORK') {
        auth.notify({
          message: t('signupPage.errors.axiosErrors.ERR_NETWORK'),
          type: 'error',
        });
        return;
      }
      if (err.isAxiosError && err.response.status === 409) {
        formikBag.setFieldError('username', t('signupPage.errors.axiosErrors.409'));
        inputRef.current.select();
        return;
      }
      throw err;
    }
  };

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
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  {({ handleSubmit }) => (
                    <Form
                      onSubmit={handleSubmit}
                      className="w-50"
                    >
                      <h1 className="text-center mb-4">{t('signupPage.main.title')}</h1>
                      <TextInput controlId="username" label={t('signupPage.main.inputs.username')} className="mb-3" autoComplete="username" placeholder="username" ref={inputRef} />
                      <TextInput controlId="password" label={t('signupPage.main.inputs.password')} className="mb-3" autoComplete="current-password" type="password" placeholder="Type your password" />
                      <TextInput controlId="confirmPassword" label={t('signupPage.main.inputs.confirmPassword')} className="mb-4" autoComplete="current-password" type="password" placeholder="Repeat your password" />
                      <Button
                        type="submit"
                        variant="outline-primary"
                        className="w-100"
                      >
                        {t('signupPage.main.submitButton')}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;
