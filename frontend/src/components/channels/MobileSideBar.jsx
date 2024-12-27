import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Offcanvas } from 'react-bootstrap';
import Channels from './index';

const SideBar = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col
        xs={1}
        as={Button}
        variant="primary"
        className="d-sm-none text-center p-0"
        onClick={handleShow}
      >
        <p
          className="m-1"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {t('channels.sideBar.button')}
        </p>
      </Col>
      <Offcanvas
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t('channels.sideBar.title')}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Channels
            size={12}
            handleCloseSideBar={handleClose}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
