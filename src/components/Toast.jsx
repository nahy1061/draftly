import { useEffect, useState } from "react";

// Lightweight toast — auto-dismisses after 4s, no external library needed
function Toast({ message, type = "error", onDismiss }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
        type === "error"
          ? "bg-red-600 text-white"
          : "bg-slate-800 text-white"
      }`}
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={() => { setVisible(false); onDismiss?.(); }}
        className="ml-1 opacity-70 hover:opacity-100 font-bold"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
