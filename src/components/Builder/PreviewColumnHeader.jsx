import PrintButton from "./PrintButton";

function PreviewColumnHeader() {
  return (
    <div className="flex justify-between items-center mb-4 print:hidden">
      <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-[#3C6E71] dark:text-[#7FA8A3]">
        Live Preview
      </h2>
      <PrintButton />
    </div>
  );
}

export default PreviewColumnHeader;