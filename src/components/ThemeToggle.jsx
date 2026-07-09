import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

   return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${
        isDark ? "bg-[#F4B942]" : "bg-[#1C2541]/15"
      }`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-[#FAF8F3] shadow-md transform transition-transform duration-300 text-xs ${
          isDark ? "translate-x-7" : "translate-x-1"
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

export default ThemeToggle;