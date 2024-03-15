import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import TopLine from './NavBarComp.jsx';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <TopLine />
      <Container fluid className="h-100">
        <Row className="row justify-content-center align-content-center h-100">
          <Col xs="12" md="8" xxl="6">
            <h1>{t('errorPage.main.title')}</h1>
          </Col>
        </Row>
      </Container>
    </div>
    // <div className="container-fluid">
    //   <div className="row justify-content-center pt-5">
    //     <div className="col-sm-4">
    //     </div>
    //   </div>
    // </div>
  );
};

export default ErrorPage;
