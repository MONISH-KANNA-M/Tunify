import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./trending.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import logo from "./../assets/logo.jpg";
import vida from './../assets/vida.webp';
import { useAudio } from "../context/AudioContext";

import Asakooda from "../music/Aasa Kooda.mp3";
import Beer from "../music/Beer-Song-MassTamilan.dev.mp3";
import Chinkitu from "../music/Chikitu-Vibe-MassTamilan.dev.mp3";
import Chillanjirukkiye from "../music/Chillanjirukkiye.mp3";
import Golden from "../music/Golden Sparrow - (Raag.Fm).mp3";
import Minnale from "../music/Hey Minnale.mp3";
import Manasaliyo from "../music/Manasilaayo.mp3";
import My_Dear_lover from "../music/My-Dear-Loveru-MassTamilan.com.mp3";
import paiya_Dei from "../music/Paiya Dei.mp3";
import Peelings from "../music/Peelings.mp3";
import Dragon from "../music/Rise-Of-Dragon-MassTamilan.dev.mp3";
import Sawadeeka from "../music/Sawadeeka-MassTamilan.dev.mp3";
import Vaa_kannama from "../music/Vaa-Kannamma-MassTamilan.dev.mp3";
import Vennilavu from "../music/Vennilavu Saaral.mp3";
import Yennai_Izhukuthadi from "../music/Yennai Izhukkuthadi - Masstamilan.mp3";

const Trending = () => {
  const navigate = useNavigate();
  const songs = [
    { id: 1, title: "Sawadeeka", url: Sawadeeka, artist: "Artist 1" },
    { id: 2, title: "Minnale", url: Minnale, artist: "Artist 2" },
    { id: 3, title: "Yennai Izhukkuthadi", url: Yennai_Izhukuthadi, artist: "Artist 3" },
    { id: 4, title: "Vaa Kannama", url: Vaa_kannama, artist: "Artist 4" },
    { id: 5, title: "Chillanjirukkiye", url: Chillanjirukkiye, artist: "Artist 5" },
    { id: 6, title: "Peelings", url: Peelings, artist: "Artist 6" },
    { id: 7, title: "Golden Sparrow", url: Golden, artist: "Artist 7" },
    { id: 8, title: "Paiya Dei", url: paiya_Dei, artist: "Artist 8" },
    { id: 9, title: "Beer Song", url: Beer, artist: "Artist 9" },
    { id: 10, title: "Rise Of Dragon", url: Dragon, artist: "Artist 10" },
    { id: 11, title: "Aasa Kooda", url: Asakooda, artist: "Artist 11" },
    { id: 12, title: "Manasaliyo", url: Manasaliyo, artist: "Artist 12" },
    { id: 13, title: "My Dear Lover", url: My_Dear_lover, artist: "Artist 13" },
    { id: 14, title: "Vennilavu", url: Vennilavu, artist: "Artist 14" },
    { id: 15, title: "Chinkitu Vibe", url: Chinkitu, artist: "Artist 15" },
  ];

  const { currentSong, isPlaying, playSong, initializeSongs, togglePlay } = useAudio();

  const handleBack = () => {
    navigate("/");
  };

  // Initialize songs in AudioContext when component mounts
  useEffect(() => {
    initializeSongs(songs);
  }, [initializeSongs, songs]);

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      playSong(song);
    }
  };

  return (
    <div className="trending-container">
      <div className="trending-header">
        <button 
          className="back-button" 
          onClick={handleBack} 
          aria-label="Back to home"
        >
          <IoMdArrowBack />
        </button>
        <h1>Trending Now</h1>
      </div>
      <div className="trending-content">
        <img className="full-width-image" src={vida} alt="Trending banner" />
        <div className="song-list">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <img src={logo} alt={song.title} />
              <h2>{song.title}</h2>
              <button 
                onClick={() => handlePlayPause(song)}
                aria-label={`${currentSong?.id === song.id && isPlaying ? 'Pause' : 'Play'} ${song.title}`}
              >
                {currentSong?.id === song.id && isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;