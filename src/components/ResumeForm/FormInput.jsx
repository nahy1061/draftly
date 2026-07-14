function FormInput({ formik, name, label, type = "text" }) {
  const isCheckbox = type === "checkbox";

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        {...(isCheckbox
          ? { checked: formik.values[name] }
          : { value: formik.values[name] })}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={
          isCheckbox
            ? "h-4 w-4"
            : "w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent"
        }
      />

      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default FormInput;