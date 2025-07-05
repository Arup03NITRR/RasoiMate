import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null); // This is the state we're tracking
  const [token, setToken] = useState(null);

  // Sync state from localStorage on mount and listen for changes (other tabs)
  useEffect(() => {
    const syncAuthFromStorage = () => {
      const storedEmail = localStorage.getItem('user');
      const storedName = localStorage.getItem('username'); // Fetch username from localStorage
      const storedToken = localStorage.getItem('token');

      setUserEmail(storedEmail);
      setUserName(storedName); // Update userName state from localStorage
      setToken(storedToken);
    };

    syncAuthFromStorage();

    window.addEventListener('storage', syncAuthFromStorage);

    return () => {
      window.removeEventListener('storage', syncAuthFromStorage);
    };
  }, []);

  const login = (email, token, name) => {
    // --- ADDED FOR DEBUGGING ---
    console.log('AuthContext: login function called with:', { email, token, name });
    // --- END DEBUGGING ---

    localStorage.setItem('user', email);
    localStorage.setItem('token', token);
    localStorage.setItem('username', name); // Store the username in localStorage

    setUserEmail(email);
    setToken(token);
    setUserName(name); // Set the userName state

    navigate('/generate');
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Clear username from localStorage

    setUserEmail(null);
    setToken(null);
    setUserName(null); // Clear userName state

    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ userEmail, userName, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);