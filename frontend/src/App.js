/* eslint-disable functional/no-conditional-statements */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorPage from './components/ErrorPage.jsx';
import PublicPage from './components/PublicPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignUpPage.jsx';
import AuthContext from './context/index.jsx';
import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const uName = userId ? JSON.stringify(userId.username).replace(/"/g, '') : '';

  const [loggedIn, setLoggedIn] = useState(!!userId);
  const [username, setUserName] = useState(uName);

  const logIn = (userName) => {
    setLoggedIn(true);
    setUserName(userName);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
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

  return (
    <AuthContext.Provider value={{
      loggedIn,
      username,
      logIn,
      logOut,
      notify,
    }}
    >
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
  <>
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
                <PublicPage />
              </ChatRoute>
            )}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    <ToastContainer limit={4} />
  </>
);

export default App;
