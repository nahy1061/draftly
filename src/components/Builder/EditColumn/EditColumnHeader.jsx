import SectionPickerButton from "./SectionPickerButton";
import ResetButton from "./ResetButton";
import ProgressIndicator from "../ProgressIndicator";

function EditColumnHeader() {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-[#3C6E71] dark:text-[#7FA8A3]">
          Editor
        </h2>
        <div className="flex gap-2">
          <SectionPickerButton />
          <ResetButton />
        </div>
      </div>
      <ProgressIndicator />
    </div>
  );
}

export default EditColumnHeader;