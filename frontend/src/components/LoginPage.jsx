import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
});

const LoginPage = () => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validationSchema={SignupSchema}
    onSubmit={(values) => {
      console.log(values); // eslint-disable-line
    }}
  >
    {({ errors, touched }) => (
      <Form>
        <Field name="username" />
        {errors.username && touched.username ? (
          <div>{errors.username}</div>
        ) : null}
        <Field name="password" />
        {errors.password && touched.password ? (
          <div>{errors.password}</div>
        ) : null}
        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);

export default LoginPage;
