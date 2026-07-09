import { useEffect } from "react";
import { useFormik } from "formik";
import { useResume } from "../../context/ResumeContext";
import { personalInfoSchema } from "../../utils/validationSchemas";
import CountryCodeSelect from "./CountryCodeSelect";

function PersonalInfoForm() {
  const { resumeData, dispatch } = useResume();

  const formik = useFormik({
    initialValues: resumeData.personalInfo,
    validationSchema: personalInfoSchema,
    onSubmit: () => {}, // unused — we sync via useEffect instead, not a submit button
  });

  useEffect(() => {
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload: formik.values });
  }, [formik.values]);

  function handlePhotoUpload(e) {
  const file = e.target.files[0]; // the selected File object, or undefined if cancelled
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    formik.setFieldValue("profilePhoto", reader.result);
  };
  reader.readAsDataURL(file); // kicks off the async read; onload fires when done
}

  return (
    <form className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Job Title</label>
        <input
          name="jobTitle"
          value={formik.values.jobTitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
        />
        {formik.touched.jobTitle && formik.errors.jobTitle && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.jobTitle}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <div className="flex gap-2">
          <CountryCodeSelect
            value={formik.values.countryCode}
            onChange={formik.handleChange}
          />
          <input
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="flex-1 px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
          />
        </div>
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
        />
        {formik.touched.address && formik.errors.address && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
        )}
      </div>

      {/* Linkedin */}
      <div>
        <label className="block text-sm font-medium mb-1">Linkedin</label>
        <input
          name="linkedin"
          value={formik.values.linkedin}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
        />
        {formik.touched.linkedin && formik.errors.linkedin && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.linkedin}</p>
        )}
      </div>

      {/* Github */}
      <div>
        <label className="block text-sm font-medium mb-1">Github</label>
        <input
          name="github"
          value={formik.values.github}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
        />
        {formik.touched.github && formik.errors.github && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.github}</p>
        )}
      </div>

      {/* Portfolio */}
      <div>
        <label className="block text-sm font-medium mb-1">Portfolio</label>
        <input
          name="portfolio"
          value={formik.values.portfolio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
        />
        {formik.touched.portfolio && formik.errors.portfolio && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.portfolio}</p>
        )}
      </div>

      {/* Summary */}
      <div>
        <label className="block text-sm font-medium mb-1">Summary</label>
        <textarea
          name="summary"
          value={formik.values.summary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
        />
        <div className="flex justify-between text-sm mt-1">
          {formik.touched.summary && formik.errors.summary ? (
            <p className="text-red-500">{formik.errors.summary}</p>
          ) : (
            <span />
          )}
          <span className="text-[#1C2541]/40 dark:text-[#F2EFE9]/40">
            {formik.values.summary.length}/500
          </span>
        </div>
      </div>

      {/* Profile Photo */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Profile Photo
          </label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {formik.values.profilePhoto && (
            <img
              src={formik.values.profilePhoto}
              alt="Profile preview"
              className="mt-2 w-40 h-40 rounded-full object-cover"
            />
          )}
        </div>
    </form>
  );
}

export default PersonalInfoForm;
