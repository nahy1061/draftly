import { useState } from "react";
import { useFormik } from "formik";
import { experienceSchema } from "../../utils/validationSchemas";
import FormInput from "./FormInput";
import { useResume } from "../../context/ResumeContext";
import { generateID } from "../../utils/generateID";
import { formatMonthYear } from "../../utils/formatDate";
import { calculateDuration } from "../../utils/calculateDuration";
import { useAutoEditEntry } from "../../hooks/useAutoEditEntry";
import MonthYearField from "./MonthYearField";

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
    const checked = e.target.checked;

    formik.setValues({
      ...formik.values,
      current: checked,
      // Wipe endDate when "currently working" is checked so it doesn't fail validation
      endDate: checked ? "" : formik.values.endDate,
    });

    if (checked) {
      // Also clear touched so the now-hidden endDate field doesn't show an error
      formik.setFieldTouched("endDate", false, false);
    }
  }

  useAutoEditEntry("experience", resumeData.experience, handleEdit);
  
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
            <MonthYearField
              value={formik.values.endDate}
              onChange={(val) => formik.setFieldValue("endDate", val)}
              onBlur={() => formik.setFieldTouched("endDate", true)}
              disabled={formik.values.current}
              hasError={formik.touched.endDate && formik.errors.endDate}
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
            className="h-4 w-4 rounded-sm border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
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
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition-all"
          />
          {formik.touched.responsibilities &&
            formik.errors.responsibilities && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.responsibilities}
              </p>
            )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 px-5 py-2 rounded-lg font-semibold active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-600/10 dark:shadow-none"
          >
            {editingID ? "Update" : "Add"} Experience
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
        {resumeData.experience &&
          resumeData.experience.map((entry) => (
            <li
              key={entry.id}
              className="flex justify-between items-start gap-4 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 bg-white/40 dark:bg-slate-900/40"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium">{entry.position}</p>
                  {entry.current && (
                    <span className="text-xs font-mono-draft uppercase tracking-wide bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-900/50 px-2 py-0.5 rounded-full font-medium">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  {entry.company} · {formatMonthYear(entry.startDate)} –{" "}
                  {entry.current ? "Present" : formatMonthYear(entry.endDate)}
                  {" · "}
                  {calculateDuration(
                    entry.startDate,
                    // Empty string tells calculateDuration to use today's date
                    entry.current ? "" : entry.endDate,
                  )}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {entry.responsibilities}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
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

export default ExperienceForm;
