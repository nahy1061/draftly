import { Fragment } from "react";

function ContactLine({ items }) {
  if (items.length === 0) return null;

  return (
    <p>
      {items.map((item, i) => (
        <Fragment key={i}>
          {item}
          {i < items.length - 1 && "\u00A0\u00A0|\u00A0\u00A0"}
        </Fragment>
      ))}
    </p>
  );
}

function AtsPersonalInfo({ personalInfo }) {
  const contactLine1 = [
    personalInfo.phone && `+${personalInfo.countryCode} ${personalInfo.phone}`,
    personalInfo.email,
    personalInfo.address,
  ].filter(Boolean);

  const contactLine2 = [
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.portfolio,
  ].filter(Boolean);

  return (
    <div className="pb-0 mb-3 text-center">
      <h1 className="font-display text-2xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
      {personalInfo.jobTitle && <p className="font-medium mt-0.5">{personalInfo.jobTitle}</p>}

      <div className="text-xs mt-2 space-y-0.75">
        <ContactLine items={contactLine1} />
        <ContactLine items={contactLine2} />
      </div>

      {personalInfo.summary && (
        <div className="mt-3 text-left">
          <h2 className="text-sm font-bold uppercase border-b-2 border-black pb-1 mb-2">Summary</h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}
    </div>
  );
}

export default AtsPersonalInfo;