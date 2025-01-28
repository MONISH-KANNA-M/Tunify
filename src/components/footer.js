import React, { useRef, useState } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import logo from "./../assets/logo.jpg";
import "./home.css";
import badassAudio from "./../music/Badass-MassTamilan.dev.mp3";

const Home = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="main-container">
      {/* Recently Played Section */}
      <section className="recently-played-section section-container">
        <h2 className="section-title">Recently Played</h2>
        <div className="card-container">
          {[1, 2, 3].map((track) => (
            <div className="card" key={`track-${track}`}>
              <img src={logo} alt={`Track ${track}`} />
              <h5>Track {track}</h5>
            </div>
          ))}
        </div>
      </section>

      {/* Discover by You Section */}
      <section className="discover-section section-container">
        <h2 className="section-title">Discovered By You</h2>
        <div className="card">
          <img src={logo} alt="Badass Track" />
          <h5>Badass Track</h5>
          <audio ref={audioRef} src={badassAudio}></audio>
          <div className="controls">
            <button onClick={handlePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button>
              <FaStepBackward />
            </button>
            <button>
              <FaStepForward />
            </button>
          </div>
        </div>
      </section>

      {/* Favourites Section */}
      <section className="favourites-section section-container">
        <h2 className="section-title">Your Favourites</h2>
        <div className="card-container">
          {[1, 2, 3].map((artist) => (
            <div className="card" key={`artist-${artist}`}>
              <img src={logo} alt={`Artist ${artist}`} />
              <h5>Artist {artist}</h5>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
