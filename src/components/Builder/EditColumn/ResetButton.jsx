import { useState } from "react";
import { useResume } from "../../../context/ResumeContext";
import ConfirmDialog from "../../ConfirmDialog";

function ResetButton() {
  const { dispatch } = useResume();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleConfirm() {
    dispatch({ type: "RESET_RESUME" });
    setConfirmOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="text-xs px-3 py-1.5 rounded-full border border-red-400 text-red-500"
      >
        Reset Resume
      </button>

      <ConfirmDialog
        open={confirmOpen}
        title="Reset your resume?"
        message="This will erase all resume data. This can't be undone."
        confirmLabel="Reset"
        destructive
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

export default ResetButton;