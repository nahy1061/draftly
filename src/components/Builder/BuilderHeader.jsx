import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

function BuilderHeader() {
  return (
    <header className="print:hidden sticky top-0 z-50 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center px-6 py-4 transition-colors duration-300">
      <Link to="/" className="flex items-center gap-2.5 group">
        <img
          src="src/assets/logo/pen-logo.png"
          alt="Draftly logo"
          className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
        />
        <span className="font-display text-xl font-bold tracking-tight bg-linear-to-r from-slate-900 via-indigo-950 to-indigo-900 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
          Draftly
        </span>
      </Link>
      <ThemeToggle />
    </header>
  );
}

export default BuilderHeader;