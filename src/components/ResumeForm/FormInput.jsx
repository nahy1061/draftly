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
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition-all scheme-light dark:scheme-dark"
        >
          {options.map((opt) => (
            <option
              key={opt}
              value={opt}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
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
              ? "h-4 w-4 rounded-sm border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
              : "w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition-all"
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
