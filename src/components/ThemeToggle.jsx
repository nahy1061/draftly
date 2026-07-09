import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded-full border dark:border-gray-600 border-gray-300"
    >
      {/* TODO: show "🌙" when NOT dark (meaning: click to go dark), 
          show "☀️" when dark (meaning: click to go light) 
          hint: this is just a ternary on isDark, same as your className patterns */}

          {isDark? "☀️" : "🌙" }
    </button>
  );
}

export default ThemeToggle;