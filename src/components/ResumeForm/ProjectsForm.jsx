import { useState } from "react";
import { useFormik } from "formik";
import { projectSchema } from "../../utils/validationSchemas";
import FormInput from "./FormInput";
import { useResume } from "../../context/ResumeContext";
import { generateID } from "../../utils/generateID";
import { useAutoEditEntry } from "../../hooks/useAutoEditEntry";

function textToArray(text) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function arrayToText(arr) {
  return arr.join(", ");
}

const emptyProject = {
  name: "",
  description: "",
  technologies: "", // kept as TEXT in the form itself, converted on submit
  githubLink: "",
  liveDemoLink: "",
};

function ProjectsForm() {
  const { resumeData, dispatch } = useResume();
  const [editingID, setEditingID] = useState(null);

  const formik = useFormik({
    initialValues: emptyProject,
    validationSchema: projectSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      // Convert the technologies text into an array right before saving
      const item = {
        ...values,
        technologies: textToArray(values.technologies),
      };

      if (editingID) {
        dispatch({
          type: "UPDATE_ITEM",
          payload: {
            section: "projects",
            id: editingID,
            item: { ...item, id: editingID },
          },
        });
      } else {
        dispatch({
          type: "ADD_ITEM",
          payload: { section: "projects", item: { ...item, id: generateID() } },
        });
      }

      resetForm();
      setEditingID(null);
    },
  });

  function handleEdit(entry) {
    setEditingID(entry.id);
    // Convert the array BACK to text so the input box can show it
    formik.setValues({
      ...entry,
      technologies: arrayToText(entry.technologies),
    });
  }

  function handleCancelEdit() {
    setEditingID(null);
    formik.resetForm();
  }

  function handleDelete(id) {
    dispatch({ type: "REMOVE_ITEM", payload: { section: "projects", id } });
  }
  
  useAutoEditEntry("projects", resumeData.projects, handleEdit);

  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold mb-4">Projects</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormInput formik={formik} name="name" label="Project Name" />

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>

        <FormInput
          formik={formik}
          name="technologies"
          label="Technologies Used (comma-separated)"
        />

        <FormInput formik={formik} name="githubLink" label="GitHub Link" />
        <FormInput formik={formik} name="liveDemoLink" label="Live Demo Link" />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] px-5 py-2 rounded-full font-medium"
          >
            {editingID ? "Update" : "Add"} Project
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
        {resumeData.projects &&
          resumeData.projects.map((entry) => (
            <li
              key={entry.id}
              className="flex justify-between items-start gap-4 border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg p-4"
            >
              <div>
                <p className="font-medium">{entry.name}</p>
                <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60">
                  {entry.description}
                </p>
                {entry.technologies.length > 0 && (
                  <p className="text-xs text-[#3C6E71] dark:text-[#7FA8A3] mt-1">
                    {entry.technologies.join(" · ")}
                  </p>
                )}
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

export default ProjectsForm;
