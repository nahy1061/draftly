import SkillInput from "../SkillInput/SkillInput";

function InterestsForm() {
  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold mb-4">Interests</h2>
      <SkillInput section="interests" fieldKey="text" placeholder="e.g. Photography" />
    </div>
  );
}

export default InterestsForm;