import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import NavBar from './utils/NavBar.jsx';
import imgUrl from '../assets/Observer.svg';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <div className="text-center">
        <Image
          alt={t('errorPage.main')}
          className="h-25"
          fluid
          src={imgUrl}
        />
        <h1 className="h4 text-muted">{t('errorPage.main')}</h1>
        <p>
          {t('errorPage.p')}
          <Link to="/">{t('errorPage.link')}</Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
