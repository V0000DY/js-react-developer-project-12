import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './i18n.js';
import './index.css';

import App from './App.jsx';
import store from './services/index.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
