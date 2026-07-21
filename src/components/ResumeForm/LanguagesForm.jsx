import { useState } from "react";
import { useFormik } from "formik";
import { PROFICIENCY_LEVELS } from "../../utils/constants";
import { generateID } from "../../utils/generateID";
import { useResume } from "../../context/ResumeContext";
import { languageSchema } from "../../utils/validationSchemas";
import FormInput from "./FormInput";
import { useAutoEditEntry } from "../../hooks/useAutoEditEntry";

const emptyLanguage = {
  name: "",
  proficiency: PROFICIENCY_LEVELS[0], // "Beginner" — first item is the safest default
};

function LanguagesForm() {
  const { resumeData, dispatch } = useResume();
  const [editingID, setEditingID] = useState(null);

  const formik = useFormik({
    initialValues: emptyLanguage,
    validationSchema: languageSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editingID) {
        dispatch({
          type: "UPDATE_ITEM",
          payload: { section: "languages", id: editingID, item: { ...values, id: editingID } },
        });
      } else {
        dispatch({
          type: "ADD_ITEM",
          payload: { section: "languages", item: { ...values, id: generateID() } },
        });
      }
      resetForm();
      setEditingID(null);
    },
  });

  function handleEdit(entry) {
    setEditingID(entry.id);
    formik.setValues(entry);
  }

  function handleCancelEdit() {
    setEditingID(null);
    formik.resetForm();
  }

  function handleDelete(id) {
    dispatch({ type: "REMOVE_ITEM", payload: { section: "languages", id } });
  }
  
  useAutoEditEntry("languages", resumeData.languages, handleEdit);

  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold mb-4">Languages</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormInput formik={formik} name="name" label="Language" />
        <FormInput
          formik={formik}
          name="proficiency"
          label="Proficiency"
          type="select"
          options={PROFICIENCY_LEVELS}
        />
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 px-5 py-2 rounded-lg font-semibold active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-600/10 dark:shadow-none"
          >
            {editingID ? "Update" : "Add"} Language
          </button>
          {editingID && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3 mt-6">
        {resumeData.languages &&
          resumeData.languages.map((entry) => (
            <li
              key={entry.id}
              className="flex justify-between items-center border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 bg-white/40 dark:bg-slate-900/40"
            >
              <div>
                <p className="font-medium">{entry.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {entry.proficiency}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(entry)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-950 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LanguagesForm;