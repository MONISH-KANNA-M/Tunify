import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaHeart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "./../assets/logo.jpg";
import "./playlist.css";
import why from "./../music/Why-this-kolaveri-di.mp3";
import vathi from "./../music/Vaathi-Coming-MassTamilan.io.mp3";
import arabi from "./../music/Arabic-Kuthu---Halamithi-Habibo-MassTamilan.so.mp3";
import don from "./../music/Don'u Don'u Don'u (The Don's Romance).mp3";
import tha from "./../music/Thalaivar-Theme-MassTamilan.io.mp3";
import che from "./../music/Chikitu-Vibe-MassTamilan.dev.mp3";
import chu from "./../music/Chumma-Kizhi-MassTamilan.io.mp3";
import coo from "./../music/Coolie Disco.mp3";
import a from "./../music/Aagaaya-Neelangalil-MassTamilan.fm.mp3";
import b from "./../music/Alaipayuthey-Kanna.mp3";
import c from "./../music/Endhira-Logathu-Sundhariye-MassTamilan.com.mp3";
import d from "./../music/Jwalamukhi-MassTamilan.fm.mp3";
import e from "./../music/Kadhal-Sadugudu.mp3";
import f from "./../music/Mei-Nigara.mp3";
import g from "./../music/Naalai-Naalai-MassTamilan.fm.mp3";
import h from "./../music/Pullinangal-MassTamilan.com.mp3";
import i from "./../music/Bang-Bang-Bang.mp3";
import j from "./../music/January-Madham.mp3";
import k from "./../music/Kanaa-Kaanum-Kaalangal.mp3";
import l from "./../music/Mella-Sirithal.mp3";
import m from "./../music/Oppari-Rap-MassTamilan.dev.mp3";
import n from "./../music/Oru-Kan-Jaadai.mp3";
import o from "./../music/Thappu-Thanda.mp3";
import p from "./../music/The-Arabic-Lullaby-Theme-MassTamilan.dev.mp3";

// Corrected Song List with Proper URLs
export const songs = {
  "Anirudh": [
    { "id": 1, title: "Vaathi Coming", src: vathi },
    { "id": 2, title: "Arabic Kuthu", src: arabi },
    { "id": 3, title: "Why This Kolaveri", src: why },
    { "id": 4, title: "Donu Donu", src: don },
    { "id": 5, title: "Thalaivar", src: tha },
    { "id": 6, title: "Chikitu", src: che },
    { "id": 7, title: "Chumma", src: chu },
    { "id": 8, title: "Coolie", src: coo }
  ],
  "A. R. Rahman": [
    { "id": 1, title: "Aagaaya", src: a },
    { "id": 2, title: "Alaipayuthey", src: b },
    { "id": 3, title: "Endhira", src: c },
    { "id": 4, title: "Jwalamukhi", src: d },
    { "id": 5, title: "Mei-Nigara", src: f },
    { "id": 6, title: "Kadhal", src: e },
    { "id": 7, title: "Naalai-Naalai", src: g },
    { "id": 8, title: "Pullinangal", src: h }
  ],
  "Yuvan Shankar": [
    { "id": 1, title: "Bang-Bang", src: i },
    { "id": 2, title: "January", src: j },
    { "id": 3, title: "Kanaa-Kaanum", src: k },
    { "id": 4, title: "Mella", src: l },
    { "id": 5, title: "Oppari-Rap", src: m },
    { "id": 6, title: "Oru-Kan", src: n },
    { "id": 7, title: "Thappu", src: o },
    { "id": 8, title: "The-Arabic", src: p }
  ],
  // Other artists...
};

const audioContext = new AudioContext();

const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const playSong = (song) => {
    if (isPlaying && currentSong?.id === song.id) {
      audioContext.suspend();
      setIsPlaying(false);
    } else {
      if (isPlaying) {
        audioContext.suspend();
      }
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.5;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      fetch(song.url)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          source.buffer = audioBuffer;
          source.start();
          setIsPlaying(true);
          setCurrentSong(song);
        });
    }
  };

  return { playSong, isPlaying, currentSong };
};

const Playlist = () => {
  const { artistName } = useParams();
  const navigate = useNavigate();
  const { playSong, isPlaying, currentSong } = useAudio();
  const { addToFavorites, removeFromFavorites, isFavorite, isAuthenticated } = useUser();

  const handlePlayPause = (song) => {
    playSong(song);
  };

  const handleFavoriteClick = (song) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const songData = {
      id: song.id,
      title: song.title,
      artist: artistName,
      url: song.src,
      albumArt: logo
    };

    if (isFavorite(song.id.toString())) {
      removeFromFavorites(song.id.toString());
    } else {
      addToFavorites(songData);
    }
  };

  return (
    <div className="playlist-container">
      <button className="back-button" onClick={() => navigate("/")}>Back</button>
      <h2>{artistName}'s Playlist</h2>
      <div className="song-list">
        {songs[artistName]?.map((song, index) => (
          <div className="song-card" key={song.id || index}>
            <img src={logo} alt={song.title} />
            <h5>{song.title}</h5>
            <div className="song-controls">
              <button 
                className="play-button" 
                onClick={() => handlePlayPause({
                  id: song.id,
                  title: song.title,
                  artist: artistName,
                  url: song.src,
                  albumArt: logo
                })}
              >
                {isPlaying && currentSong?.id === song.id ? <FaPause /> : <FaPlay />}
              </button>
              <button 
                className={`favorite-button ${isFavorite(song.id.toString()) ? 'active' : ''}`}
                onClick={() => handleFavoriteClick(song)}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
