import { useState } from "react";
import { useResume } from "../../context/ResumeContext";
import { generateID } from "../../utils/generateID";

// Reused for skills and interests — tag-style add/remove lists
function SkillInput({ section, fieldKey, placeholder }) {
  const { resumeData, dispatch } = useResume();
  const [value, setValue] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    // Case-insensitive dedupe — "react" and "React" are the same skill
    const alreadyExists = resumeData[section].some(
      (item) => item[fieldKey].toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadyExists) return;

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
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition-all"
        />
        <button
          type="submit"
          className="bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 px-5 py-2 rounded-lg font-semibold active:scale-95 transition-all duration-200"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        {resumeData[section].map((item) => (
          <span
            key={item.id}
            className="flex items-center gap-1.5 text-sm bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 px-3 py-1 rounded-full"
          >
            {item[fieldKey]}
            <button
              type="button"
              onClick={() => handleRemove(item.id)}
              className="hover:text-red-500 font-bold ml-0.5"
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