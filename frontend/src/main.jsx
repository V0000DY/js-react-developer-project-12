import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import './index.css';

import App from './App.jsx';
import store from './services/index.jsx';
import i18nInstance from './i18n.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18nInstance}>
      <App />
    </I18nextProvider>
  </Provider>,
);
