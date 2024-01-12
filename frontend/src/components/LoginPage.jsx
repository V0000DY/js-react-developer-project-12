/* eslint-disable functional/no-expression-statements */
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Минимум 4 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
});

const LoginPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.loginPath(), values);
        console.log(`Передано values = ${JSON.stringify(values)}. Получено в ответ res.data = ${JSON.stringify(res.data)}`);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn(values.username);
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          console.log(err);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
    validationSchema: SignupSchema,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={f.handleSubmit} className="p-3">
            <fieldset>
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  onChange={f.handleChange}
                  value={f.values.username}
                  placeholder="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  isInvalid={!!f.errors.username}
                  ref={inputRef}
                />
                <Form.Control.Feedback type="invalid">
                  {f.errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="passwprd">Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={f.handleChange}
                  value={f.values.password}
                  placeholder="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  isInvalid={!!f.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {f.errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-primary" className="mt-3">Submit</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
