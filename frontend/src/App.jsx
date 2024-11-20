import { useMemo, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import filter from 'leo-profanity';
import LoginPage from './components/LoginPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import AuthContext from './context/index.jsx';
import useAuth from './hooks/index.jsx';
import SignupPage from './components/SignupPage.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './assets/app.scss';
import './App.css';

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

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
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
    <ToastContainer limit={4} />
  </AuthProvider>
);

export default App;
