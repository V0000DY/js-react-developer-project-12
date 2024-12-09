import { Provider as ReduxProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import store from './services/index.jsx';
import resources from './locales/index.js';
import { AuthProvider } from './context/index.jsx';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './assets/app.scss';
import { ModalProvider } from './components/modals/index.jsx';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR,
  environment: 'production',
};

const init = async (socket) => {
  const i18nInstance = i18n.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
    });

  return (
    <ReduxProvider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <Provider config={rollbarConfig}>
          <ErrorBoundary>
            <AuthProvider>
              <ModalProvider>
                <App socket={socket} />
                <ToastContainer limit={4} />
              </ModalProvider>
            </AuthProvider>
          </ErrorBoundary>
        </Provider>
      </I18nextProvider>
    </ReduxProvider>
  );
};

export default init;
