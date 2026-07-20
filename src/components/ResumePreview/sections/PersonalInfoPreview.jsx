import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const PersonalInfoPreview = ({ personalInfo }) => {
  const contactItems = [
    personalInfo.email && { icon: MdEmail, text: personalInfo.email },
    personalInfo.phone && {
      icon: MdPhone,
      text: `${personalInfo.countryCode} ${personalInfo.phone}`,
    },
    personalInfo.address && { icon: MdLocationOn, text: personalInfo.address },
  ].filter(Boolean);

  const linkItems = [
    personalInfo.linkedin && {
      icon: FaLinkedin,
      text: "LinkedIn",
      href: personalInfo.linkedin,
    },
    personalInfo.github && {
      icon: FaGithub,
      text: "GitHub",
      href: personalInfo.github,
    },
    personalInfo.portfolio && {
      icon: FaGlobe,
      text: "Portfolio",
      href: personalInfo.portfolio,
    },
  ].filter(Boolean);

  return (
    <div>
      <div className="flex items-center gap-5 pb-6 mb-6 print:pb-3 print:mb-3 border-b border-[#1C2541]/10">
        {personalInfo.profilePhoto && (
          <img
            src={personalInfo.profilePhoto}
            alt={personalInfo.fullName}
            className="w-20 h-20 rounded-full object-cover shrink-0"
          />
        )}
        <div>
          <h1 className="font-display text-3xl font-semibold leading-tight">
            {personalInfo.fullName || "Your Name"}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-[#3C6E71] font-medium mt-1">
              {personalInfo.jobTitle}
            </p>
          )}
        </div>
      </div>

      {contactItems.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm mb-3 print:mb-1.5">
          {contactItems.map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-1.5 text-[#1C2541]/70"
            >
              <Icon className="text-[#3C6E71]" size={14} />
              {text}
            </span>
          ))}
        </div>
      )}

      {linkItems.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm mb-6 print:mb-3">
          {linkItems.map(({ icon: Icon, text, href }) => (
            <a
              key={text}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#3C6E71] hover:underline"
            >
              <Icon size={14} />
              {text}
            </a>
          ))}
        </div>
      )}

      {personalInfo.summary && (
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[#3C6E71] mb-2">
            Summary
          </h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoPreview;