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
  proficiency: PROFICIENCY_LEVELS[0], // defaults to "Beginner"
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
            className="bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] px-5 py-2 rounded-full font-medium"
          >
            {editingID ? "Update" : "Add"} Language
          </button>
          {editingID && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-5 py-2 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20"
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
              className="flex justify-between items-center border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg p-4"
            >
              <div>
                <p className="font-medium">{entry.name}</p>
                <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60">
                  {entry.proficiency}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(entry)}
                  className="text-sm px-3 py-1 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="text-sm px-3 py-1 rounded-full border border-red-400 text-red-500"
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