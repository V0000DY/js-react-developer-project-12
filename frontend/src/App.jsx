import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './components/LoginPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<ErrorPage />}/>
      <Route path="/login" element={<LoginPage />}/>
    </Routes>
  </BrowserRouter>
);

export default App;
