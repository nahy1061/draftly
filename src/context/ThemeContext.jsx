import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

// Syncs dark class on <html> and persists preference to localStorage
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Lazy init from localStorage — runs once before first render
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
