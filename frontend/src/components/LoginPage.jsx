/* eslint-disable functional/no-expression-statements */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
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
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              setAuthFailed(false);

              try {
                const res = await axios.post(routes.loginPath(), values);
                localStorage.setItem('userId', JSON.stringify(res.data));
                auth.logIn();
                const { from } = location.state;
                navigate(from);
              } catch (err) {
                if (err.isAxiosError && err.response.status === 401) {
                  setAuthFailed(true);
                  inputRef.current.select();
                  return;
                }
                throw err;
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit} className="p-3">
                <fieldset>
                  <Form.Group>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      value={values.username}
                      placeholder="username"
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                    />
                    {errors.username && touched.username ? (
                      <div>{errors.username}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="passwprd">Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                      placeholder="password"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="mt-3">Submit</Button>
                </fieldset>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
