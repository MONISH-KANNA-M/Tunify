import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import './login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, signup } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return false;
      }
    } else {
      if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
      if (!/^\d{10}$/.test(formData.phone)) {
        setError('Please enter a valid 10-digit phone number');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        const userData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        };
        await signup(userData);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to continue' : 'Sign up to get started'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleMode} className="toggle-button">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
