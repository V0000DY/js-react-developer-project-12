import React, {
  memo,
  useEffect,
  useRef,
} from 'react';
import { useFormik } from 'formik';
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
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar.jsx';
import imgUrl from '../../assets/loginBanner.jpg';
import { userLogin } from '../../store/apis/authApi.js';
import { resetAuthError, selectIsAuthError } from '../../store/slices/authSlice.js';
import routes from '../../routes.js';

const initialValues = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fetchLoginData] = userLogin();
  const inputRef = useRef();
  const authFailed = useSelector(selectIsAuthError);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        await fetchLoginData(values).unwrap();
        navigate(routes.pages.getChatPage());
      } catch (err) {
        inputRef.current.select();
        if (err.status === 'FETCH_ERROR') {
          toast.error(t('loginPage.errors.FETCH_ERROR'));
        }
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    dispatch(resetAuthError());
  }, [dispatch]);

  return (
    <div className="d-flex flex-column vh-100">
      <NavBar />
      <Container fluid className="h-100">
        <Row className="row justify-content-center align-content-center h-100">
          <Col xs="12" md="8" xxl="6">
            <Card className="shadow-sm">
              <CardBody className="row p-5">
                <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                  <Image src={imgUrl} roundedCircle fluid alt="Enter" />
                </Col>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('loginPage.main.title')}</h1>
                  <Form.Group>
                    <FloatingLabel
                      className="mb-3"
                      controlId="username"
                      label={t('loginPage.main.inputs.username.label')}
                    >
                      <Form.Control
                        isInvalid={authFailed}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        autoComplete="username"
                        placeholder={t('loginPage.main.inputs.password.placeholder')}
                        name="username"
                        type="text"
                        ref={inputRef}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group>
                    <FloatingLabel
                      className="mb-4"
                      controlId="password"
                      label={t('loginPage.main.inputs.password.label')}
                    >
                      <Form.Control
                        isInvalid={authFailed}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        autoComplete="current-password"
                        placeholder={t('loginPage.main.inputs.password.placeholder')}
                        name="password"
                        type="password"
                        required
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t('loginPage.errors.401')}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 mb-3"
                    disabled={formik.isSubmitting}
                  >
                    {t('loginPage.main.submitButton')}
                  </Button>
                </Form>
              </CardBody>
              <CardFooter className="p-4">
                <div className="text-center">
                  <span>
                    {t('loginPage.main.bottom.question')}
                    {' '}
                  </span>
                  <Link to={routes.pages.getSignupPage()}>{t('loginPage.main.bottom.registration')}</Link>
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
