import { useState } from "react";

function Builder() {
  const [activeTab, setActiveTab] = useState("edit"); // "edit" | "preview"

  return (
    <div className="min-h-screen bg-[#FAF8F3] dark:bg-[#1C2541] text-[#1C2541] dark:text-[#F2EFE9]">
      {/* Tab switcher — mobile only */}
      <div className="md:hidden flex border-b border-[#1C2541]/10 dark:border-[#F2EFE9]/10">
      {/* Edit Button */}
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

        {/* Preview Button */}
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

      {/* Main content: form + preview */}
      <div className="flex flex-col md:flex-row">

        {/* Edit Section */}
        <div
          className={`${
            activeTab === "edit" ? "block" : "hidden"
          } md:block flex-1 p-6`}
        >
          <h2 className="font-display text-2xl mb-4">Form goes here</h2>
        </div>

        {/* Preview Section */}
        <div
          className={`${
            activeTab === "preview" ? "block" : "hidden"
          } md:block flex-1 p-6 border-l-2 border-[#1C2541]/10 dark:border-[#F2EFE9]/10`}
        >
          <h2 className="font-display text-2xl mb-4">Preview</h2>
        </div>
      </div>
    </div>
  );
}

export default Builder;