import { useResume } from "../../context/ResumeContext";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import TemplateSelector from "./shared/TemplateSelector";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import AtsTemplate from "./templates/AtsTemplate";

// Add new templates here as they're built.
const TEMPLATE_COMPONENTS = {
  professional: ProfessionalTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  ats: AtsTemplate,
};

function ResumePreview() {
  const { resumeData } = useResume();

  // Falls back to Professional if the selected template isn't built
  // yet (covers "modern" too, until it exists).
  const SelectedTemplate =
    TEMPLATE_COMPONENTS[resumeData.selectedTemplate] || ProfessionalTemplate;

  return (
    <div>
      <TemplateSelector />
      <SelectedTemplate />
    </div>
  );
}

export default ResumePreview;
