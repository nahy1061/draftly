import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

function BuilderHeader() {
  return (
    <header className="print:hidden flex justify-between items-center px-6 py-4 border-b border-[#1C2541]/10 dark:border-[#F2EFE9]/10">
      <Link to="/" className="font-display text-xl font-semibold">
        Draftly
      </Link>
      <ThemeToggle />
    </header>
  );
}

export default BuilderHeader;