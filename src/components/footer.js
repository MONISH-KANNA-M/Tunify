import React, { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { RiRepeat2Fill } from "react-icons/ri";
import { IoMdVolumeHigh } from "react-icons/io";
import { BiFullscreen } from "react-icons/bi";
import './footer.css';

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="footer">
      <div className="footer-left">
        <img src="https://via.placeholder.com/50" alt="Album" className="album-cover" />
        <div className="song-info">
          <p className="song-title">Song Title</p>
          <p className="artist-name">Artist Name</p>
        </div>
        <button className="heart-btn">
          🤍
        </button>
      </div>

      <div className="footer-middle">
        <div className="controls">
          <button>
            <GiPreviousButton />
          </button>
          <button className="play-pause-btn" onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button>
            <GiNextButton />
          </button>
          <button>
            <RiRepeat2Fill />
          </button>
        </div>
        <div className="progress-bar">
          <span className="current-time">0:00</span>
          <input type="range" className="progress-slider" min="0" max="100" />
          <span className="total-time">3:45</span>
        </div>
      </div>

      <div className="footer-right">
        <button>
          <IoMdVolumeHigh />
        </button>
        <input type="range" className="volume-slider" min="0" max="100" />
        <button>
          <BiFullscreen />
        </button>
      </div>
    </div>
  );
};

export default Footer;
