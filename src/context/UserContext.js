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

  // Load favorites from server on login
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !isAuthenticated) {
          setFavorites([]);
          return;
        }

        const response = await fetch('http://localhost:5000/api/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to load favorites');
        }

        const favorites = await response.json();
        setFavorites(favorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, [isAuthenticated]);

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

  const addToFavorites = async (song) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          songId: song.id.toString(),
          title: song.title,
          artist: song.artist,
          albumArt: song.albumArt,
          audioUrl: song.url
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add to favorites');
      }

      const updatedFavorites = await response.json();
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (songId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Convert songId to string if it's not already
      const songIdStr = songId.toString();

      const response = await fetch(`http://localhost:5000/api/favorites/${songIdStr}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }

      // Update local state immediately
      setFavorites(prev => prev.filter(f => f.songId !== songIdStr));

    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const isFavorite = (songId) => {
    if (!songId) return false;
    const songIdStr = songId.toString();
    return favorites.some(f => f.songId === songIdStr);
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
