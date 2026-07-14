function FormInput({ formik, name, label, type = "text", options }) {
  const isCheckbox = type === "checkbox";
  const isSelect = type === "select";

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>

      {isSelect ? (
        <select
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
            className="w-full px-3 py-2 rounded-lg border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 bg-transparent scheme-light dark:scheme-dark"
        >
          {options.map((opt) => (
            <option
              key={opt}
              value={opt}
              className="bg-[#FAF8F3] dark:bg-[#233256] text-[#1C2541] dark:text-[#F2EFE9]"
            >
              {opt}
            </option>
          ))}
        </select>
      ) : (
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
      )}

      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default FormInput;
