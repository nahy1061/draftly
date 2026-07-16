import ResumePreview from "../../ResumePreview/ResumePreview";
import PreviewColumnHeader from "./PreviewColumnHeader";

function PreviewColumn({ activeTab }) {
  return (
    <div
      className={`${
        activeTab === "preview" ? "block" : "hidden"
      } md:block print:block flex-1 p-6 md:border-l-2 border-[#1C2541]/10 dark:border-[#F2EFE9]/10 bg-[#F1E9D8]/40 dark:bg-[#171F35]`}
    >
      <PreviewColumnHeader />
      <ResumePreview />
    </div>
  );
}

export default PreviewColumn;
