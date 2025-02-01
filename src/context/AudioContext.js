import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem('recentlyPlayed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  const updateRecentlyPlayed = (song) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 5);
    });
  };

  // Function to initialize or update all available songs
  const initializeSongs = (songs) => {
    setAllSongs(songs);
  };

  const playSong = (song) => {
    const isSameSong = currentSong?.id === song.id;

    if (!isSameSong) {
      audioRef.current.src = song.url;
      setCurrentSong(song);
      setIsPlaying(true);
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
      updateRecentlyPlayed(song);
    } else {
      togglePlay();
    }
  };

  const togglePlay = () => {
    if (!currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const findSongIndex = (song) => {
    return allSongs.findIndex(s => s.id === song?.id);
  };

  const playNext = () => {
    if (allSongs.length === 0) return;
    
    const currentIndex = findSongIndex(currentSong);
    if (currentIndex === -1 && allSongs.length > 0) {
      // If current song is not found but we have songs, play the first song
      playSong(allSongs[0]);
      return;
    }
    
    const nextIndex = (currentIndex + 1) % allSongs.length;
    const nextSong = allSongs[nextIndex];
    
    if (nextSong) {
      playSong(nextSong);
    }
  };

  const playPrevious = () => {
    if (allSongs.length === 0) return;
    
    const currentIndex = findSongIndex(currentSong);
    if (currentIndex === -1 && allSongs.length > 0) {
      // If current song is not found but we have songs, play the last song
      playSong(allSongs[allSongs.length - 1]);
      return;
    }
    
    const prevIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
    const prevSong = allSongs[prevIndex];
    
    if (prevSong) {
      playSong(prevSong);
    }
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const adjustVolume = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  };

  return (
    <AudioContext.Provider value={{
      currentSong,
      isPlaying,
      currentTime,
      duration,
      volume,
      allSongs,
      recentlyPlayed,
      playSong,
      togglePlay,
      playNext,
      playPrevious,
      seek,
      adjustVolume,
      initializeSongs
    }}>
      {children}
    </AudioContext.Provider>
  );
};
