function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-4 right-4 text-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350 transition-colors duration-200"
      aria-label="Close"
    >
      ×
    </button>
  );
}

export default CloseButton;