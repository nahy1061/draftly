import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import PersonalInfoForm from "../components/ResumeForm/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview/ResumePreview";
import EducationForm from "../components/ResumeForm/EducationForm";
import ExperienceForm from "../components/ResumeForm/ExperienceForm";

function Builder() {
  const [activeTab, setActiveTab] = useState("edit"); // "edit" | "preview"

  return (
    <div className="min-h-screen bg-[#FAF8F3] dark:bg-[#1C2541] text-[#1C2541] dark:text-[#F2EFE9]">
      {/* Top header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-[#1C2541]/10 dark:border-[#F2EFE9]/10">
        <Link to="/" className="font-display text-xl font-semibold">
          Draftly
        </Link>
        <ThemeToggle />
      </header>

      {/* Tab switcher — mobile only */}
      <div className="md:hidden flex border-b border-[#1C2541]/10 dark:border-[#F2EFE9]/10">
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

      {/* Main content: form + preview */}
      <div className="flex flex-col md:flex-row">
        {/* Edit Section */}
        <div
          className={`${
            activeTab === "edit" ? "block" : "hidden"
          } md:block flex-1 p-6`}
        >
          <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-[#3C6E71] dark:text-[#7FA8A3] mb-4">
            Editor
          </h2>
          <PersonalInfoForm />
          <EducationForm />
          <ExperienceForm />
        </div>

        {/* Preview Section */}
        <div
          className={`${
            activeTab === "preview" ? "block" : "hidden"
          } md:block flex-1 p-6 md:border-l-2 border-[#1C2541]/10 dark:border-[#F2EFE9]/10 bg-[#F1E9D8]/40 dark:bg-[#171F35]`}
        >
          <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-[#3C6E71] dark:text-[#7FA8A3] mb-4">
            Live Preview
          </h2>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}

export default Builder;