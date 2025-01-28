import React from "react";
import "./main.css";
import { TbMusicHeart } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { RiPlayListFill, RiRadioFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import logo from "./../assets/logo.jpg";
import { SiPodcastaddict } from "react-icons/si";


const Main = () => {
  return (
    <div className="main-container">
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <a href="#">
                <AiFillHome />
              </a>
            </li>
            <li>
              <a href="#">
                <MdOutlineExplore />
              </a>
            </li>
            <li>
              <a href="#">
                <FaFire />
              </a>
            </li>
            <li>
              <a href="#">
                <RiPlayListFill />
              </a>
            </li>
            <li>
              <a href="#">
                <RiRadioFill />
              </a>
            </li>
            <li>
              <a href="#">
              <SiPodcastaddict />
              </a>
            </li>
            <li>
              <a href="#">
                <IoMdSettings />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <nav className="top-nav">
          <div className="left-section">
            <img className="logo" src={logo} alt="Logo" />
            <h1 id="title">
              <span className="highlight">Tuni</span>fy
            </h1>
          </div>
          <div className="search-section">
            <input type="search" placeholder="Search..." />
            <button>Search</button>
          </div>
          <div className="right-section">
            <button>
              <TbMusicHeart />
            </button>
          
            <button>
              <CgProfile />
            </button>
          </div>
        </nav>
      </div>

      <div className="content"></div>
    </div>
  );
};

export default Main;
