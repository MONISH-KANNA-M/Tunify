import React from "react";
import Main from "./components/main";
import Footer from "./components/footer";
import { AudioProvider } from "./context/AudioContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <AudioProvider>
        <div className="app-container">
          <Main />
          <Footer />
        </div>
      </AudioProvider>
    </UserProvider>
  );
};

export default App;
