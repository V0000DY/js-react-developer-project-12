import React, { useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Image,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import NavBar from './utils/NavBar.jsx';
import TextInput from './utils/TextInput.jsx';
import routes from '../routes.js';
import useAuth from '../hooks/index.jsx';
import imgUrl from '../images/RockClimber.jpeg';

const initialValues = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, t('loginPage.yupSchema.username.min'))
      .max(50, t('loginPage.yupSchema.username.max'))
      .required(t('loginPage.yupSchema.username.required')),
    password: Yup.string()
      .min(4, t('loginPage.yupSchema.password.min'))
      .max(50, t('loginPage.yupSchema.password.max'))
      .required(t('loginPage.yupSchema.password.required')),
  });

  const onSubmit = async (values, actions) => {
    try {
      const { data } = await axios.post(routes.loginPath(), values);
      localStorage.setItem('userId', JSON.stringify(data));
      auth.logIn();
      navigate('/', { replace: false });
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        actions.setFieldError('password', t('loginPage.errors.axiosErrors.401'));
        inputRef.current.select();
        return;
      }
      console.log(err);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      <NavBar />
      <Container fluid className="h-100">
        <Row className="row justify-content-center align-content-center h-100">
          <Col xs="12" md="8" xxl="6">
            <Card className="shadow-sm">
              <CardBody className="row p-5">
                <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                  <Image src={imgUrl} roundedCircle alt="Enter" />
                </Col>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">{t('loginPage.main.title')}</h1>
                    <TextInput controlId="username" label={t('loginPage.main.inputs.username.label')} className="mb-3" autoComplete="username" type="text" placeholder={t('loginPage.main.inputs.username.placeholder')} ref={inputRef} />
                    <TextInput controlId="password" label={t('loginPage.main.inputs.password.label')} className="mb-4" autoComplete="current-password" type="password" placeholder={t('loginPage.main.inputs.password.placeholder')} />

                    <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('loginPage.main.submitButton')}</Button>
                  </Form>
                </Formik>
              </CardBody>
              <CardFooter className="p-4">
                <div className="text-center">
                  <span>
                    {t('loginPage.main.bottom.question')}
                    {' '}
                  </span>
                  <Link to="/signup">{t('loginPage.main.bottom.registration')}</Link>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
