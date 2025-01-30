import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user profile data when component mounts
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,  // Send JWT token in the header
          },
        });
        setUserData(response.data);
      } catch (error) {
        setError('Failed to fetch profile data');
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {userData ? (
        <div>
          <h1>Profile Information</h1>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
