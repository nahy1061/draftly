import { useReactToPrint } from "react-to-print";
import { useResume } from "../../../context/ResumeContext";

// Opens browser print dialog — filename uses full name when available
function PrintButton({ printRef }) {
  const { resumeData } = useResume();

  const fullName = resumeData.personalInfo?.fullName?.trim();
  // Spaces → underscores so the saved PDF filename is clean
  const documentTitle = fullName
    ? `${fullName.replace(/\s+/g, "_")}_Resume`
    : "Resume";

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle,
  });

  return (
    <button
      type="button"
      onClick={handlePrint}
     className="text-xs px-3 py-1.5 rounded-full bg-[#4C7A5A] hover:bg-[#4C7A5A]/90 dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] active:scale-95"
    >
      Print / Save PDF
    </button>
  );
}

export default PrintButton;
