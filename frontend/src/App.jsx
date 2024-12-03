import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import useAuth from './hooks/index.jsx';
import SignupPage from './components/SignupPage.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './assets/app.scss';

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={(
          <ChatRoute>
            <ChatPage />
          </ChatRoute>
        )}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
