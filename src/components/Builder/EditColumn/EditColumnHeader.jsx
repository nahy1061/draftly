import SectionPickerButton from "./SectionPickerButton";
import ResetButton from "./ResetButton";

function EditColumnHeader() {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-[#3C6E71] dark:text-[#7FA8A3]">
        Editor
      </h2>
      <div className="flex gap-2">
        <SectionPickerButton />
        <ResetButton />
      </div>
    </div>
  );
}

export default EditColumnHeader;
