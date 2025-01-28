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
       <section className="recently-played-section">
          <h2>Recently Played</h2>
          <div className="grid-container">
            <div className="card">
              <img src={logo} alt="Track" />
              <h5>Track 1</h5>
            </div>
            <div className="card">
              <img src={logo} alt="Track" />
              <h5>Track 2</h5>
            </div>
            <div className="card">
              <img src={logo} alt="Track" />
              <h5>Track 3</h5>
            </div>
          </div>
        </section>

      {/* Content Sections */}
      <div className="content">
        {/* Discover by You Section */}
        <section className="discover-section">
          <h2>Discovered By You</h2>
          <div className="card">
            <img src={logo} alt="Track Art" />
            <h5>Badass Track</h5>
            <audio ref={audioRef} src={badassAudio}></audio>
            <div className="controls">
              <button onClick={handlePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
          
            </div>
          </div>
        </section>

        {/* Favourites Section */}
        <section className="favourites-section">
          <h2>Your Favourites</h2>
          <div className="grid-container">
            <div className="card">
              <img src={logo} alt="Artist" />
              <h5>Artist 1</h5>
            </div>
            <div className="card">
              <img src={logo} alt="Artist" />
              <h5>Artist 2</h5>
            </div>
            <div className="card">
              <img src={logo} alt="Artist" />
              <h5>Artist 3</h5>
            </div>
          </div>
        </section>

       
      </div>
    </div>
  );
};

export default Home;