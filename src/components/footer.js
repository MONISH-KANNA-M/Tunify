import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { RiRepeat2Fill } from "react-icons/ri";
import { BiFullscreen } from "react-icons/bi";
import "./footer.css";
import logo from "./../assets/logo.jpg";

const Footer = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isRepeating;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong, isRepeating]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSong]);

  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="footer">
      <div className="footer-left">
        <img src={logo} alt="Album" className="album-cover" />
        <div className="song-info">
          <p className="song-title">{currentSong?.title || "Select a song"}</p>
          <p className="artist-name">{currentSong?.artist || "Unknown Artist"}</p>
        </div>
        <button className="heart-btn">🤍</button>
      </div>

      <div className="footer-middle">
        <div className="controls">
          <button><GiPreviousButton /></button>
          <button className="play-pause-btn" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button><GiNextButton /></button>
          <button className={isRepeating ? "repeat-btn active" : "repeat-btn"} onClick={() => setIsRepeating(!isRepeating)}>
            <RiRepeat2Fill />
          </button>
        </div>
        <div className="progress-bar">
          <span className="current-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="progress-slider"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
          />
          <span className="total-time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="footer-right">
        <button><BiFullscreen /></button>
      </div>

      {currentSong && <audio ref={audioRef} src={currentSong.src} />}
    </div>
  );
};

export default Footer;
