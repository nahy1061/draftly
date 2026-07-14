import { useState } from "react";
import { useFormik } from "formik";
import { certificationSchema } from "../../utils/validationSchemas";
import FormInput from "./FormInput";
import { useResume } from "../../context/ResumeContext";
import { generateID } from "../../utils/generateID";
import { formatMonthYear } from "../../utils/formatDate";

const emptyCertification = {
  name: "",
  issuer: "",
  date: "",
  credentialUrl: "",
};

function CertificationsForm() {
  const { resumeData, dispatch } = useResume();
  const [editingID, setEditingID] = useState(null);

  const formik = useFormik({
    initialValues: emptyCertification,
    validationSchema: certificationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editingID) {
        dispatch({
          type: "UPDATE_ITEM",
          payload: { section: "certifications", id: editingID, item: { ...values, id: editingID } },
        });
      } else {
        dispatch({
          type: "ADD_ITEM",
          payload: { section: "certifications", item: { ...values, id: generateID() } },
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
    dispatch({ type: "REMOVE_ITEM", payload: { section: "certifications", id } });
  }

  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold mb-4">Certifications</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormInput formik={formik} name="name" label="Certification Name" />
        <FormInput formik={formik} name="issuer" label="Issuing Organization" />
        <FormInput formik={formik} name="date" label="Date" type="month" />
        <FormInput formik={formik} name="credentialUrl" label="Credential URL" />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] px-5 py-2 rounded-full font-medium"
          >
            {editingID ? "Update" : "Add"} Certification
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
        {resumeData.certifications &&
          resumeData.certifications.map((entry) => (
            <li
              key={entry.id}
              className="flex justify-between items-start gap-4 border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg p-4"
            >
              <div>
                <p className="font-medium">{entry.name}</p>
                <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60">
                  {entry.issuer} · {formatMonthYear(entry.date)}
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

export default CertificationsForm;