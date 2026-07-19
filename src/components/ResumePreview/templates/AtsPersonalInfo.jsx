function AtsPersonalInfo({ personalInfo }) {
  return (
    <div className="pb-5 mb-2 border-b-2 border-black">
      <h1 className="font-display text-2xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
      {personalInfo.jobTitle && <p className="font-medium mt-0.5">{personalInfo.jobTitle}</p>}

      <div className="text-sm mt-3 space-y-0.5">
        {personalInfo.email && <p>Email: {personalInfo.email}</p>}
        {personalInfo.phone && (
          <p>
            Phone: {personalInfo.countryCode} {personalInfo.phone}
          </p>
        )}
        {personalInfo.address && <p>Address: {personalInfo.address}</p>}
        {personalInfo.linkedin && <p>LinkedIn: {personalInfo.linkedin}</p>}
        {personalInfo.github && <p>GitHub: {personalInfo.github}</p>}
        {personalInfo.portfolio && <p>Portfolio: {personalInfo.portfolio}</p>}
      </div>

      {personalInfo.summary && (
        <div className="mt-4">
          <h2 className="text-sm font-bold uppercase border-b-2 border-black pb-1 mb-2">Summary</h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}
    </div>
  );
}

export default AtsPersonalInfo;