import React from "react";
import { ResumeProvider } from "./context/ResumeContext";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </ResumeProvider>
    </ThemeProvider>
  );
};

export default App;
