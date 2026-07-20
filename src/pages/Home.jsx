import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import Card from "../components/Card";

function Home() {
  return (
    <div className="relative min-h-screen bg-[#FAFBFD] dark:bg-[#0B0F19] bg-[radial-gradient(at_top_right,rgba(99,102,241,0.06),transparent_50%),radial-gradient(at_bottom_left,rgba(139,92,246,0.04),transparent_50%)] dark:bg-[radial-gradient(at_top_right,rgba(99,102,241,0.12),transparent_40%),radial-gradient(at_bottom_left,rgba(139,92,246,0.08),transparent_40%)] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-body overflow-hidden">
      {/* Grid line texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Distinct Floating Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="src/assets/logo/pen-logo.png"
              alt="Draftly Logo"
              className="h-8 w-8 object-contain dark:invert transition-transform group-hover:scale-105"
            />
            <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Draftly
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-mono-draft text-[10px] tracking-widest uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/50 rounded-full px-3 py-1 font-semibold">
              v1.0
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative max-w-6xl mx-auto px-6 pt-20 pb-28 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          {/* Sub-badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
            100% local, private & secure
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-slate-900 dark:text-white mb-6">
            Your resume, drafted to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              perfection
            </span>
            .
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
            Create elegant, high-impact resumes in minutes. Completely private, professional templates, instant PDF download.
          </p>

          {/* Start Drafting Button */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              to="/builder"
              className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-indigo-500/20 dark:shadow-none hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 group"
            >
              Start Drafting
              <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Hero Card Visual */}
        <div className="relative flex-1 flex justify-center w-full lg:w-auto">
          {/* Subtle background glow effect behind the card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/20 dark:to-violet-500/20 rounded-2xl blur-3xl opacity-75 scale-90 pointer-events-none"></div>
          <Card />
        </div>
      </main>

      {/* Feature grid section */}
      <section className="relative max-w-6xl mx-auto px-6 pb-28 border-t border-slate-200/40 dark:border-slate-800/40 pt-20">
        <div className="text-center lg:text-left mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            Why Choose Draftly
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Everything you need for an outstanding resume.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Reorder with Ease */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300">
            <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5 border border-indigo-100/50 dark:border-indigo-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
              Reorder with Ease
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Organize sections on the fly. Drag and drop to position education, projects, or experience exactly where they fit best.
            </p>
          </div>

          {/* Card 2: Designed for Success */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300">
            <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5 border border-indigo-100/50 dark:border-indigo-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.37-9.445m-1.187-.14l-1.41-1.41a2.25 2.25 0 00-3.182 0l-3 3a2.25 2.25 0 000 3.182l3 3a2.25 2.25 0 003.182 0l3-3a2.25 2.25 0 000-3.182l-3-3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
              Designed for Success
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Switch between Minimal, Modern, Professional, and ATS templates in one click. Tailored to beat sorting filters and impress hiring managers.
            </p>
          </div>

          {/* Card 3: Privacy First */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300">
            <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5 border border-indigo-100/50 dark:border-indigo-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
              100% Client-Side Privacy
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Your data never leaves your browser. No accounts, no servers, no databases. Complete ownership of your career information.
            </p>
          </div>
        </div>
      </section>

      {/* Distinct Flat Footer */}
      <footer className="bg-slate-100/80 dark:bg-[#070b13] border-t border-slate-200/60 dark:border-slate-800/80 py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <img
                src="src/assets/logo/pen-logo.png"
                alt="Draftly Logo"
                className="h-6 w-6 object-contain dark:invert"
              />
              <span className="font-display font-semibold tracking-tight text-slate-900 dark:text-white">
                Draftly
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center md:text-left">
              © 2026 Draftly. Crafted for professional growth.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <Link
              to="/builder"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
            >
              Resume Builder
            </Link>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium select-none pointer-events-none">
              Privacy First (Local Only)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
