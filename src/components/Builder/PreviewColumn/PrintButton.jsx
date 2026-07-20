import { useReactToPrint } from "react-to-print";
import { useResume } from "../../../context/ResumeContext";

function PrintButton({ printRef }) {
  const { resumeData } = useResume();

  const fullName = resumeData.personalInfo?.fullName?.trim();
  const documentTitle = fullName
    ? `${fullName.replace(/\s+/g, "_")}_Resume`
    : "Resume";

    console.log("printRef in PrintButton:", printRef, printRef?.current);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle,
  });

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="text-xs px-3 py-1.5 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20"
    >
      Print / Save Pdf
    </button>
  );
}

export default PrintButton;
