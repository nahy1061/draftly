function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="text-xs px-3 py-1.5 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20"
    >
      Print Resume
    </button>
  );
}

export default PrintButton;