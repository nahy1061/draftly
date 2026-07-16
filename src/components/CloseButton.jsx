function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-4 right-4 text-xl text-[#1C2541]/40 dark:text-[#F2EFE9]/40 hover:text-[#1C2541] dark:hover:text-[#F2EFE9]"
      aria-label="Close"
    >
      ×
    </button>
  );
}

export default CloseButton;