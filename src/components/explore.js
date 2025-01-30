import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaPlane, FaMusic, FaSmile, FaDumbbell, FaChild, FaGuitar, FaCompactDisc, FaDrum, FaMicrophone, FaRecordVinyl } from 'react-icons/fa';
import './explore.css';

const Explore = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'love', name: 'Love Songs', icon: <FaHeart />, color: '#ff4d6d' },
    { id: 'travel', name: 'Travel', icon: <FaPlane />, color: '#4da6ff' },
    { id: 'party', name: 'Party', icon: <FaMusic />, color: '#ff9933' },
    { id: 'happy', name: 'Happy', icon: <FaSmile />, color: '#ffcc00' },
    { id: 'workout', name: 'Workout', icon: <FaDumbbell />, color: '#33cc33' },
    { id: 'kids', name: 'Kids', icon: <FaChild />, color: '#ff66b3' },
    { id: 'wedding', name: 'Wedding', icon: <FaGuitar />, color: '#cc99ff' },
    { id: 'carnatic', name: 'Carnatic', icon: <FaMicrophone />, color: '#ff8533' },
    { id: 'folk', name: 'Folk', icon: <FaDrum />, color: '#99cc00' },
    { id: 'hindustani', name: 'Hindustani', icon: <FaCompactDisc />, color: '#ff4d4d' },
    { id: 'retro', name: 'Retro', icon: <FaRecordVinyl />, color: '#9933ff' },
    { id: 'classical', name: 'Classical', icon: <FaGuitar />, color: '#ff6600' }
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="explore-container">
      <h1>Explore</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
            style={{ backgroundColor: category.color }}
          >
            <div className="category-icon">
              {category.icon}
            </div>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
