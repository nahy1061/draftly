function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
    >
      Print Resume
    </button>
  );
}

export default PrintButton;