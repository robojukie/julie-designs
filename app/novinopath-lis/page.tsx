import type { Metadata } from "next";
import CaseStudyBanner from "@/components/CaseStudyBanner";
import CaseStudyHero from "@/components/CaseStudyHero";
import ContextColumns from "@/components/ContextColumns";
import FadeIn from "@/components/FadeIn";
import SectionNav from "@/components/SectionNav";
import ProjectSection, {
  pad,
  type ProjectFeature,
  type ProjectShot,
  type ProjectState,
} from "@/components/ProjectSection";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "NovinoPath",
};

/* Single source for the section ids, the sticky nav and the in-page menu — so
   an anchor can't drift from the section it points at, and a fourth project
   only has to be added once.

   PROJECT → FEATURE, not feature → part. Consult Review is a body of work that
   touched several surfaces; those surfaces are the features. Naming it the
   other way round called a feature a "part" and implied its screens were steps
   in a sequence.

   `state` and `audiences` are placeholder in value but real in kind: which of
   these shipped, and who each serves, are facts about the job rather than
   things to guess at here. Screen count is derived from the feature list so it
   can't drift from what's actually shown. */
const FEATURE_BODY =
  "Placeholder body copy for this feature: what this screen had to do, the constraint that made it hard, and what changed. One to two sentences. Replace before publishing.";

/* One pair per project. `id` only keeps the placeholder asset paths distinct
   so each grey box says which screenshot it is waiting on. */
const beforeAfter = (id: string) => ({
  before: {
    screenshotSrc: `/images/placeholder-${id}-before.png`,
    screenshotAlt: `Placeholder for the ${id} before screenshot`,
    caption:
      "Placeholder caption naming what the reader should notice in the original.",
  },
  after: {
    screenshotSrc: `/images/placeholder-${id}-after.png`,
    screenshotAlt: `Placeholder for the ${id} after screenshot`,
    caption:
      "Placeholder caption naming what changed and why it mattered.",
  },
});

const PROJECTS: {
  id: string;
  name: string;
  state: ProjectState;
  audiences: string[];
  heading: string;
  body: string;
  beforeAfter: { before: ProjectShot; after: ProjectShot };
  features: ProjectFeature[];
  prototypeHref: string;
}[] = [
  {
    id: "consult-review",
    name: "Consult Review",
    state: "Shipped",
    audiences: ["Pathologists", "Lab technicians"],
    heading:
      "How does a pathologist review a second-opinion consult without losing the case they came from?",
    body: "Placeholder body copy describing the constraints of this project and why it was hard. Two to three sentences that set up the design problem the prototype answers. Replace before publishing.",
    features: [
      {
        title: "Notification redesign",
        tag: "New feature",
        body: FEATURE_BODY,
        screenshotSrc: "/images/placeholder-consult-notifications.png",
        screenshotAlt: "Placeholder for the notification redesign screenshot",
      },
      {
        title: "Consult queue",
        tag: "New feature",
        body: FEATURE_BODY,
        screenshotSrc: "/images/placeholder-consult-queue.png",
        screenshotAlt: "Placeholder for the consult queue screenshot",
      },
      {
        title: "Case comparison view",
        tag: "Redesign",
        body: FEATURE_BODY,
        screenshotSrc: "/images/placeholder-consult-comparison.png",
        screenshotAlt: "Placeholder for the case comparison screenshot",
      },
    ],
    beforeAfter: beforeAfter("consult-review"),
    prototypeHref: "/prototype/consult-review",
  },
  {
    id: "slide-viewer",
    name: "Slide Viewer",
    state: "In development",
    audiences: ["Pathologists"],
    heading:
      "How much of the viewer can be given to the slide before the case context stops being reachable?",
    body: "Placeholder body copy describing the constraints of this project and why it was hard. Two to three sentences that set up the design problem the prototype answers. Replace before publishing.",
    features: [
      {
        title: "Viewer chrome",
        tag: "New feature",
        body: FEATURE_BODY,
        screenshotSrc: "/images/placeholder-viewer-chrome.png",
        screenshotAlt: "Placeholder for the viewer chrome screenshot",
      },
      {
        title: "Annotation panel",
        tag: "Redesign",
        body: FEATURE_BODY,
        screenshotSrc: "/images/placeholder-viewer-annotations.png",
        screenshotAlt: "Placeholder for the annotation panel screenshot",
      },
    ],
    beforeAfter: beforeAfter("slide-viewer"),
    prototypeHref: "/prototype/slide-viewer",
  },
  {
    id: "dashboards",
    name: "Dashboards",
    state: "Approved concept",
    audiences: ["Pathologists", "Lab technicians", "Lab directors"],
    heading:
      "Four roles, one queue — what does each of them need to see first?",
    body: "Placeholder body copy describing the constraints of this project and why it was hard. Two to three sentences that set up the design problem the prototype answers. Replace before publishing.",
    features: [
      {
        title: "Role-based default view",
        tag: "New feature",
        body: FEATURE_BODY,
        screenshotSrc: "/images/placeholder-dashboard-default.png",
        screenshotAlt: "Placeholder for the default dashboard screenshot",
      },
      {
        title: "Queue filters",
        tag: "Redesign",
        body: FEATURE_BODY,
        screenshotSrc: "/images/placeholder-dashboard-filters.png",
        screenshotAlt: "Placeholder for the queue filters screenshot",
      },
    ],
    beforeAfter: beforeAfter("dashboards"),
    prototypeHref: "/prototype/dashboards",
  },
];

/* Three placeholder stats. Numbered 01/02/03 with .display-callout rather than
   given invented figures — the shell shouldn't ship numbers that read as real. */
const OUTCOMES = [
  {
    marker: "01",
    title: "Placeholder outcome one",
    body: "Placeholder supporting sentence for the first outcome. Replace with the measured result before publishing.",
  },
  {
    marker: "02",
    title: "Placeholder outcome two",
    body: "Placeholder supporting sentence for the second outcome. Replace with the measured result before publishing.",
  },
  {
    marker: "03",
    title: "Placeholder outcome three",
    body: "Placeholder supporting sentence for the third outcome. Replace with the measured result before publishing.",
  },
];

export default function NovinoPathLIS() {
  return (
    <div className="project">
      <ProgressBar />

      {/* Above the hero, matching vac-redesign, bank-green-gpe and brainsprout.
          The original brief put it at the foot of the page as "footer nav",
          but it isn't navigation — it's the banner image every case study
          opens with, and a portfolio reads worse when one project starts
          differently from its neighbours for no reason.

          Placeholder art: the NovinoPath home-page thumbnail, the only
          NovinoPath asset in public/images today. Swap for a real banner (and
          its true intrinsic width/height) when one exists. */}
      <CaseStudyBanner
        color="purple"
        imageSrc="/images/NovinoPath-thumbnail-02.png"
        imageAlt=""
        width={768}
        height={768}
        sizes="(max-width: 768px) 100vw, 768px"
        zoomable={false}
      />

      {/* roles is empty on purpose: the facts the hero would normally list are
          the context columns in the opening block below, and duplicating them
          here would put the same labels on screen twice. */}
      <CaseStudyHero
        title="NovinoPath"
        tagline="Placeholder tagline for the laboratory information system"
        roles={[]}
      />

      <FadeIn>
        <section className="project-section showcase-section opening-section">
          <div className="container-1232">
            {/* The opening block: overview prose, the product shot, a rule,
                then the context columns. Everything shares .container-800's
                measure so the page opens on one left edge — the rule does the
                separating rather than a change of container width. */}
            <div className="container-800">
              <div className="project-overview">
                <p className="eyebrow muted">Overview</p>

                <div className="project-overview-body">
                  <p>
                    Placeholder paragraph introducing the product itself — what
                    the system does, who runs on it, and the scale it operates
                    at. A second sentence establishing the domain complexity
                    that makes the feature areas below worth walking through
                    individually.
                  </p>
                  <p>
                    A third placeholder sentence naming the surfaces this page
                    covers, so the reader knows what they are about to see
                    before they reach the first prototype.
                  </p>
                </div>

                {/* Three consequences when the real asset lands:
                      - Use ZoomableImage, not a plain <Image>. A diagram dense
                        enough to explain a domain is dense enough to need
                        reading at full size.
                      - Let it keep its own aspect ratio. .placeholder-media's
                        16:10 is a stand-in; diagrams usually run wider and
                        shorter, and letterboxing one to fit a box would cost
                        the legibility that is the entire point.
                      - Give it a caption. It is the one image on the page
                        doing explanatory rather than illustrative work. */}
                <div className="project-shot">
                  <div
                    className="placeholder-media"
                    data-placeholder-for="/images/placeholder-novinopath-domain-diagram.png"
                    aria-hidden="true"
                  />
                </div>

                <hr className="project-rule" />

                <ContextColumns
                  columns={[
                    { label: "Timeline", value: "Placeholder timeline" },
                    {
                      label: "My Role",
                      value: [
                        "Placeholder discipline",
                        "Placeholder discipline",
                        "Placeholder discipline",
                      ],
                    },
                    {
                      label: "Team",
                      value: [
                        "Placeholder teammate",
                        "Placeholder teammate",
                        "Placeholder teammate",
                      ],
                    },
                  ]}
                />
              </div>
            </div>

            {/* In-page menu. Plain anchors — no JS, no scroll-spy — so it works
                on first paint and degrades to nothing worse than a jump. */}
            <div className="container-800 project-toc-block">
              <nav id="projects-toc" className="project-toc" aria-label="Projects">
                <p className="eyebrow">Projects</p>
                {/* role="list" alongside <ol>: .project-toc-list is
                    list-style: none, and Safari drops list semantics from a
                    list with no marker unless the role is restated. Same
                    reason every other list in this codebase carries it. */}
                <ol className="project-toc-list" role="list">
                  {PROJECTS.map((project, index) => (
                    <li key={project.id}>
                      <a className="project-toc-link" href={`#${project.id}`}>
                        <span className="project-toc-n">{pad(index + 1)}</span>
                        <span className="project-toc-name">{project.name}</span>
                        <span className="project-toc-leader" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Closes the opening block and opens the project run. The page
                changes mode here — everything above is context about the
                product, everything below is one screen after another — and
                without a mark the first project's label reads as a fourth
                entry in the menu directly above it. Same rule as the one
                inside the overview block, so the two boundaries match. */}
            <div className="container-800 projects-start-rule">
              <hr className="project-rule" />
            </div>
          </div>
        </section>
      </FadeIn>

      <div className="project-run">
        {/* Renders only a fixed capsule, nothing in the flow. First so keyboard
            order reaches it before the sections it navigates. */}
        <SectionNav
          items={PROJECTS.map((p) => ({ id: p.id, label: p.name }))}
          label="Project"
          numbered
          appearAfterId="projects-toc"
        />

        {PROJECTS.map((project, index) => (
          <ProjectSection key={project.id} number={index + 1} {...project} />
        ))}
      </div>

      <FadeIn>
        <section className="project-section showcase-section dark">
          <div className="container-1232">
            <div className="top-content">
              <div className="slide-header">
                <h2 className="light">Outcomes</h2>
                <p className="light">
                  Placeholder sentence describing what shipping this work
                  changed for the people using the system.
                </p>
              </div>
            </div>
            <div className="horizontal-middle-container">
              <div className="_3-x-1-text-grid">
                {OUTCOMES.map((outcome) => (
                  <div className="card" key={outcome.marker}>
                    <div className="card-media">
                      <div className="card-data-wrapper">
                        <div className="display-callout light">
                          {outcome.marker}
                        </div>
                      </div>
                    </div>
                    <div className="card-info text-card">
                      <p className="list-card-title light">{outcome.title}</p>
                      <p className="light">{outcome.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="project-section showcase-section">
          <div className="container-1232">
            <div className="container-800">
              <div className="heading-and-body-container">
                <h2>Reflection</h2>
                <p>
                  Placeholder reflection on what this work required that the
                  earlier projects did not — a first sentence naming the
                  difference in domain or scale.
                </p>
                <p>
                  A second placeholder sentence on what would be done
                  differently, and a third on where the product goes next.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
