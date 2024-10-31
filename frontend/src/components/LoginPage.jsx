import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from './utils/TextInput.jsx';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Минимум 4 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
});

const onSubmit = (values, formikBag) => {
  console.log(values);
  console.log(formikBag);
};

const LoginPage = () => (
  <>
    <div>
      <h1>Login!</h1>
    </div>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <TextInput name='username' label='Ваш ник' type='text' placeholder='Введите ваш ник' />
        <TextInput name='password' label='Ваш пароль' type='password' placeholder='Введите ваш пароль' />

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  </>
);

export default LoginPage;
