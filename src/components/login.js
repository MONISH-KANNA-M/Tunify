import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { useUser } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    bio: '',
    profilePicture: null
  });
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (isAuthenticated && user) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      
      // Prepare data based on login or register
      let dataToSend;
      if (isLogin) {
        dataToSend = {
          email: formData.email.trim(),
          password: formData.password
        };
      } else {
        // For registration, create FormData if there's a profile picture
        if (formData.profilePicture) {
          const formDataObj = new FormData();
          Object.keys(formData).forEach(key => {
            if (key === 'profilePicture') {
              formDataObj.append(key, formData[key]);
            } else {
              formDataObj.append(key, formData[key].trim());
            }
          });
          dataToSend = formDataObj;
        } else {
          dataToSend = {
            ...formData,
            email: formData.email.trim(),
            username: formData.username.trim()
          };
          delete dataToSend.profilePicture;
        }
      }

      const response = await axios.post(`http://localhost:5000${endpoint}`, dataToSend, {
        headers: {
          ...((!isLogin && formData.profilePicture) ? {
            'Content-Type': 'multipart/form-data'
          } : {
            'Content-Type': 'application/json'
          })
        }
      });

      if (response.data.token && response.data.user) {
        // Store user data and token
        login(response.data.user, response.data.token);
        // Navigate to home page
        navigate('/', { replace: true });
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error('Login/Register error:', error.response || error);
      setError(
        error.response?.data?.error || 
        'An error occurred during authentication. Please try again.'
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('profile-picture-input').click();
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      username: '',
      email: '',
      password: '',
      fullName: '',
      bio: '',
      profilePicture: null
    });
    setPreviewUrl('');
  };

  if (isAuthenticated && user) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>{isLogin ? 'Welcome Back' : 'Welcome'}</h1>
        <p className="subtitle">{isLogin ? 'Login to your account' : 'Create your account'}</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name (optional)"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="bio"
                  placeholder="Bio (optional)"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>

              <div className="profile-picture-section">
                <div 
                  className="profile-picture-preview"
                  onClick={handleUploadClick}
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile preview" />
                  ) : (
                    <span className="profile-placeholder">Click to upload photo</span>
                  )}
                </div>
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button 
                  type="button"
                  className="upload-button"
                  onClick={handleUploadClick}
                >
                  {previewUrl ? 'Change Photo' : 'Upload Photo'}
                </button>
              </div>
            </>
          )}

          <button type="submit" className="login-button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={toggleMode} className="toggle-button">
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
