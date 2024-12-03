import { useMemo, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer, toast } from 'react-toastify';
import filter from 'leo-profanity';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
// eslint-disable-next-line import/no-cycle
import store from './services/index.jsx';
import resources from './locales/index.js';
import AuthContext from './context/index.jsx';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './assets/app.scss';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR,
  environment: 'production',
};

export const socket = io('/');

export const newChannelListener = (lifecycleApi) => socket.on('newChannel', (newChannel) => {
  lifecycleApi.updateCachedData((draft) => {
    draft.push(newChannel);
  });
});

export const removeChannelListener = (lifecycleApi, setDefaultChannelId) => socket.on('removeChannel', ({ id }) => {
  const state = lifecycleApi.getState();
  const { currentChannelId } = state.ui;
  if (currentChannelId === id) {
    lifecycleApi.dispatch(setDefaultChannelId());
  }
  lifecycleApi.updateCachedData((draft) => draft.filter((channel) => channel.id !== id));
});

export const renameChannelListener = (lifecycleApi) => socket.on('renameChannel', (renamedChannel) => {
  const { id, name } = renamedChannel;
  lifecycleApi.updateCachedData((draft) => {
    const originalChannel = draft.find((channel) => channel.id === id);
    originalChannel.name = name;
  });
});

export const newMessageListener = (lifecycleApi) => socket.on('newMessage', (newMessage) => {
  lifecycleApi.updateCachedData((draft) => {
    draft.push(newMessage);
  });
});

export const deleteChannelListener = (lifecycleApi) => socket.on('removeChannel', ({ id }) => {
  lifecycleApi.updateCachedData(
    (draft) => draft.filter((message) => message.channelId !== id),
  );
});

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const userName = userId ? JSON.stringify(userId.username).replace(/"/g, '') : '';

  filter.list();
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  filter.list();

  const [loggedIn, setLoggedIn] = useState(!!userId);
  const [username, setUsername] = useState(userName);

  const logIn = (name) => {
    setLoggedIn(true);
    setUsername(name);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setUsername('');
  };

  const notify = ({ message, type }) => {
    const props = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    };
    switch (type) {
      case 'info':
        return toast.info(message, props);
      case 'success':
        return toast.success(message, props);
      case 'warning':
        return toast.warn(message, props);
      case 'error':
        return toast.error(message, props);
      default:
        return toast(message, props);
    }
  };

  const filterClean = (phrase) => filter.clean(phrase);

  const authContextMemoValue = useMemo(() => (
    {
      loggedIn,
      username,
      logIn,
      logOut,
      notify,
      filterClean,
    }
  ), [username, loggedIn]);

  return (
    <AuthContext.Provider value={authContextMemoValue}>
      {children}
    </AuthContext.Provider>
  );
};

const RunApp = () => {
  const i18nInstance = i18n.createInstance();
  i18nInstance
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
              <App />
              <ToastContainer limit={4} />
            </AuthProvider>
          </ErrorBoundary>
        </Provider>
      </I18nextProvider>
    </ReduxProvider>
  );
};

export default RunApp;
