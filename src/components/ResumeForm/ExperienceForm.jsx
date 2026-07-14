import { useState } from "react";
import { useFormik } from "formik";
import { experienceSchema } from "../../utils/validationSchemas";
import FormInput from "./FormInput";
import { useResume } from "../../context/ResumeContext";
import { generateID } from "../../utils/generateID";
import { formatMonthYear } from "../../utils/formatDate";

const emptyExperience = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  current: false,
  responsibilities: "",
};

function ExperienceForm() {
  const { resumeData, dispatch } = useResume();
  const [editingID, setEditingID] = useState(null);

  const formik = useFormik({
    initialValues: emptyExperience,
    validationSchema: experienceSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editingID) {
        dispatch({
          type: "UPDATE_ITEM",
          payload: {
            section: "experience",
            id: editingID,
            item: { ...values, id: editingID },
          },
        });
      } else {
        dispatch({
          type: "ADD_ITEM",
          payload: {
            section: "experience",
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
    dispatch({
      type: "REMOVE_ITEM",
      payload: { section: "experience", id },
    });
  }

  function handleCurrentChange(e) {
    formik.handleChange(e); // let formik update `current` normally
    if (e.target.checked) {
      formik.setFieldValue("endDate", "");
    }
  }

  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold mb-4">Experience</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormInput formik={formik} name="company" label="Company" />
        <FormInput formik={formik} name="position" label="Position" />

        <div className="flex gap-4">
          <FormInput
            formik={formik}
            name="startDate"
            label="Start Date"
            type="month"
          />
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="month"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.values.current}
              className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent disabled:opacity-40"
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.endDate}
              </p>
            )}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="current"
            checked={formik.values.current}
            onChange={handleCurrentChange}
            className="h-4 w-4"
          />
          I currently work here
        </label>

        <div>
          <label className="block text-sm font-medium mb-1">
            Responsibilities
          </label>
          <textarea
            name="responsibilities"
            value={formik.values.responsibilities}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
          />
          {formik.touched.responsibilities &&
            formik.errors.responsibilities && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.responsibilities}
              </p>
            )}
        </div>

        {/* Add/Update Education Button  */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] px-5 py-2 rounded-full font-medium"
          >
            {editingID ? "Update" : "Add"} Experience
          </button>
          {/* Show cancel btn only when updating form  */}
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
      {/* Entry Preview with Edit/Delete Btn  */}
      <ul className="space-y-3 mt-6">
        {resumeData.experience &&
          resumeData.experience.map((entry) => (
            <li
              key={entry.id}
              className="flex justify-between items-start gap-4 border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg p-4"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium">{entry.position}</p>
                  {entry.current && (
                    <span className="text-xs font-mono-draft uppercase tracking-wide bg-[#F4B942]/20 text-[#F4B942] px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#3C6E71] dark:text-[#7FA8A3]">
                  {entry.company} · {formatMonthYear(entry.startDate)} –{" "}
                  {entry.current ? "Present" : formatMonthYear(entry.endDate)}
                </p>
                <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60 mt-1">
                  {entry.responsibilities}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
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

export default ExperienceForm;
