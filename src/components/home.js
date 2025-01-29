import React, { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import logo from "./../assets/logo.jpg";
import badassAudio from "./../music/Badass-MassTamilan.dev.mp3";
import "./home.css";

const Home = () => {
  const audioRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState({});

  const handlePlayPause = (index) => {
    const audio = audioRefs.current[index];

    if (audio) {
      if (isPlaying[index]) {
        audio.pause();
      } else {
        audio.play();
      }

      setIsPlaying((prev) => ({ ...prev, [index]: !prev[index] }));
    }
  };

  return (
    <div className="home-container">
      <section className="recently-played">
        <h2 className="h">Recently Played</h2>
        <div className="grid-container">
          {["Track 1", "Track 2", "Track 3", "Track4", "Track5", "Track6", "Track7"].map((track, index) => (
            <div className="card" key={index}>
              <img src={logo} alt={track} />
              <h5>{track}</h5>
              <button onClick={() => handlePlayPause(index)}>
                {isPlaying[index] ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="discover-section">
        <h2 className="h">Discovered By You</h2>
        <div className="grid-container">
          {["Badass Track 1", "Badass Track 2", "Badass Track 3", "Badass Track 4"].map((track, index) => (
            <div className="card" key={index}>
              <img src={logo} alt="Track Art" />
              <h5>{track}</h5>
              <audio ref={(el) => (audioRefs.current[index] = el)} src={badassAudio}></audio>
              <button onClick={() => handlePlayPause(index)}>
                {isPlaying[index] ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="favourites-section">
        <h2 className="h">Your Favourites</h2>
        <div className="grid-container">
          {["Artist 1", "Artist 2", "Artist 3", "Artist 4", "Artist 5", "Artist 6", "Artist 7"].map((artist, index) => (
            <div className="card" key={index}>
              <img src={logo} alt={artist} />
              <h5>{artist}</h5>
              <button onClick={() => handlePlayPause(index)}>
                {isPlaying[index] ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
