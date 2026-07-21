import React from "react";
import { ResumeProvider } from "./context/ResumeContext";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import { ThemeProvider } from "./context/ThemeContext";

// ResumeProvider wraps all routes so builder state survives navigation to/from home
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
