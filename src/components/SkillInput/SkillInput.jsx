import { useState } from "react";
import { useResume } from "../../context/ResumeContext";
import { generateID } from "../../utils/generateID";

function SkillInput({ section, fieldKey, placeholder }) {
  const { resumeData, dispatch } = useResume();
  const [value, setValue] = useState("");

  function handleAdd(e) {
    e.preventDefault(); // stop the form from reloading the page
    const trimmed = value.trim();
    if (!trimmed) return; // ignore empty submits

    const alreadyExists = resumeData[section].some(
      (item) => item[fieldKey].toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadyExists) return; // no duplicates

    dispatch({
      type: "ADD_ITEM",
      payload: { section, item: { id: generateID(), [fieldKey]: trimmed } },
    });
    setValue("");
  }

  function handleRemove(id) {
    dispatch({ type: "REMOVE_ITEM", payload: { section, id } });
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
        />
        <button
          type="submit"
          className="bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] px-5 py-2 rounded-full font-medium"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        {resumeData[section].map((item) => (
          <span
            key={item.id}
            className="flex items-center gap-1.5 text-sm bg-[#3C6E71]/10 text-[#3C6E71] dark:bg-[#7FA8A3]/10 dark:text-[#7FA8A3] px-3 py-1 rounded-full"
          >
            {item[fieldKey]}
            <button
              type="button"
              onClick={() => handleRemove(item.id)}
              className="hover:text-red-500"
              aria-label={`Remove ${item[fieldKey]}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillInput;