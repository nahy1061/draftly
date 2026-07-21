import { useEffect } from "react";

// Persists value to localStorage whenever it changes
export function useLocalStorage(key, value) {
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  }, [key, value]);
}

// One-time read — used for reducer init before first render
export function loadFromLocalStorage(key) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Failed to load from localStorage:", err);
    return null;
  }
}