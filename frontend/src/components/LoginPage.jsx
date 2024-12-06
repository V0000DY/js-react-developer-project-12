import React, { memo, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
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
import useAuth from '../hooks/index.jsx';
import imgUrl from '../assets/RockClimber.jpeg';
// eslint-disable-next-line import/no-cycle
import { userLogin } from '../services/apiSlice.jsx';

const initialValues = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const [login] = userLogin();
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, t('loginPage.yupSchema.username.min'))
      .max(50, t('loginPage.yupSchema.username.max')),
    password: Yup.string()
      .min(4, t('loginPage.yupSchema.password.min'))
      .max(50, t('loginPage.yupSchema.password.max')),
  });

  const onSubmit = async (values, actions) => {
    try {
      const loginData = await login(values).unwrap();
      localStorage.setItem('userId', JSON.stringify(loginData));
      auth.logIn(loginData.username);
      navigate('/', { replace: false });
    } catch (err) {
      if (err.status === 'FETCH_ERROR') {
        auth.notify({
          message: t('loginPage.errors.FETCH_ERROR'),
          type: 'error',
        });
      }
      if (err.status === 401) {
        actions.setFieldError('password', t('loginPage.errors.401'));
      }
      inputRef.current.select();
      throw err;
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
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => {
                    console.log(`touched = ${JSON.stringify(touched, null, 2)} errors = ${JSON.stringify(errors, null, 2)}`); // оставил ввывод в консоль, чтобы было видно, что ошибка приходит из setFieldError
                    return (
                      <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                        <h1 className="text-center mb-4">{t('loginPage.main.title')}</h1>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            autoComplete="username"
                            placeholder={t('loginPage.main.inputs.username.placeholder')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            ref={inputRef}
                          />
                          <label htmlFor="username">{t('loginPage.main.inputs.username.label')}</label>
                        </div>
                        <div className="form-floating mb-4">
                          <input
                            type="password"
                            className="form-control is-invalid"
                            id="password"
                            autoComplete="current-password"
                            placeholder={t('loginPage.main.inputs.password.placeholder')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <label htmlFor="password">{t('loginPage.main.inputs.password.label')}</label>
                          <div className="invalid-tooltip">{errors.password}</div>
                        </div>
                        <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={isSubmitting}>
                          {t('loginPage.main.submitButton')}
                        </Button>
                      </Form>
                    );
                  }}
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

export default memo(LoginPage);
