import { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });
  
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const login = (userData, token) => {
    console.log('Login called with:', { userData, token });
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
    localStorage.removeItem('favorites');
  };

  const addToFavorites = (song) => {
    setFavorites(prev => {
      if (!prev.some(f => f.songId === song.songId)) {
        return [...prev, song];
      }
      return prev;
    });
  };

  const removeFromFavorites = (songId) => {
    setFavorites(prev => prev.filter(f => f.songId !== songId));
  };

  const isFavorite = (songId) => {
    return favorites.some(f => f.songId === songId);
  };

  const value = {
    user,
    isAuthenticated,
    favorites,
    login,
    logout,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
