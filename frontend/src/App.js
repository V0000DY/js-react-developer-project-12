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

import ErrorPage from './components/ErrorPage.jsx';
import PublicPage from './components/PublicPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import AuthContext from './context/index.jsx';
import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserName] = useState('');

  const logIn = (userName) => {
    setLoggedIn(true);
    setUserName(userName);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      loggedIn,
      username,
      logIn,
      logOut,
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
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
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
);

export default App;
