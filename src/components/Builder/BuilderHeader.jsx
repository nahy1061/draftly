import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

function BuilderHeader() {
  return (
    <header className="print:hidden flex justify-between items-center px-6 py-4 border-b border-[#1C2541]/10 dark:border-[#F2EFE9]/10">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="src/assets/logo/pen-logo.png"
          alt="Draftly logo"
          className="h-8 w-8 object-contain drop-shadow-sm"
        />
        <span className="font-display text-xl font-semibold">Draftly</span>
      </Link>
      <ThemeToggle />
    </header>
  );
}

export default BuilderHeader;