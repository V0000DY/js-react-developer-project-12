import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';

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
  <div className="container-fluid">
    <div className="row justify-content-center pt-5">
      <div className="col-sm-4">
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log(values); // eslint-disable-line
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

export default LoginPage;
