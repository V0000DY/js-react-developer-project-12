import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <h1>{t('errorPage.main.title')}</h1>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
