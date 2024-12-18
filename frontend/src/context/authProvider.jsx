import { useMemo, useState, createContext } from 'react';
import filter from 'leo-profanity';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
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

  const filterClean = (phrase) => filter.clean(phrase);

  const authContextMemoValue = useMemo(() => (
    {
      loggedIn,
      username,
      logIn,
      logOut,
      filterClean,
    }
  ), [username, loggedIn]);

  return (
    <AuthContext.Provider value={authContextMemoValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
