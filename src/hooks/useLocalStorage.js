import { useEffect } from "react";

// Write/Save data in local storage
export function useLocalStorage(key, value) {
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  }, [key, value]);
}

// Read data from local storage
export function loadFromLocalStorage(key) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Failed to load from localStorage:", err);
    return null;
  }
}