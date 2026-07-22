import React from "react";
import { ResumeProvider } from "./context/ResumeContext";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";

// ResumeProvider wraps all routes so builder state survives navigation to/from home
const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <ResumeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
          </Routes>
        </ResumeProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
