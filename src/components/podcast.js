import React from 'react';
import { useAudio } from '../context/AudioContext';
import { FaPlay, FaPause, FaClock } from 'react-icons/fa';
import './podcast.css';

const Podcast = () => {
  const { currentSong, isPlaying, playSong } = useAudio();

  const podcasts = [
    {
      id: 'pod_1',
      title: 'Tamil Tech Talk',
      host: 'Vijay Kumar',
      duration: '45 min',
      description: 'Latest technology updates and reviews in Tamil',
      src: 'https://example.com/podcast1.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618',
      category: 'Technology'
    },
    {
      id: 'pod_2',
      title: 'Cinema Sirippu',
      host: 'Priya & Team',
      duration: '30 min',
      description: 'Fun discussions about latest Tamil movies',
      src: 'https://example.com/podcast2.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728',
      category: 'Entertainment'
    },
    {
      id: 'pod_3',
      title: 'Health First',
      host: 'Dr. Ramesh',
      duration: '60 min',
      description: 'Health tips and medical advice in Tamil',
      src: 'https://example.com/podcast3.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
      category: 'Health'
    },
    {
      id: 'pod_4',
      title: 'Music Unplugged',
      host: 'Karthik & Chinmayi',
      duration: '40 min',
      description: 'Behind the scenes of Tamil music industry',
      src: 'https://example.com/podcast4.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      category: 'Music'
    },
    {
      id: 'pod_5',
      title: 'Business Tamil',
      host: 'Sundar Raman',
      duration: '50 min',
      description: 'Business and entrepreneurship discussions',
      src: 'https://example.com/podcast5.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      category: 'Business'
    },
    {
      id: 'pod_6',
      title: 'Sports Corner',
      host: 'Ashwin & Team',
      duration: '35 min',
      description: 'Cricket and sports analysis in Tamil',
      src: 'https://example.com/podcast6.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
      category: 'Sports'
    },
    {
      id: 'pod_7',
      title: 'Food Stories',
      host: 'Chef Damu',
      duration: '45 min',
      description: 'Traditional Tamil cuisine and modern cooking',
      src: 'https://example.com/podcast7.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352',
      category: 'Food'
    },
    {
      id: 'pod_8',
      title: 'Travel Tales',
      host: 'Maya & Rahul',
      duration: '55 min',
      description: 'Exploring Tamil Nadu and beyond',
      src: 'https://example.com/podcast8.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
      category: 'Travel'
    }
  ];

  const handlePlayPause = (podcast) => {
    if (currentSong?.id === podcast.id) {
      playSong({ ...podcast, isPlaying: !isPlaying });
    } else {
      playSong({ ...podcast, isPlaying: true });
    }
  };

  return (
    <div className="podcast-container">
      <h1>Featured Podcasts</h1>
      <div className="podcast-grid">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            <div className="podcast-image">
              <img src={podcast.thumbnail} alt={podcast.title} />
              <div className="podcast-overlay">
                <button
                  className={`play-button ${currentSong?.id === podcast.id && isPlaying ? 'playing' : ''}`}
                  onClick={() => handlePlayPause(podcast)}
                >
                  {currentSong?.id === podcast.id && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            </div>
            <div className="podcast-info">
              <div className="podcast-category">{podcast.category}</div>
              <h3>{podcast.title}</h3>
              <p className="podcast-host">By {podcast.host}</p>
              <p className="podcast-description">{podcast.description}</p>
              <div className="podcast-duration">
                <FaClock />
                <span>{podcast.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;
