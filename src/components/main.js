import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./home";
import Trending from "./trending";
import Login from "./login"; 
import Profile from "./profile"; 
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
import Footer from "./footer";

const Main = () => {
  const navigate = useNavigate();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="main-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li><Link to="/"><AiFillHome /></Link></li>
            <li><Link to="/explore"><MdOutlineExplore /></Link></li>
            <li><Link to="/trending"><FaFire /></Link></li>
            <li><Link to="/playlists"><RiPlayListFill /></Link></li>
            <li><Link to="/radio"><RiRadioFill /></Link></li>
            <li><Link to="/podcasts"><SiPodcastaddict /></Link></li>
            <li><Link to="/settings"><IoMdSettings /></Link></li>
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
            <button><TbMusicHeart /></button>
            <button onClick={() => navigate("/profile")}><CgProfile /></button>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/trending" 
              element={
                <Trending 
                  setCurrentSong={setCurrentSong} 
                  setIsPlaying={setIsPlaying} 
                  isPlaying={isPlaying} 
                  currentSong={currentSong} 
                />
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <Footer /> 
      </div>
    </div>
  );
};

export default Main;
