import { useRef } from "react";

const SWIPE_THRESHOLD = 60; // min px horizontal travel to count as a swipe
const LOCK_THRESHOLD = 10; // px moved before we decide horizontal vs vertical

export function useSwipeNavigation(onSwipeLeft, onSwipeRight) {
  const startRef = useRef(null);
  const lockedRef = useRef(null); // null | "horizontal" | "vertical"

  function handleTouchStart(e) {
    const touch = e.touches[0];
    startRef.current = { x: touch.clientX, y: touch.clientY };
    lockedRef.current = null; // reset direction lock for each new touch
  }

  function handleTouchMove(e) {
    if (!startRef.current || lockedRef.current) return; // already decided

    const touch = e.touches[0];
    const deltaX = touch.clientX - startRef.current.x;
    const deltaY = touch.clientY - startRef.current.y;

    // Lock direction early so vertical scrolls aren't misread as swipes
    if (Math.abs(deltaX) > LOCK_THRESHOLD || Math.abs(deltaY) > LOCK_THRESHOLD) {
      lockedRef.current = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
    }
  }

  function handleTouchEnd(e) {
    if (!startRef.current) return;

    const wasHorizontal = lockedRef.current === "horizontal";
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startRef.current.x;

    // Clear state before checking direction — keeps a fast second tap clean
    startRef.current = null;
    lockedRef.current = null;

    if (!wasHorizontal) return; // locked as a scroll — ignore entirely
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX < 0) onSwipeLeft?.();
    else onSwipeRight?.();
  }

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}