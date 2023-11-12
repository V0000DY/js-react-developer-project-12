import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import PublicPage from './components/PublicPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
