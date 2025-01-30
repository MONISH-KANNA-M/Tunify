import React, { createContext, useContext, useState, useEffect } from 'react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [audio] = useState(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem('recentlyPlayed');
    return saved ? JSON.parse(saved) : [];
  });

  // Update localStorage whenever recentlyPlayed changes
  useEffect(() => {
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  const updateRecentlyPlayed = (song) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 5);
    });
  };

  const playSong = (song) => {
    const isSameSong = currentSong?.id === song.id;

    if (!isSameSong) {
      audio.src = song.url;
      setCurrentSong(song);
      setIsPlaying(true);
      audio.play();
      updateRecentlyPlayed(song);
      // Add to playlist if not already present
      setPlaylist(prev => {
        if (!prev.find(s => s.id === song.id)) {
          return [...prev, song];
        }
        return prev;
      });
    } else {
      togglePlay();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playSong(playlist[nextIndex]);
  };

  const playPrevious = () => {
    if (playlist.length === 0) return;
    const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[prevIndex]);
  };

  const adjustVolume = (value) => {
    audio.volume = value;
  };

  useEffect(() => {
    audio.addEventListener('ended', () => {
      playNext();
    });

    return () => {
      audio.removeEventListener('ended', () => {
        playNext();
      });
      audio.pause();
    };
  }, [audio]);

  return (
    <AudioContext.Provider value={{
      currentSong,
      isPlaying,
      playSong,
      togglePlay,
      playNext,
      playPrevious,
      playlist,
      recentlyPlayed,
      adjustVolume
    }}>
      {children}
    </AudioContext.Provider>
  );
};
