import { useResume } from "../../context/ResumeContext";
import CertificationsPreview from "./CertificationsPreview";
import ClickableSection from "./ClickableSection";
import DraggablePreviewSection from "./DraggablePreviewSection";
import EducationPreview from "./EducationPreview";
import ExperiencePreview from "./ExperiencePreview";
import InterestsPreview from "./InterestsPreview";
import LanguagesPreview from "./LanguagesPreview";
import PersonalInfoPreview from "./PersonalInfoPreview";
import ProjectsPreview from "./ProjectsPreview";
import SkillsPreview from "./SkillsPreview";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

const PREVIEW_COMPONENTS = {
  education: EducationPreview,
  experience: ExperiencePreview,
  projects: ProjectsPreview,
  certifications: CertificationsPreview,
  languages: LanguagesPreview,
  skills: SkillsPreview,
  interests: InterestsPreview,
};

const LIST_SECTIONS = [
  "education",
  "experience",
  "projects",
  "certifications",
  "languages",
];

function ResumePreview() {
  const { resumeData, dispatch } = useResume();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = resumeData.sectionOrder.indexOf(active.id);
    const newIndex = resumeData.sectionOrder.indexOf(over.id);
    const newOrder = arrayMove(resumeData.sectionOrder, oldIndex, newIndex);
    dispatch({ type: "REORDER_SECTIONS", payload: newOrder });
  }

  const visibleSections = resumeData.sectionOrder.filter(
    (key) => !resumeData.skippedSections.includes(key),
  );

  return (
    <div className="bg-white dark:bg-[#233256] rounded-lg shadow-lg p-8 sm:p-10 max-w-2xl mx-auto print:max-w-none print:shadow-none print:rounded-none text-[#1C2541] dark:text-[#F2EFE9]">
      <ClickableSection sectionKey="personalInfo">
        <PersonalInfoPreview personalInfo={resumeData.personalInfo} />
      </ClickableSection>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={visibleSections}
          strategy={verticalListSortingStrategy}
        >
          {visibleSections.map((key) => {
            const Component = PREVIEW_COMPONENTS[key];
            return (
              <DraggablePreviewSection
                key={key}
                sectionKey={key}
                wrapAsClickable={!LIST_SECTIONS.includes(key)}
              >
                <Component {...{ [key]: resumeData[key] }} />
              </DraggablePreviewSection>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default ResumePreview;
