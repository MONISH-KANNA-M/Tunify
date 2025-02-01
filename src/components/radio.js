import React from 'react';
import { useAudio } from '../context/AudioContext';
import { FaPlay, FaPause } from 'react-icons/fa';
import './radio.css';
import logo from './../assets/logo.jpg';

const Radio = () => {
  const { currentSong, isPlaying, playSong } = useAudio();

  const radioStations = [
    {
      id: 'radio_1',
      name: 'Radio Mirchi',
      frequency: '98.3 FM',
      genre: 'Tamil Hits',
      src: 'https://radioindia.net/radio/radio-mirchi/icecast.audio',
      logo: logo
    },
    {
      id: 'radio_2',
      name: 'Big FM',
      frequency: '92.7 FM',
      genre: 'Tamil & English',
      src: 'https://radioindia.net/radio/sc-bb/icecast.audio',
      logo: logo
    },
    {
      id: 'radio_3',
      name: 'Radio City',
      frequency: '91.1 FM',
      genre: 'Tamil Classics',
      src: 'https://radioindia.net/radio/radio-city/icecast.audio',
      logo: logo
    },
    {
      id: 'radio_4',
      name: 'Suryan FM',
      frequency: '93.5 FM',
      genre: 'Tamil News & Music',
      src: 'https://radioindia.net/radio/suryan/icecast.audio',
      logo: logo
    },
    {
      id: 'radio_5',
      name: 'Hello FM',
      frequency: '106.4 FM',
      genre: 'Tamil Entertainment',
      src: 'https://radioindia.net/radio/hello-fm/icecast.audio',
      logo: logo
    },
    {
      id: 'radio_6',
      name: 'Chennai Live',
      frequency: '104.8 FM',
      genre: 'English & Tamil',
      src: 'https://radioindia.net/radio/chennai-live/icecast.audio',
      logo: logo
    },
    {
      id: 'radio_7',
      name: 'Rainbow FM',
      frequency: '101.9 FM',
      genre: 'Classical Tamil',
      src: 'https://radioindia.net/radio/rainbow/icecast.audio',
      logo: logo
    },
    {
      id: 'radio_8',
      name: 'AIR Tamil',
      frequency: '103.1 FM',
      genre: 'News & Culture',
      src: 'https://radioindia.net/radio/air-tamil/icecast.audio',
      logo: logo
    }
  ];

  const handlePlayPause = (station) => {
    if (currentSong?.id === station.id) {
      playSong({ ...station, isPlaying: !isPlaying });
    } else {
      playSong({ ...station, isPlaying: true });
    }
  };

  return (
    <div className="radio-container">
      <h1>Live Radio</h1>
      <div className="radio-grid">
        {radioStations.map((station) => (
          <div key={station.id} className="radio-card">
            <div className="radio-image">
              <img src={station.logo} alt={station.name} />
              <div className="play-button-container">
                <button
                  className={`play-button ${currentSong?.id === station.id && isPlaying ? 'playing' : ''}`}
                  onClick={() => handlePlayPause(station)}
                  aria-label={currentSong?.id === station.id && isPlaying ? 'Pause' : 'Play'}
                >
                  {currentSong?.id === station.id && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            </div>
            <div className="radio-info">
              <h3>{station.name}</h3>
              <div className="frequency">{station.frequency}</div>
              <div className="genre">{station.genre}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio;
