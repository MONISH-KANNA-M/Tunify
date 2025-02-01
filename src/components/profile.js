import React from 'react';
import { useUser } from '../context/UserContext';
import { FaMapMarkerAlt, FaCalendarAlt, FaHeart, FaCog } from 'react-icons/fa';
import './profile.css';

const Profile = () => {
  const { user, favorites, logout } = useUser();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  // Get the full URL for the profile picture
  const getProfilePictureUrl = (profilePicture) => {
    if (!profilePicture) return 'https://via.placeholder.com/150';
    if (profilePicture.startsWith('http')) return profilePicture;
    return `http://localhost:5000${profilePicture}`;
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar">
            <img 
              src={getProfilePictureUrl(user.profilePicture)} 
              alt={user.username}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card main-info">
          <div className="profile-name">
            <h1>{user.fullName || user.username}</h1>
            <p className="username">@{user.username}</p>
          </div>
          
          {user.bio && (
            <div className="profile-bio">
              <p>{user.bio}</p>
            </div>
          )}

          <div className="profile-stats">
            <div className="stat-item">
              <FaHeart />
              <span>{favorites.length}</span>
              <p>Favorites</p>
            </div>
            <div className="stat-item">
              <FaCalendarAlt />
              <span>{formatDate(user.createdAt)}</span>
              <p>Joined</p>
            </div>
            {user.location && (
              <div className="stat-item">
                <FaMapMarkerAlt />
                <span>{user.location}</span>
                <p>Location</p>
              </div>
            )}
          </div>
        </div>

        <div className="profile-cards-grid">
          <div className="profile-card">
            <h3>Account Information</h3>
            <div className="card-content">
              <div className="info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="info-item">
                <label>Username</label>
                <p>@{user.username}</p>
              </div>
              <div className="info-item">
                <label>Member Since</label>
                <p>{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h3>Preferences</h3>
            <div className="card-content">
              <div className="info-item">
                <label>Theme</label>
                <p className="capitalize">{user.preferences?.theme || 'Dark'}</p>
              </div>
              <div className="info-item">
                <label>Language</label>
                <p className="capitalize">{user.preferences?.language || 'English'}</p>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h3>Activity</h3>
            <div className="card-content">
              <div className="info-item">
                <label>Favorite Songs</label>
                <p>{favorites.length}</p>
              </div>
              <div className="info-item">
                <label>Last Active</label>
                <p>Today</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="settings-button">
            <FaCog /> Settings
          </button>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
