/* eslint-disable functional/no-expression-statements */
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
import TopLine from './NavBarComp.jsx';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import FormikInput from './FormikInput.js';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const SignupPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Минимумальная длина пароля 6 букв')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
      .required('Обязательное поле'),
  });

  const onSubmit = async (values, formikBag) => {
    console.log('Submit button pressed!');
    console.log(`FormikBag = ${JSON.stringify(formikBag, null, 2)}`);
    try {
      const res = await axios.post(routes.signupPath(), values);
      console.log(`Передано values = ${JSON.stringify(values)}. Получено в ответ res.data = ${JSON.stringify(res.data)}`);
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn(values.username);
      navigate('/', { replace: false });
    } catch (err) {
      if (err.isAxiosError && err.response.status === 409) {
        formikBag.setFieldError('username', 'Пользователь с таким именем уже существует');
        inputRef.current.select();
        return;
      }
      if (err.isAxiosError && err.response.status === 401) {
        formikBag.setFieldError('username', 'Проблема авторизации на сервере!');
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
      <TopLine />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs="12" md="8" xxl="6">
            <Card className="shadow-sm">
              <CardBody className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <Image src="https://frontend-chat-ru.hexlet.app/static/media/avatar_1.6084447160acc893a24d.jpg" roundedCircle alt="Регистрация" />
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
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <FormikInput name="username" label="Имя пользователя" className="mb-3" autoComplete="username" placeholder="username" ref={inputRef} />
                      <FormikInput name="password" label="Пароль" className="mb-3" autoComplete="current-password" type="password" />
                      <FormikInput name="confirmPassword" label="Подтвердите пароль" className="mb-4" autoComplete="current-password" type="password" />
                      <Button
                        type="submit"
                        variant="outline-primary"
                        className="w-100"
                      >
                        Зарегистрироваться
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
