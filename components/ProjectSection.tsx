import ContextColumns from "@/components/ContextColumns";
import FadeIn from "@/components/FadeIn";
import PrototypeJump from "@/components/PrototypeJump";

/* One PROJECT on the NovinoPath showcase: a design problem, the features it
   shipped or reworked, and the prototype that demonstrates it.

   THE NESTING IS PROJECT → FEATURE, and getting it the other way round was the
   original mistake. "Consult Review" is not a feature — it is a body of work
   that touched a notification system, a consult document review page, worklists
   and the pathologist page. Those are the features. Calling the container a
   "feature" and its contents "parts" named a fragment where a feature was, and
   made "Part 01" read as a step in a process that doesn't exist.

   Two consequences fall out of the correct nesting:

     - Features carry the work-type badge (New feature / Redesign), because that
       is a fact about a feature. At project level it aggregated to "some of
       both", which is nearly no information.
     - Features are not numbered. They are a set of surfaces, not a sequence of
       steps, and an ordinal would assert an order the work doesn't have. The
       project keeps its ordinal — the menu implies top-to-bottom reading.

   Projects instead carry STATE (shipped / in development / approved concept),
   which is the thing a reader most wants and cannot infer, and a line of
   scope metadata: who it serves, and how many screens it covers.

   Two ways to show a prototype, in priority order:
     1. figmaEmbedUrl present → an <iframe>, operable in place.
     2. otherwise → the "Try it ↗" link out to the stub route in app/prototype/.
   The link renders either way, as the escape hatch for anyone whose browser
   blocks the embed. A signpost near the top scrolls down to it rather than
   linking out, so the reader passes the work on the way.

   FadeIn is the site's existing reveal (components/FadeIn.tsx): it fades on
   MOUNT, not on scroll — a motion.div with an animate-on-enter transition and
   no viewport trigger. */

export type WorkType = "New feature" | "Redesign";

/* Deliberately three values, not two. "Approved concept" is a real and
   different position from a loose exploration — the work was signed off and
   not built, which is a fact about the organisation rather than about the
   design, and collapsing it into "Concept" would understate it. */
export type ProjectState = "Shipped" | "In development" | "Approved concept";

export type ProjectShot = {
  screenshotSrc: string;
  screenshotAlt: string;
  caption: string;
};

export type ProjectFeature = {
  /* The feature's name — "Notification redesign". No number: see the note on
     nesting above. */
  title: string;
  /* Per FEATURE, because that is where the fact lives: a project can build one
     surface around a reworked one. */
  tag: WorkType;
  body: string;
  screenshotSrc: string;
  screenshotAlt: string;
};

/* Zero-padded, matching the outcome cards' 01/02/03. In the menu the padding is
   what keeps the names on one left edge; in "Project 01 of 03" it is there so
   the same project is called the same thing everywhere on the page. */
export const pad = (n: number) => String(n).padStart(2, "0");

type ProjectSectionProps = {
  id: string;
  /* The project's NAME — "Consult Review", not "Project 01 of 03: Consult
     Review". The prefix is added below so one string can serve the section
     label, the sticky nav and the in-page menu. */
  name: string;
  /* Position and count, rendered as "Project 01 of 03". Both are needed: the
     index alone says which one you are on but not how many are left, and a
     reader arriving by anchor has seen neither the menu nor the sections
     above. Derived from the page's PROJECTS array, so adding a fourth
     renumbers everything with no edit here. */
  index: number;
  total: number;
  state: ProjectState;
  /* Who the work serves. Text rather than a badge: these are several values per
     project and they'd overflow a pill row, and unlike state they are read once
     for context rather than scanned for triage. */
  audiences: string[];
  heading: string;
  body: string;
  /* One pair per PROJECT. The features walk through individual screens; this is
     the whole area seen from outside, which is the level at which "what
     changed" is worth answering. A pair per feature would be six or eight
     near-identical images. */
  beforeAfter?: { before: ProjectShot; after: ProjectShot };
  features?: ProjectFeature[];
  screenshotSrc?: string;
  screenshotAlt?: string;
  prototypeHref: string;
  figmaEmbedUrl?: string;
};

function Tag({ tag }: { tag: WorkType }) {
  return (
    <span
      className={`feature-tag feature-tag-${
        tag === "New feature" ? "new" : "redesign"
      }`}
    >
      {tag}
    </span>
  );
}

/* State is its own visual class, not another work-type pill. It answers a
   different question and belongs to a different level, so making them look
   alike would invite reading them as one row of the same thing. */
function StateTag({ state }: { state: ProjectState }) {
  const key =
    state === "Shipped"
      ? "shipped"
      : state === "In development"
        ? "building"
        : "concept";
  return <span className={`project-state project-state-${key}`}>{state}</span>;
}

/* aria-hidden, NOT role="img". A grey box is scaffolding — role="img" promises
   assistive tech a picture that isn't there. `alt` is still taken so the call
   sites keep the description next to the asset path; write the real alt at swap
   time, against a real image. */
function ShotPlaceholder({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="placeholder-media"
      data-placeholder-for={src}
      aria-hidden="true"
      data-alt={alt}
    />
  );
}

export default function ProjectSection({
  id,
  name,
  index,
  total,
  state,
  audiences,
  heading,
  body,
  beforeAfter,
  features = [],
  screenshotSrc,
  screenshotAlt,
  prototypeHref,
  figmaEmbedUrl,
}: ProjectSectionProps) {
  const prototypeId = `${id}-prototype`;
  /* Derived from the feature list rather than stated, so it cannot drift from
     the screens actually shown below it. */
  const screenCount = features.length || (screenshotSrc ? 1 : 0);

  return (
    <FadeIn>
      {/* id on the <section>, not on FadeIn's motion.div, so anchors land on
          the element that carries the section's padding. */}
      <section id={id} className="project-section showcase-section">
        <div className="container-1232">
          <div className="container-800">
            <div className="heading-and-body-container">
              <div className="eyebrow-and-headline-container">
                <div className="feature-label">
                  {/* A <p>, not an <h2>. This is a kicker on the heading below
                      it; as a heading it put two h2s in every section and
                      heading navigation heard them as siblings. */}
                  <p className="eyebrow">
                    Project {pad(index)} of {pad(total)}: {name}
                  </p>
                  <StateTag state={state} />
                </div>
                <h2>{heading}</h2>
              </div>

              <p>{body}</p>

              {/* Scrolls DOWN to the prototype rather than linking out. The
                  earlier version put the outbound link here, which made the
                  first interactive thing in every section one that left the
                  page before the reader had seen any of the work. */}
              <p className="feature-prototype-link">
                <PrototypeJump targetId={prototypeId}>
                  Interactive prototype below &#8595;
                </PrototypeJump>
              </p>
            </div>

            {/* Below the description, mirroring the opening block: prose that
                explains the thing, then labelled columns of facts about it.
                The labels are what make the values legible — "Pathologists"
                only reads as an audience once something says so. */}
            <div className="project-context">
              <ContextColumns
                columns={[
                  { label: "User roles", value: audiences },
                  ...(screenCount > 0
                    ? [
                        {
                          label: "Screens",
                          value: String(screenCount),
                        },
                      ]
                    : []),
                ]}
              />
            </div>
          </div>

          {/* BEFORE the features, not after. The heading posed a design
              question; this pair answers it in one glance, and the features
              below then show how. */}
          {beforeAfter && (
            <div className="container-800">
              {/* `_2-x-1-grid comparison` — the site's screen-comparison
                  contract (custom.css §22), not a local grid. No --cols: both
                  halves are placeholders at a shared 16:10, so the even split
                  already gives equal heights. Real screenshots will need it at
                  this call site, as the vac-redesign pairs do.

                  .image-wrapper is load-bearing: §22's rules reach the image
                  through it. */}
              <div className="_2-x-1-grid comparison">
                {[
                  { label: "Before", shot: beforeAfter.before },
                  { label: "After", shot: beforeAfter.after },
                ].map(({ label, shot }) => (
                  <div className="captioned-image" key={label}>
                    <div className="image-wrapper">
                      <ShotPlaceholder
                        src={shot.screenshotSrc}
                        alt={shot.screenshotAlt}
                      />
                    </div>
                    <div className="caption-wrapper">
                      <p className="caption-title">{label}</p>
                      <p className="caption">{shot.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {features.length > 0 && (
            <div className="container-800 project-features">
              {features.map((feature) => (
                <div className="project-feature" key={feature.title}>
                  <div className="eyebrow-and-headline-container">
                    {/* Name and badge on one row, badge flush right — the same
                        shape as the project label above, so the two levels read
                        as one pattern at two scales. */}
                    <div className="feature-label">
                      <h3>{feature.title}</h3>
                      <Tag tag={feature.tag} />
                    </div>
                  </div>
                  <p>{feature.body}</p>
                  <ShotPlaceholder
                    src={feature.screenshotSrc}
                    alt={feature.screenshotAlt}
                  />
                </div>
              ))}
            </div>
          )}

          {/* The scroll target, and the end of the section's evidence. */}
          <div className="container-800" id={prototypeId}>
            <div className="feature-prototype">
              {figmaEmbedUrl ? (
                <iframe
                  className="feature-embed"
                  src={figmaEmbedUrl}
                  title={`${name} prototype`}
                  allowFullScreen
                />
              ) : features.length === 0 && screenshotSrc ? (
                <ShotPlaceholder
                  src={screenshotSrc}
                  alt={screenshotAlt ?? ""}
                />
              ) : null}

              <p className="feature-prototype-link">
                {/* New tab, so opening a prototype doesn't cost the reader
                    their place on a 13-screen page. rel="noopener" is required
                    with target="_blank". ↗ rather than → is the convention for
                    "leaves this page", and the aria-label says so for anyone
                    who can't see the glyph. */}
                <a
                  className="inline-link"
                  href={prototypeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Try the ${name} prototype (opens in a new tab)`}
                >
                  Try it &#8599;
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
