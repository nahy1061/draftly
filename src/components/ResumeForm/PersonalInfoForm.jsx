import { useEffect } from "react";
import { useFormik } from "formik";
import { useResume } from "../../context/ResumeContext";
import { personalInfoSchema } from "../../utils/validationSchemas";
import CountryCodeSelect from "./CountryCodeSelect";
import FormInput from "./FormInput";

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
      <h2 className="font-display text-2xl font-semibold mb-4">
        Personal Information
      </h2>
      <FormInput formik={formik} name="fullName" label="Full Name" />
      <FormInput formik={formik} name="email" label="Email" type="email" />
      <FormInput formik={formik} name="jobTitle" label="Job Title" />

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

      <FormInput formik={formik} name="address" label="Address" />
      <FormInput formik={formik} name="linkedin" label="LinkedIn" />
      <FormInput formik={formik} name="github" label="GitHub" />
      <FormInput formik={formik} name="portfolio" label="Portfolio" />

      {/* Summary */}
      <div>
        <div className="flex gap-2">
        <label className="block text-sm font-medium mb-1">Summary</label>
        <span className="text-xs text-[#1C2541]/40 dark:text-[#F2EFE9]/40 self-center">
          (Optional)
        </span>
        </div>
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
        <label className="block text-sm font-medium mb-1">Profile Photo</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        {formik.values.profilePhoto && (
          <img
            src={formik.values.profilePhoto}
            alt="Profile preview"
            className="mt-2 w-30 h-30 rounded-full object-cover"
          />
        )}
      </div>
    </form>
  );
}

export default PersonalInfoForm;
