import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

const defaultLanguage = 'ru';
const i18nInstance = i18n.createInstance();

i18nInstance
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    resources,
  });

export default i18nInstance;
