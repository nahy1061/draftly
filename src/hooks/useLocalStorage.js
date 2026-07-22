import { useEffect } from "react";
import { useToast } from "../context/ToastContext";

// Persists value to localStorage whenever it changes
export function useLocalStorage(key, value) {
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
      // QuotaExceededError is the most likely cause — large profile photos hit the 5MB cap
      if (err.name === "QuotaExceededError" || err.code === 22) {
        showToast("Storage limit reached. Try removing your profile photo to free up space.");
      } else {
        showToast("Failed to save your resume data. Changes may not persist.");
      }
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
