import PrintButton from "./PrintButton";

function PreviewColumnHeader() {
  return (
    <div className="flex justify-between items-center mb-4 print:hidden">
      <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
        Live Preview
      </h2>
      <PrintButton />
    </div>
  );
}

export default PreviewColumnHeader;
