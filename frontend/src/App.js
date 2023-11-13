import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

import ErrorPage from './components/ErrorPage.jsx';
import PublicPage from './components/PublicPage.jsx';
import LoginPage from './components/LoginPage.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<PublicPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
