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
import { apiSlice } from './services/apiSlice.jsx';
import { setDefaultChannelId } from './services/uiSlice.js';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR,
  environment: 'production',
};

const init = async (socket) => {
  const i18nInstance = i18n.createInstance();

  const listenerNewChannel = (payload) => {
    store.dispatch(apiSlice.util.updateQueryData('getChannels', undefined, (draft) => {
      if (!draft.find((channel) => channel.id === payload.id)) {
        draft.push(payload);
      }
    }));
  };

  const listenerRemoveChannel = (payload) => {
    const { id } = payload;
    const { currentChannelId } = store.getState().ui;
    if (currentChannelId === id) {
      store.dispatch(setDefaultChannelId());
    }
    store.dispatch(apiSlice.util.invalidateTags([{ type: 'Channel', id }]));
    store.dispatch(apiSlice.util.updateQueryData(
      'getMessages',
      undefined,
      (draft) => draft.filter((message) => message.channelId !== id),
    ));
  };

  const listenerRenameChannel = (payload) => {
    const { id } = payload;
    store.dispatch(apiSlice.util.invalidateTags([{ type: 'Channel', id }]));
  };

  const listenerNewMessage = (payload) => {
    store.dispatch(apiSlice.util.updateQueryData('getMessages', undefined, (draft) => {
      if (!draft.find((message) => message.id === payload.id)) {
        draft.push(payload);
      }
    }));
  };

  socket.on('newChannel', listenerNewChannel);
  socket.on('removeChannel', listenerRemoveChannel);
  socket.on('renameChannel', listenerRenameChannel);
  socket.on('newMessage', listenerNewMessage);

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
                <App />
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
