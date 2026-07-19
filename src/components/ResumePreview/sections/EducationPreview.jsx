import React from "react";
import ClickableSection from "../shared/ClickableSection";

const EducationPreview = ({ education }) => {
  return (
    <div>
      {education.length > 0 && (
        <div className="mt-6">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[#3C6E71] mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((entry) => (
              <ClickableSection
                key={entry.id}
                sectionKey="education"
                entryId={entry.id}
              >
                <div key={entry.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="font-medium">{entry.degree}</p>
                    <p className="text-sm text-[#1C2541]/60">
                      {entry.startYear}–{entry.endYear}
                    </p>
                  </div>
                  <p className="text-sm text-[#3C6E71]">{entry.institute}</p>
                  {entry.scoreType === "cgpa" &&
                    entry.obtainedCgpa &&
                    entry.totalCgpa && (
                      <p className="text-xs text-[#1C2541]/60">
                        CGPA: {entry.obtainedCgpa}/{entry.totalCgpa}
                      </p>
                    )}
                  {entry.scoreType === "marks" &&
                    entry.obtainedMarks &&
                    entry.totalMarks && (
                      <p className="text-xs text-[#1C2541]/60 ">
                        Marks: {entry.obtainedMarks}/{entry.totalMarks}
                      </p>
                    )}
                </div>
              </ClickableSection>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationPreview;
