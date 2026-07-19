import ClickableSection from "../shared/ClickableSection";

const ProjectsPreview = ({ projects }) => {
  return (
    <div>
      {projects.length > 0 && (
        <div className="mt-6">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[#3C6E71] mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((entry) => (
              <ClickableSection
                key={entry.id}
                sectionKey="projects"
                entryId={entry.id}
              >
                <div key={entry.id}>
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-sm text-[#1C2541]/60">
                    {entry.description}
                  </p>

                  {entry.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {entry.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-[#3C6E71]/10 text-[#3C6E71] px-2 py-0.5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {(entry.githubLink || entry.liveDemoLink) && (
                    <div className="flex gap-3 mt-1.5">
                      {entry.githubLink && (
                        <a
                          href={entry.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#1C2541]/60 underline"
                        >
                          GitHub
                        </a>
                      )}
                      {entry.liveDemoLink && (
                        <a
                          href={entry.liveDemoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#1C2541]/60 underline"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
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

export default ProjectsPreview;
