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

        {/* Radio Button */}
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
          <span className="text-xs text-[#1C2541]/40 dark:text-[#F2EFE9]/40 self-center">
            (Optional)
          </span>
        </div>

        {/* CGPA / Marks Fields  */}
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

        {/* Add/Update Education Button  */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] px-5 py-2 rounded-full font-medium"
          >
            {editingID ? "Update" : "Add"} Education
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

      {/* Entry Preview with Edit/Delete Btn  */}
      <ul className="space-y-3 mt-6">
        {resumeData.education &&
          resumeData.education.map((entry) => (
            <li
              key={entry.id}
              className="flex justify-between items-center border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg p-4"
            >
              <div>
                <p className="font-medium">{entry.degree}</p>
                <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60">
                  {entry.institute} · {entry.startYear}–{entry.endYear}
                </p>
              </div>

              {/* edit/delete buttons  */}
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

export default EducationForm;
