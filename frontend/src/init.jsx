import { Provider as ReduxProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import filter from 'leo-profanity';
import ru from './locales/ru.js';
import en from './locales/en.js';
import store from './store/index.js';
import { ModalProvider } from './context/modalsProvider.jsx';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './assets/app.scss';
import { channelsApi } from './store/apis/channelsApi.js';
import { messagesApi } from './store/apis/messagesApi.js';
import { setDefaultChannelId } from './store/slices/uiSlice.js';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR,
  environment: 'production',
};

const init = async (socket) => {
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  filter.list();

  const i18nInstance = i18n.createInstance();

  const resources = {
    ru,
    en,
  };

  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
    });

  const listenerNewChannel = (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      if (!draft.find((channel) => channel.id === payload.id)) {
        draft.push(payload);
      }
    }));
  };

  const listenerRemoveChannel = (payload) => {
    const { id } = payload;
    const { currentChannelId } = store.getState().uiSlice;
    if (currentChannelId === id) {
      store.dispatch(setDefaultChannelId());
    }
    store.dispatch(channelsApi.util.invalidateTags([{ type: 'Channel', id }]));
    store.dispatch(messagesApi.util.updateQueryData(
      'getMessages',
      undefined,
      (draft) => draft.filter((message) => message.channelId !== id),
    ));
  };

  const listenerRenameChannel = (payload) => {
    const { id } = payload;
    store.dispatch(channelsApi.util.invalidateTags([{ type: 'Channel', id }]));
  };

  const listenerNewMessage = (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
      if (!draft.find((message) => message.id === payload.id)) {
        draft.push(payload);
      }
    }));
  };

  socket.on('newChannel', listenerNewChannel);
  socket.on('removeChannel', listenerRemoveChannel);
  socket.on('renameChannel', listenerRenameChannel);
  socket.on('newMessage', listenerNewMessage);

  return (
    <ReduxProvider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <Provider config={rollbarConfig}>
          <ErrorBoundary>
            <ModalProvider>
              <App />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                progress={undefined}
                theme="light"
                limit={4}
              />
            </ModalProvider>
          </ErrorBoundary>
        </Provider>
      </I18nextProvider>
    </ReduxProvider>
  );
};

export default init;
