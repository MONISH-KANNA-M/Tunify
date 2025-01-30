import React from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Home from "./home";
import Trending from "./trending";
import Login from "./login";
import Profile from "./profile";
import Radio from "./radio";
import Podcast from "./podcast";
import Explore from "./explore";
import Playlists from "./playlists";
import Favorites from "./favorites";
import ProtectedRoute from "./ProtectedRoute";
import { useUser } from "../context/UserContext";
import "./main.css";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { RiPlayListFill, RiRadioFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { SiPodcastaddict } from "react-icons/si";
import { TbMusicHeart } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import logo from "./../assets/logo.jpg";

const Main = () => {
  const navigate = useNavigate();
  const { user, favorites, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="main-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/" title="Home">
                <AiFillHome />
              </Link>
            </li>
            <li>
              <Link to="/explore" title="Explore">
                <MdOutlineExplore />
              </Link>
            </li>
            <li>
              <Link to="/trending" title="Trending">
                <FaFire />
              </Link>
            </li>
            <li>
              <Link to="/playlists" title="Playlists">
                <RiPlayListFill />
              </Link>
            </li>
            <li>
              <Link to="/radio" title="Radio">
                <RiRadioFill />
              </Link>
            </li>
            <li>
              <Link to="/podcasts" title="Podcasts">
                <SiPodcastaddict />
              </Link>
            </li>
            <li>
              <Link to="/settings" title="Settings">
                <IoMdSettings />
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="top-nav">
          <div className="left-section">
            <img className="logo" src={logo} alt="Logo" />
            <h1 id="title"><span className="highlight">Tuni</span>fy</h1>
          </div>
          <div className="search-section">
            <input type="search" placeholder="Search..." />
            <button>Search</button>
          </div>
          <div className="right-section">
            <button className="favorites-btn" onClick={() => navigate("/favorites")}>
              <TbMusicHeart />
              {favorites.length > 0 && <span className="favorites-count">{favorites.length}</span>}
            </button>
            <button onClick={() => navigate("/profile")} className="profile-btn">
              <CgProfile />
              <span className="user-name">{user.name}</span>
            </button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trending"
              element={
                <ProtectedRoute>
                  <Trending />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playlists/*"
              element={
                <ProtectedRoute>
                  <Playlists />
                </ProtectedRoute>
              }
            />
            <Route
              path="/radio"
              element={
                <ProtectedRoute>
                  <Radio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/podcasts"
              element={
                <ProtectedRoute>
                  <Podcast />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Main;
