import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Trending from "./trending";


import "./main.css";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { RiPlayListFill, RiRadioFill } from "react-icons/ri";
import { SiPodcastaddict } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import logo from "./../assets/logo.jpg";

const Main = () => {
  return (
    <Router>
      <div className="main-container">
        <aside className="sidebar">
          <nav>
            <ul>
              <li><Link to="/"><AiFillHome /></Link></li>
              <li><Link to="/explore"><MdOutlineExplore /></Link></li>
              <li><Link to="/trending"><FaFire /></Link></li>
              <li><Link to="#"><RiPlayListFill /></Link></li>
              <li><Link to="#"><RiRadioFill /></Link></li>
              <li><Link to="#"><SiPodcastaddict /></Link></li>
              <li><Link to="#"><IoMdSettings /></Link></li>
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
          </header>

          <main className="content">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/trending" element={<Trending />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default Main;
