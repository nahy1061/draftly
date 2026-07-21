import { useResume } from "../../context/ResumeContext";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import TemplateSelector from "./shared/TemplateSelector";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import AtsTemplate from "./templates/AtsTemplate";
import ScaledPreviewWrapper from "./shared/ScaledPreviewWrapper";

// Add new templates here as they're built.
const TEMPLATE_COMPONENTS = {
  professional: ProfessionalTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  ats: AtsTemplate,
};

function ResumePreview({ printRef }) {
  const { resumeData } = useResume();

  const SelectedTemplate =
    TEMPLATE_COMPONENTS[resumeData.selectedTemplate] || ProfessionalTemplate;

  return (
    <div>
      <TemplateSelector />
      <ScaledPreviewWrapper printRef={printRef}>
        <SelectedTemplate />
      </ScaledPreviewWrapper>
    </div>
  );
}

export default ResumePreview;
