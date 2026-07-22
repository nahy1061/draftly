import React from "react";
import { ResumeProvider } from "./context/ResumeContext";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastProvider } from "./context/ToastContext";
import NotFound from "./pages/NotFound";

// ResumeProvider wraps all routes so builder state survives navigation to/from home
const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ErrorBoundary>
          <ResumeProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ResumeProvider>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
