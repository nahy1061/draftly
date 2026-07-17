import { useRef } from "react";

const SWIPE_THRESHOLD = 50; // minimum horizontal distance (px) to count as a swipe

// Attaches to a container. Call the returned handlers on onTouchStart/onTouchEnd. 
// Fires onSwipeLeft/onSwipeRight when a clear horizontal swipe is detected, ignoring vertical scrolls and swipes that started on a text input (so text selection still works normally).
export function useSwipeNavigation(onSwipeLeft, onSwipeRight) {
  const touchStartRef = useRef(null);

function handleTouchStart(e) {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(e) {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    touchStartRef.current = null;
    
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0) {
      onSwipeLeft?.();
    } else {
      onSwipeRight?.();
    }
  }

  return { onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd };
}