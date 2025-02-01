import React, { useState } from "react";
import { FaPlay, FaMusic } from "react-icons/fa";
import "./playlists.css";

const Playlists = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlists] = useState([
    {
      id: 1,
      title: "Romantic Hits",
      description: "Best romantic songs collection",
      imageUrl: "https://i.scdn.co/image/ab67706f000000020e0e49102149f4cd1d5193bc",
      songs: [
        { 
          title: "Nenjukkul Peidhidum",
          artist: "Harris Jayaraj",
          album: "Vaaranam Aayiram",
          duration: "5:30",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02e0c9bc70ba75635c23c078a8"
        },
        { 
          title: "Enna Solla",
          artist: "A.R. Rahman",
          album: "Thangameenkal",
          duration: "4:45",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02d254ca497999ae980a5a38c5"
        },
        { 
          title: "Munbe Vaa",
          artist: "Harris Jayaraj",
          album: "Sillunu Oru Kadhal",
          duration: "4:55",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02d8feb2ee71c132ad48a30bb0"
        }
      ]
    },
    {
      id: 2,
      title: "Party Anthems",
      description: "Get the party started!",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002170d1a781c222aaca28081b4",
      songs: [
        { 
          title: "Vaathi Coming",
          artist: "Anirudh Ravichander",
          album: "Master",
          duration: "4:45",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02b523c2c6f5876340c47c5637"
        },
        { 
          title: "Arabic Kuthu",
          artist: "Anirudh Ravichander",
          album: "Beast",
          duration: "4:10",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02e7a913093fe8e921529338b6"
        },
        { 
          title: "Jolly O Gymkhana",
          artist: "Yuvan Shankar Raja",
          album: "Boss",
          duration: "5:00",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02c4d1267384e1f5f17b42e926"
        }
      ]
    },
    {
      id: 3,
      title: "90s Nostalgia",
      description: "Take a trip down memory lane",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002019d8c1f05c4c6e4f8beb29e",
      songs: [
        { 
          title: "Roja Janeman",
          artist: "A.R. Rahman",
          album: "Roja",
          duration: "5:15",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02e2d156fdc691f57900134342"
        },
        { 
          title: "Vennilavae",
          artist: "A.R. Rahman",
          album: "Minsara Kanavu",
          duration: "6:00",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02c08d5fa5c0f1a834acef5100"
        },
        { 
          title: "Kadhal Rojave",
          artist: "A.R. Rahman",
          album: "Roja",
          duration: "5:30",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02e2d156fdc691f57900134342"
        }
      ]
    },
    {
      id: 4,
      title: "Workout Mix",
      description: "High-energy tracks for your workout",
      imageUrl: "https://i.scdn.co/image/ab67706f000000026e495f1d5bd6cfa5e1366dbb",
      songs: [
        { 
          title: "Dippam Dappam",
          artist: "Anirudh Ravichander",
          album: "Kaathuvaakula",
          duration: "3:45",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02c5903bbf6c7c2142ad124c00"
        },
        { 
          title: "Verithanam",
          artist: "A.R. Rahman",
          album: "Bigil",
          duration: "4:30",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02a9b4845b62a0d9ed3e482a4c"
        },
        { 
          title: "Thani Oruvan",
          artist: "Hip Hop Tamizha",
          album: "Thani Oruvan",
          duration: "4:15",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02d6d43a39cbb8e76ca3c92ce9"
        }
      ]
    },
    {
      id: 5,
      title: "Chill Vibes",
      description: "Relax and unwind",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002c414e7daf34690c9f983f76e",
      songs: [
        { 
          title: "Thalli Pogathey",
          artist: "A.R. Rahman",
          album: "Achcham Yenbadhu",
          duration: "5:00",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02b7bb6b4c98629c81d5b6ab81"
        },
        { 
          title: "Nenjame",
          artist: "Yuvan Shankar Raja",
          album: "Aayirathil Oruvan",
          duration: "4:45",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02a91c10fe9472d9bd89802306"
        },
        { 
          title: "Uyirin Uyire",
          artist: "A.R. Rahman",
          album: "Kaakha Kaakha",
          duration: "5:30",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02d451e0a57f6d1e6a20c5d0cd"
        }
      ]
    },
    {
      id: 6,
      title: "EDM Fusion",
      description: "Electronic beats meet Indian rhythms",
      imageUrl: "https://i.scdn.co/image/ab67706f000000025ea54b91b073c2776b966e7b",
      songs: [
        { 
          title: "Enjoy Enjaami",
          artist: "Dhee ft. Arivu",
          album: "Singles",
          duration: "4:05",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02c08d5fa5c0f1a834acef5100"
        },
        { 
          title: "Private Party",
          artist: "Devi Sri Prasad",
          album: "DSP Hits",
          duration: "3:55",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02e7a2b1f5e7f3d9c1a07b5947"
        },
        { 
          title: "Rowdy Baby",
          artist: "Dhanush, Dhee",
          album: "Maari 2",
          duration: "4:30",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02b5db9faf4b1150ab927a11c4"
        }
      ]
    },
    {
      id: 7,
      title: "Indie Tamil",
      description: "Best of independent Tamil music",
      imageUrl: "https://i.scdn.co/image/ab67706f000000026b1f3d6f2c6ea713eab6c492",
      songs: [
        { 
          title: "Yaen Ennai Pirindhaai",
          artist: "Sid Sriram",
          album: "Singles",
          duration: "4:15",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02a91c10fe9472d9bd89802306"
        },
        { 
          title: "Thee Illai",
          artist: "Pradeep Kumar",
          album: "Indies",
          duration: "5:00",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02d8feb2ee71c132ad48a30bb0"
        },
        { 
          title: "Maruvaarthai",
          artist: "Sid Sriram",
          album: "Singles",
          duration: "4:30",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02e2d156fdc691f57900134342"
        }
      ]
    },
    {
      id: 8,
      title: "Drive Mode",
      description: "Perfect for long drives",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c",
      songs: [
        { 
          title: "Neeye Oli",
          artist: "Santhosh Narayanan",
          album: "Singles",
          duration: "4:20",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02c4d1267384e1f5f17b42e926"
        },
        { 
          title: "Mayakkam Enna",
          artist: "G.V. Prakash",
          album: "Drive Mix",
          duration: "5:10",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02b523c2c6f5876340c47c5637"
        },
        { 
          title: "Yaanji",
          artist: "Anirudh Ravichander",
          album: "Vikram Vedha",
          duration: "3:45",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02e7a913093fe8e921529338b6"
        }
      ]
    }
  ]);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <div className="playlists-container">
      <h1>Your Playlists 🎵</h1>
      <div className="playlists-content">
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="playlist-card"
              onClick={() => handlePlaylistClick(playlist)}
              aria-label={`Play ${playlist.title} playlist`}
            >
              <div className="playlist-image-container">
                <img src={playlist.imageUrl} alt={playlist.title} />
                <div className="playlist-overlay">
                  <button className="play-button" aria-label={`Play ${playlist.title}`}>
                    <FaPlay />
                  </button>
                </div>
              </div>
              <div className="playlist-info">
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
                <div className="song-count">
                  <FaMusic />
                  <span>{playlist.songs.length} songs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
