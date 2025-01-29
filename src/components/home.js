import React, { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import logo from "./../assets/logo.jpg";
import badassAudio from "./../music/Badass-MassTamilan.dev.mp3";
import "./home.css";

const Home = () => {
  const [audioRefs, setAudioRefs] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);

  const handlePlayPause = (index) => {
    const newAudioRefs = [...audioRefs];
    const newIsPlaying = [...isPlaying];
    
    if (newIsPlaying[index]) {
      newAudioRefs[index].pause();
      newIsPlaying[index] = false;
    } else {
      newAudioRefs[index].play();
      newIsPlaying[index] = true;
    }

    setAudioRefs(newAudioRefs);
    setIsPlaying(newIsPlaying);
  };

  return (
    <div className="home-container">
      <section className="recently-played">
        <h2>Recently Played</h2>
        <div className="grid-container">
          {["Track 1", "Track 2", "Track 3", "Track4", "Track5", "Track6", "Track7"].map((track, index) => (
            <div className="card" key={index}>
              <img src={logo} alt={track} />
              <h5>{track}</h5>
            </div>
          ))}
        </div>
      </section>

      <section className="discover-section">
        <h2>Discovered By You</h2>
        {["Badass Track 1", "Badass Track 2", "Badass Track 3", "Badass Track 4"].map((track, index) => (
          <div className="card" key={index}>
            <img src={logo} alt="Track Art" />
            <h5>{track}</h5>
            <audio
              ref={(el) => (audioRefs[index] = el)}
              src={badassAudio}
            ></audio>
            <button onClick={() => handlePlayPause(index)}>
              {isPlaying[index] ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        ))}
      </section>

      <section className="favourites-section">
        <h2>Your Favourites</h2>
        <div className="grid-container">
          {["Artist 1", "Artist 2", "Artist 3", "Artist 4", "Artist 5", "Artist 6", "Artist 7"].map((artist, index) => (
            <div className="card" key={index}>
              <img src={logo} alt={artist} />
              <h5>{artist}</h5>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
