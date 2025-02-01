import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { FaFire, FaSignOutAlt } from "react-icons/fa";
import { RiPlayListFill, RiRadioFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { SiPodcastaddict } from "react-icons/si";
import { TbMusicHeart } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Home from "./home";
import Trending from "./trending";
import Profile from "./profile";
import Radio from "./radio";
import Podcast from "./podcast";
import Explore from "./explore";
import Playlists from "./playlists";
import Favorites from "./favorites";
import SearchResults from "./SearchResults";
import logo from "./../assets/logo.jpg";
import "./main.css";

const Main = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, favorites, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navItems = [
    { path: "/", title: "Home", icon: <AiFillHome /> },
    { path: "/explore", title: "Explore", icon: <MdOutlineExplore /> },
    { path: "/trending", title: "Trending", icon: <FaFire /> },
    { path: "/playlists", title: "Playlists", icon: <RiPlayListFill /> },
    { path: "/radio", title: "Radio", icon: <RiRadioFill /> },
    { path: "/podcasts", title: "Podcasts", icon: <SiPodcastaddict /> },
    { path: "/settings", title: "Settings", icon: <IoMdSettings  /> },

  ];

  return (
    <div className="main-container">
      <aside className="sidebar">
        <div className="sidebar-content">
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} title={item.title}>
                    {item.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-nav">
          <div className="left-section" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img className="logo" src={logo} alt="Logo" />
            <h1 id="title">
              <span className="highlight">Tuni</span>fy
            </h1>
          </div>
          <div className="search-section">
            <div className="search-container">
              <form onSubmit={handleSearch}>
                <input 
                  type="search" 
                  placeholder="Search for songs, artists, or albums..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
              </form>
            </div>
          </div>
          <div className="right-section">
            <Link to="/favorites" className="icon-button" title="Favorites">
              <TbMusicHeart />
              {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
            </Link>
            <Link to="/profile" className="icon-button" title="Profile">
              <CgProfile />
            </Link>
            <button className="icon-button" title="Logout" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/podcasts" element={<Podcast />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
