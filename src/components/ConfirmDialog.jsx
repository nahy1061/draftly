function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false, // turns the confirm button red
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  function handleOverlayClick(e) {
    // Only close when clicking the backdrop, not the dialog card itself
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-sm bg-[#FAF8F3] dark:bg-[#1C2541] rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60 mb-6">
          {message}
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 px-5 py-2.5 rounded-full"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 px-5 py-2.5 rounded-full font-medium text-white ${
              destructive
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#1C2541] dark:bg-[#F4B942] dark:text-[#1C2541]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;