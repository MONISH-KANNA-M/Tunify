import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/main";
import Footer from "./components/footer"; 

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Main />} />
      </Routes>
      <Footer /> 
    </>
  );
};

export default App;
