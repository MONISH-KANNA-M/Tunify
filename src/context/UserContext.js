import { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Check for existing session/token
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        // You might want to validate the token with your backend here
        setIsAuthenticated(true);
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
      }
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setFavorites([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const addToFavorites = (track) => {
    setFavorites(prev => [...prev, track]);
  };

  const removeFromFavorites = (trackId) => {
    setFavorites(prev => prev.filter(track => track.id !== trackId));
  };

  return (
    <UserContext.Provider 
      value={{
        user,
        isAuthenticated,
        favorites,
        login,
        logout,
        addToFavorites,
        removeFromFavorites
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
