import { useResume } from "../../context/ResumeContext";

function ResetButton() {
  const { dispatch } = useResume();   //use context

  function handleReset() {
    // Native browser confirm — simple, no extra component needed for
    // a destructive one-off action like this. Can upgrade to a custom
    // modal later if you want it styled to match the app.
    const confirmed = window.confirm(
      "This will erase all resume data. This can't be undone. Continue?"
    );
    if (confirmed) {
      dispatch({ type: "RESET_RESUME" });
    }
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      className="text-xs px-3 py-1.5 rounded-full border border-red-400 text-red-500"
    >
      Reset Resume
    </button>
  );
}

export default ResetButton;