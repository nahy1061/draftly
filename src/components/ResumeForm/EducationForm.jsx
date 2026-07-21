import { useState } from "react";
import { useFormik } from "formik";
import { educationSchema } from "../../utils/validationSchemas";
import FormInput from "./FormInput";
import { useResume } from "../../context/ResumeContext";
import { generateID } from "../../utils/generateID";
import { useAutoEditEntry } from "../../hooks/useAutoEditEntry";

const emptyEducation = {
  degree: "",
  institute: "",
  startYear: "",
  endYear: "",
  scoreType: "cgpa",
  obtainedCgpa: "",
  totalCgpa: "",
  obtainedMarks: "",
  totalMarks: "",
};

// EducationForm handles both add and edit — editingID being set is what switches between them
function EducationForm() {
  const { resumeData, dispatch } = useResume();
  const [editingID, setEditingID] = useState(null);

  const formik = useFormik({
    initialValues: emptyEducation,
    validationSchema: educationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editingID) {
        dispatch({
          type: "UPDATE_ITEM",
          payload: {
            section: "education",
            id: editingID,
            item: { ...values, id: editingID },
          },
        });
      } else {
        dispatch({
          type: "ADD_ITEM",
          payload: {
            section: "education",
            item: { ...values, id: generateID() },
          },
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
    dispatch({ type: "REMOVE_ITEM", payload: { section: "education", id } });
  }

  useAutoEditEntry("education", resumeData.education, handleEdit);

  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold mb-4">Education</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormInput formik={formik} name="degree" label="Degree" />
        <FormInput formik={formik} name="institute" label="Institute" />

        <div className="flex gap-4">
          <FormInput
            formik={formik}
            name="startYear"
            label="Start Year"
            type="number"
          />
          <FormInput
            formik={formik}
            name="endYear"
            label="End Year"
            type="number"
          />
        </div>

        {/* scoreType drives which score fields are shown and which Yup rules are active */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="scoreType"
              value="cgpa"
              checked={formik.values.scoreType === "cgpa"}
              onChange={formik.handleChange}
            />
            CGPA
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="scoreType"
              value="marks"
              checked={formik.values.scoreType === "marks"}
              onChange={formik.handleChange}
            />
            Marks
          </label>
          <span className="text-xs text-slate-400 dark:text-slate-500 self-center">
            (Optional)
          </span>
        </div>

        {formik.values.scoreType === "cgpa" ? (
          <div className="flex gap-4">
            <FormInput
              formik={formik}
              name="obtainedCgpa"
              label="CGPA Obtained"
              type="number"
            />
            <FormInput
              formik={formik}
              name="totalCgpa"
              label="Out of"
              type="number"
            />
          </div>
        ) : (
          <div className="flex gap-4">
            <FormInput
              formik={formik}
              name="obtainedMarks"
              label="Marks Obtained"
              type="number"
            />
            <FormInput
              formik={formik}
              name="totalMarks"
              label="Total Marks"
              type="number"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 px-5 py-2 rounded-lg font-semibold active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-600/10 dark:shadow-none"
          >
            {editingID ? "Update" : "Add"} Education
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
        {resumeData.education &&
          resumeData.education.map((entry) => (
            <li
              key={entry.id}
              className="flex justify-between items-center border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 bg-white/40 dark:bg-slate-900/40"
            >
              <div>
                <p className="font-medium">{entry.degree}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {entry.institute} · {entry.startYear}–{entry.endYear}
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

export default EducationForm;
