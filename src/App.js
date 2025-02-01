import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";
import Footer from "./components/footer";
import { AudioProvider } from "./context/AudioContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <AudioProvider>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Main />} />
          </Routes>
          <Footer />
        </div>
      </AudioProvider>
    </UserProvider>
  );
};

export default App;
