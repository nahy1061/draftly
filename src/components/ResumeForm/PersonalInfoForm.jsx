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
    onSubmit: () => {}, // sync via useEffect — no submit button on this form
  });

  // Push every keystroke into context (auto-save picks it up)
  useEffect(() => {
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload: formik.values });
  }, [formik.values]);

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      formik.setFieldValue("profilePhoto", reader.result);
    };
    // Store as base64 data URL so it survives localStorage
    reader.readAsDataURL(file);
  }

  return (
    <form className="space-y-4">
      <h2 className="font-display text-2xl font-semibold mb-4">
        Personal Information
      </h2>
      <FormInput formik={formik} name="fullName" label="Full Name" />
      <FormInput formik={formik} name="email" label="Email" type="email" />
      <FormInput formik={formik} name="jobTitle" label="Job Title" />

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
           className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition-all"
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

      <div>
        <div className="flex gap-2">
        <label className="block text-sm font-medium mb-1">Summary</label>
        <span className="text-xs text-slate-400 dark:text-slate-500 self-center">
          (Optional)
        </span>
        </div>
        <textarea
          name="summary"
          value={formik.values.summary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition-all"
        />
        <div className="flex justify-between text-sm mt-1">
          {formik.touched.summary && formik.errors.summary ? (
            <p className="text-red-500">{formik.errors.summary}</p>
          ) : (
            <span />
          )}
          {/* Live character counter — max is enforced by Yup schema (500) */}
          <span className="text-slate-400 dark:text-slate-500">
            {formik.values.summary.length}/500
          </span>
        </div>
      </div>

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
