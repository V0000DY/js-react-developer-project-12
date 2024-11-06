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
import NavBar from './utils/NavBar.jsx';
import TextInput from './utils/TextInput.jsx';
import routes from '../routes.js';
import useAuth from '../hooks/index.jsx';
import imgUrl from '../images/RockClimber.jpeg';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв'),
  password: Yup.string()
    .min(4, 'Минимум 4 буквы')
    .max(50, 'Максимум 50 букв'),
});

const LoginPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const { data } = await axios.post(routes.loginPath(), values);
      localStorage.setItem('userId', JSON.stringify(data));
      auth.logIn();
      navigate('/', { replace: false });
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        actions.setFieldError('password', 'Неверные имя пользователя или пароль');
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
                    <h1 className="text-center mb-4">Войти</h1>
                    <TextInput controlId="username" label="Ваш ник" className="mb-3" autoComplete="username" type="text" placeholder="Введите ваш ник" ref={inputRef} />
                    <TextInput controlId="password" label="Ваш пароль" className="mb-4" autoComplete="current-password" type="password" placeholder="Введите ваш пароль" />

                    <Button type="submit" variant="outline-primary" className="w-100 mb-3">Submit</Button>
                  </Form>
                </Formik>
              </CardBody>
              <CardFooter className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  <Link to="/signup">Регистрация</Link>
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
