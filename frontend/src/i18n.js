import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

const defaultLanguage = 'ru';
const i18nInstance = i18n.createInstance();

// eslint-disable-next-line functional/no-expression-statements
i18nInstance
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
  });

export default i18nInstance;
