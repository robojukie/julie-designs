/* NOT a case study, and the structure is the argument for that.

   vac-redesign, bank-green-gpe and brainsprout each walk a process arc —
   research, goals, iterations, outcome — because their job is to show how the
   work was done. Anyone reaching this page has already read one of those. What
   they can't see from them is the shape and complexity of the most recent work,
   so this page is organised by FEATURE AREA instead: product context, then one
   numbered section per area — before/after, then the individual screens it
   touched, anchored by its own prototype — then outcomes. No research phase
   and no goal arc; the before/after pairs are per feature and stand as
   evidence rather than as a narrative the page is walking through.

   Everything below is placeholder copy and placeholder media — the shell exists
   so the structure can be reviewed before the content is written. */
import type { Metadata } from "next";
import CaseStudyBanner from "@/components/CaseStudyBanner";
import CaseStudyHero from "@/components/CaseStudyHero";
import ContextStrip from "@/components/ContextStrip";
import FadeIn from "@/components/FadeIn";
import FeatureNav from "@/components/FeatureNav";
import FeatureSection, {
  pad,
  type FeaturePart,
  type FeatureShot,
} from "@/components/FeatureSection";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "NovinoPath",
};

/* Single source for the section ids, the in-page TOC, and the cross-links at
   the foot of every feature section — so an anchor can't drift from the
   section it points at, and a fourth feature only has to be added once.

   No `tag` at the feature level: a feature's badges are derived from its
   parts' tags in FeatureSection, so the two can't drift apart. Consult Review
   carries both because two of its three parts are new and one is a rework.
   Which parts were which is placeholder — that's a fact about the job, not
   something to guess at here. */
const PART_BODY =
  "Placeholder body copy for this part: what this screen had to do, the constraint that made it hard, and what changed. One to two sentences. Replace before publishing.";

/* One pair per feature. `id` only keeps the placeholder asset paths distinct
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

const FEATURES: {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  beforeAfter: { before: FeatureShot; after: FeatureShot };
  parts: FeaturePart[];
  prototypeHref: string;
}[] = [
  {
    id: "consult-review",
    eyebrow: "Consult Review",
    heading:
      "How does a pathologist review a second-opinion consult without losing the case they came from?",
    body: "Placeholder body copy describing the constraints of this feature area and why it was hard. Two to three sentences that set up the design problem the prototype answers. Replace before publishing.",
    parts: [
      {
        title: "Notification redesign",
        tag: "New feature",
        body: PART_BODY,
        screenshotSrc: "/images/placeholder-consult-notifications.png",
        screenshotAlt: "Placeholder for the notification redesign screenshot",
      },
      {
        title: "Consult queue",
        tag: "New feature",
        body: PART_BODY,
        screenshotSrc: "/images/placeholder-consult-queue.png",
        screenshotAlt: "Placeholder for the consult queue screenshot",
      },
      {
        title: "Case comparison view",
        tag: "Redesign",
        body: PART_BODY,
        screenshotSrc: "/images/placeholder-consult-comparison.png",
        screenshotAlt: "Placeholder for the case comparison screenshot",
      },
    ],
    beforeAfter: beforeAfter("consult-review"),
    prototypeHref: "/prototype/consult-review",
  },
  {
    id: "slide-viewer",
    eyebrow: "Slide Viewer",
    heading:
      "How much of the viewer can be given to the slide before the case context stops being reachable?",
    body: "Placeholder body copy describing the constraints of this feature area and why it was hard. Two to three sentences that set up the design problem the prototype answers. Replace before publishing.",
    parts: [
      {
        title: "Viewer chrome",
        tag: "New feature",
        body: PART_BODY,
        screenshotSrc: "/images/placeholder-viewer-chrome.png",
        screenshotAlt: "Placeholder for the viewer chrome screenshot",
      },
      {
        title: "Annotation panel",
        tag: "Redesign",
        body: PART_BODY,
        screenshotSrc: "/images/placeholder-viewer-annotations.png",
        screenshotAlt: "Placeholder for the annotation panel screenshot",
      },
    ],
    beforeAfter: beforeAfter("slide-viewer"),
    prototypeHref: "/prototype/slide-viewer",
  },
  {
    id: "dashboards",
    eyebrow: "Dashboards",
    heading:
      "Four roles, one queue — what does each of them need to see first?",
    body: "Placeholder body copy describing the constraints of this feature area and why it was hard. Two to three sentences that set up the design problem the prototype answers. Replace before publishing.",
    parts: [
      {
        title: "Role-based default view",
        tag: "New feature",
        body: PART_BODY,
        screenshotSrc: "/images/placeholder-dashboard-default.png",
        screenshotAlt: "Placeholder for the default dashboard screenshot",
      },
      {
        title: "Queue filters",
        tag: "Redesign",
        body: PART_BODY,
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
                <p className="eyebrow project-overview-label">Overview</p>

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

                <div className="project-shot">
                  {/* aria-hidden rather than role="img" — a grey box is
                      scaffolding, and announcing it as a picture that isn't
                      there is worse than silence. Real alt goes on the real
                      image. */}
                  <div
                    className="placeholder-media"
                    data-placeholder-for="/images/placeholder-novinopath-hero.png"
                    aria-hidden="true"
                  />
                </div>

                <hr className="project-rule" />

                <ContextStrip
                  timeline="Placeholder timeline"
                  role={[
                    "Placeholder discipline",
                    "Placeholder discipline",
                    "Placeholder discipline",
                  ]}
                  team={[
                    "Placeholder teammate",
                    "Placeholder teammate",
                    "Placeholder teammate",
                  ]}
                />
              </div>
            </div>

            {/* In-page TOC. Plain anchors — no JS, no scroll-spy — so it works
                on first paint and degrades to nothing worse than a jump. */}
            <div className="container-800 feature-toc-block">
              <nav className="feature-toc" aria-label="Feature areas">
                {/* The count in the label, and a number on every entry. Between
                    them the reader knows how many areas there are before they
                    start, and each section's own "Feature n of 3" then keeps
                    them oriented once they have scrolled past this. */}
                <p className="eyebrow">
                  {FEATURES.length} feature areas
                </p>
                {/* role="list" alongside <ol>: .feature-toc-list is
                    list-style: none, and Safari drops list semantics from a
                    list with no marker unless the role is restated. Same
                    reason every other list in this codebase carries it. */}
                <ol className="feature-toc-list" role="list">
                  {FEATURES.map((feature, index) => (
                    <li key={feature.id}>
                      <a className="inline-link" href={`#${feature.id}`}>
                        {pad(index + 1)} {feature.eyebrow}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Closes the opening block and opens the feature run. The page
                changes mode here — everything above is context about the
                product, everything below is one screen after another — and
                without a mark the first feature's eyebrow reads as a fourth
                entry in the menu directly above it. Same rule as the one
                inside the overview block, so the two boundaries match. */}
            <div className="container-800 features-start-rule">
              <hr className="project-rule" />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* .feature-run is what scopes the sticky nav: it spans exactly the three
          feature sections, so the bar pins under the navbar on entry and leaves
          with the last section's bottom edge, with no scroll listener deciding
          when to show it.

          The per-section cross-links that used to sit at the foot of each
          feature are gone with it. They existed because a reader arriving by
          anchor had no way to reach a sibling without scrolling back to the
          top; the bar answers that continuously and one screen earlier, and
          keeping both would have put two lists of the same three destinations
          on screen at once. Restore by passing `otherFeatures` again. */}
      <div className="feature-run">
        <FeatureNav
          features={FEATURES.map((f) => ({ id: f.id, label: f.eyebrow }))}
        />

        {FEATURES.map((feature, index) => (
          <FeatureSection
            key={feature.id}
            {...feature}
            index={index + 1}
            total={FEATURES.length}
          />
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
