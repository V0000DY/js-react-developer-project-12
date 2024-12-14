import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './components/pages/LoginPage.jsx';
import ErrorPage from './components/pages/ErrorPage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';
import SignupPage from './components/pages/SignupPage.jsx';
import PrivateRoute from './components/pages/PrivateRoute.jsx';
import routes from './routes.js';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.pages.errorPage()} element={<ErrorPage />} />
      <Route path={routes.pages.loginPage()} element={<LoginPage />} />
      <Route path={routes.pages.signupPage()} element={<SignupPage />} />
      <Route element={<PrivateRoute />}>
        <Route path={routes.pages.chatPage()} element={<ChatPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
