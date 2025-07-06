import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // NEW: loading state

  useEffect(() => {
    const syncAuthFromStorage = () => {
      const storedEmail = sessionStorage.getItem('user');
      const storedName = sessionStorage.getItem('username');
      const storedToken = sessionStorage.getItem('token');

      setUserEmail(storedEmail);
      setUserName(storedName);
      setToken(storedToken);
      setLoading(false); // Done loading after sync
    };

    syncAuthFromStorage();
    window.addEventListener('storage', syncAuthFromStorage);

    return () => {
      window.removeEventListener('storage', syncAuthFromStorage);
    };
  }, []);

  const login = (email, token, name) => {
    console.log('AuthContext: login function called with:', { email, token, name });

    sessionStorage.setItem('user', email);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', name);

    setUserEmail(email);
    setToken(token);
    setUserName(name);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');

    setUserEmail(null);
    setToken(null);
    setUserName(null);

    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ userEmail, userName, token, login, logout, loading }} // include loading
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
