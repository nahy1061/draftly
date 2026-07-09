import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import Card from "../components/Card";

function Home() {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-[#FAF8F3] to-[#F1E9D8] dark:from-[#1C2541] dark:to-[#1C2541] transition-colors duration-300 font-body text-[#1C2541] dark:text-[#F2EFE9] overflow-hidden">
      {/* dot-grid texture, light mode only */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1C2541 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      ></div>

      {/* Header */}
      <header className="relative max-w-5xl mx-auto flex justify-between items-center px-6 py-6">
        <span className="font-mono-draft text-xs tracking-widest uppercase text-[#3C6E71] dark:text-[#7FA8A3] border border-[#3C6E71]/30 dark:border-[#7FA8A3]/30 rounded-full px-3 py-1">
          draft · v1.0
        </span>
        <ThemeToggle />
      </header>

      {/* Name */}
      <main className="relative max-w-5xl mx-auto px-6 pt-16 pb-24 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <h1 className="font-display text-6xl sm:text-7xl font-semibold tracking-tight leading-[0.95] mb-6">
            Draftly
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl leading-relaxed mb-10 max-w-md">
            Your career, drafted to{" "}
            <span className="relative inline-block">
              <span className="relative z-10">perfection</span>
              <span className="absolute left-0 right-0 bottom-1 h-1.5 bg-[#F4B942]/60 z-0"></span>
            </span>
            .
          </p>

          {/* Start Drafting Button */}
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] font-medium px-7 py-3.5 rounded-full transition-all duration-200 hover:gap-3 hover:bg-[#3C6E71] dark:hover:bg-[#F2EFE9] active:scale-95 shadow-[0_10px_25px_-8px_rgba(244,185,66,0.6)] dark:shadow-none"
          >
            Start drafting
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <Card />
      </main>
    </div>
  );
}

export default Home;
