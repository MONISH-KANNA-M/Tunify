import React, { useRef, useState } from "react";
import "./trending.css";
import { FaPlay, FaPause } from "react-icons/fa";
import logo from "./../assets/logo.jpg";
import vida from './../assets/vida.webp';

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
  const songs = [
    { id: 1, title: "Sawadeeka", src: Sawadeeka },
    { id: 2, title: "Minnale", src: Minnale },
    { id: 3, title: "Yennai Izhukkuthadi", src: Yennai_Izhukuthadi },
    { id: 4, title: "Vaa Kannama", src: Vaa_kannama },
    { id: 5, title: "Chillanjirukkiye", src: Chillanjirukkiye },
    { id: 6, title: "Peelings", src: Peelings },
    { id: 7, title: "Golden Sparrow", src: Golden },
    { id: 8, title: "Paiya Dei", src: paiya_Dei },
    { id: 9, title: "Beer Song", src: Beer },
    { id: 10, title: "Rise Of Dragon", src: Dragon },
    { id: 11, title: "Aasa Kooda", src: Asakooda },
    { id: 12, title: "Manasaliyo", src: Manasaliyo },
    { id: 13, title: "My Dear Lover", src: My_Dear_lover },
    { id: 14, title: "Vennilavu", src: Vennilavu },
    { id: 15, title: "Chinkitu Vibe", src: Chinkitu },
  ];

  const audioRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState({});

  const handlePlayPause = (index) => {
    const audio = audioRefs.current[index];

    if (audio) {
      if (isPlaying[index]) {
        audio.pause();
      } else {
        audioRefs.current.forEach((audioEl, i) => {
          if (i !== index && audioEl) {
            audioEl.pause();
          }
        });

        audio.play();
      }

      setIsPlaying((prev) => ({
        ...Object.keys(prev).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {}),
        [index]: !isPlaying[index],
      }));
    }
  };

  return (
    <div className="trending">
      <h1>Trending Now ❤️‍🔥</h1>
      <img className="full-width-image" src={vida} alt="vida" />
      <div className="song-list">
        {songs.map((song, index) => (
          <div key={song.id} className="song-card">
            <img src={logo} alt="logo" />
            <h2>{song.title}</h2>

            <button onClick={() => handlePlayPause(index)}>
              {isPlaying[index] ? <FaPause /> : <FaPlay />}
            </button>
            <audio ref={(el) => (audioRefs.current[index] = el)} src={song.src} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
