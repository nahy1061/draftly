import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFBFD] dark:bg-[#0B0F19] px-6">
      <div className="max-w-sm text-center">
        <h1 className="font-display text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          404
        </h1>
        <p className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Page not found
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
