import React from 'react';
import { useAudio } from '../context/AudioContext';
import { FaPlay, FaPause } from 'react-icons/fa';
import './radio.css';

const Radio = () => {
  const { currentSong, isPlaying, playSong } = useAudio();

  const radioStations = [
    {
      id: 'radio_1',
      name: 'Radio Mirchi',
      frequency: '98.3 FM',
      genre: 'Tamil Hits',
      src: 'https://radioindia.net/radio/radio-mirchi/icecast.audio',
      logo: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/radio-logo-design-template-1cd4c5a9c47e6ec7e1c9e91707eadbb4_screen.jpg'
    },
    {
      id: 'radio_2',
      name: 'Big FM',
      frequency: '92.7 FM',
      genre: 'Tamil & English',
      src: 'https://radioindia.net/radio/sc-bb/icecast.audio',
      logo: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/radio-station-logo-design-template-fb0f09c7a0c3728e2812d29f36fc9ace_screen.jpg'
    },
    {
      id: 'radio_3',
      name: 'Radio City',
      frequency: '91.1 FM',
      genre: 'Tamil Classics',
      src: 'https://radioindia.net/radio/radio-city/icecast.audio',
      logo: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/radio-logo-design-template-2a0143d1d2d980d5d6842bf1455c3403_screen.jpg'
    },
    {
      id: 'radio_4',
      name: 'Suryan FM',
      frequency: '93.5 FM',
      genre: 'Tamil News & Music',
      src: 'https://radioindia.net/radio/suryan/icecast.audio',
      logo: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/radio-station-logo-design-template-3a4d7c4d6f7c5f89d53144b1c5c1e40e_screen.jpg'
    },
    {
      id: 'radio_5',
      name: 'Hello FM',
      frequency: '106.4 FM',
      genre: 'Tamil Entertainment',
      src: 'https://radioindia.net/radio/hello-fm/icecast.audio',
      logo: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/radio-logo-design-template-e47a234d9a49db5b7265d8379cd684c1_screen.jpg'
    },
    {
      id: 'radio_6',
      name: 'Chennai Live',
      frequency: '104.8 FM',
      genre: 'English & Tamil',
      src: 'https://radioindia.net/radio/chennai-live/icecast.audio',
      logo: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/radio-station-logo-design-template-d4f8fb0f8851f97d2cfd60d1c8567287_screen.jpg'
    },
    {
      id: 'radio_7',
      name: 'Rainbow FM',
      frequency: '101.9 FM',
      genre: 'Classical Tamil',
      src: 'https://radioindia.net/radio/rainbow/icecast.audio',
      logo: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/radio-logo-design-template-d873363b13ef6c7e949845015f069c1f_screen.jpg'
    },
    {
      id: 'radio_8',
      name: 'AIR Tamil',
      frequency: '103.1 FM',
      genre: 'News & Culture',
      src: 'https://radioindia.net/radio/air-tamil/icecast.audio',
      logo: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/radio-station-logo-design-template-1a2f614a29d4e0786fbb2c4a8f096480_screen.jpg'
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
              <button
                className={`play-button ${currentSong?.id === station.id && isPlaying ? 'playing' : ''}`}
                onClick={() => handlePlayPause(station)}
              >
                {currentSong?.id === station.id && isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
            <div className="radio-info">
              <h3>{station.name}</h3>
              <p className="frequency">{station.frequency}</p>
              <p className="genre">{station.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio;
