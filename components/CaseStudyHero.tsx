import type { ReactNode } from "react";

type Role = { label: string; value: ReactNode };

type CaseStudyHeroProps = {
  title: string;
  tagline: string;
  description?: ReactNode;
  roles: Role[];
};

export default function CaseStudyHero({
  title,
  tagline,
  description,
  roles,
}: CaseStudyHeroProps) {
  return (
    <div className="project-section-hero">
      <div className="container-1232">
        <div className="project-header-text">
          <div className="content-title">
            <div className="container-title">
              <h1 className="hero-title-text case-study-hero-title">{title}</h1>
            </div>
            <p className="tagline-text">{tagline}</p>
          </div>
        </div>
        <div className="horizontal-container">
          <div className="grid-left-top-content">
            {description && <div className="w-richtext">{description}</div>}
            <div className="column-role">
              <div className="project-role-details">
                {roles.map((role) => (
                  <div className="project-role" key={role.label}>
                    <div className="eyebrow green">{role.label}</div>
                    <p>{role.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
