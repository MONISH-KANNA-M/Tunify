import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { RiRepeat2Fill } from "react-icons/ri";
import "./fullscreen.css";

const FullscreenPage = ({ currentSong, isPlaying, setIsPlaying }) => {
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
    <div className="fullscreen">
      <div className="fullscreen-header">
        <img src={currentSong?.image} alt="Album" className="album-cover" />
        <h1>{currentSong?.title || "No Song Playing"}</h1>
        <p>{currentSong?.artist || "Unknown Artist"}</p>
      </div>

      <div className="fullscreen-controls">
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

      <audio ref={audioRef} src={currentSong?.src} />
    </div>
  );
};

export default FullscreenPage;
