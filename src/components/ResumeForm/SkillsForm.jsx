import SkillInput from "../SkillInput/SkillInput";

function SkillsForm() {
  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold mb-4">Skills</h2>
      <SkillInput section="skills" fieldKey="name" placeholder="e.g. React" />
    </div>
  );
}

export default SkillsForm;