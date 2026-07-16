import { useState } from "react";
import EditColumn from "./EditColumn";
import PreviewColumn from "./PreviewColumn";

function BuilderMain() {
  const [activeTab, setActiveTab] = useState("edit");

  return (
    <>
      <div className="print:hidden md:hidden flex border-b border-[#1C2541]/10 dark:border-[#F2EFE9]/10">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "edit"
              ? "border-b-2 border-[#F4B942] text-[#1C2541] dark:text-[#F2EFE9]"
              : "text-[#1C2541]/40 dark:text-[#F2EFE9]/40"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "preview"
              ? "border-b-2 border-[#F4B942] text-[#1C2541] dark:text-[#F2EFE9]"
              : "text-[#1C2541]/40 dark:text-[#F2EFE9]/40"
          }`}
        >
          Preview
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <EditColumn activeTab={activeTab} />
        <PreviewColumn activeTab={activeTab} />
      </div>
    </>
  );
}

export default BuilderMain;