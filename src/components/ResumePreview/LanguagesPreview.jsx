const LanguagesPreview = ({ languages }) => {
  return (
    <div>
      {languages.length > 0 && (
        <div className="mt-6">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[#3C6E71] dark:text-[#7FA8A3] mb-3">
            Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {languages.map((entry) => (
              <span
                key={entry.id}
                className="text-sm bg-[#3C6E71]/10 text-[#3C6E71] dark:bg-[#7FA8A3]/10 dark:text-[#7FA8A3] px-3 py-1 rounded-full"
              >
                {entry.name} · {entry.proficiency}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguagesPreview;