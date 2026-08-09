import FadeIn from "@/components/FadeIn";

/* One feature area on the NovinoPath showcase: a design problem, the parts of
   the app it touched, and the prototype that demonstrates it.

   This is the page's repeating unit, and it is what makes the page a showcase
   rather than a case study — there is no before/after pair here and no process
   step, just problem → work → artefact, once per feature area.

   TWO SHAPES. A feature area is rarely one screen. `parts` lets a feature
   carry several — a notification redesign plus a queue plus a modal, each with
   its own screenshot — while a feature that really is one surface can pass
   screenshotSrc/screenshotAlt instead and skip the machinery. Both render the
   same prototype link and the same cross-links at the foot.

   NAMING THE PARTS. Numbered eyebrow above the part's name, on its own line:

       PART 01
       Notification redesign

   rather than "Solution part 1: Notification redesign" on one. The prose form
   runs long before it says anything — "Solution part 1" is fourteen characters
   of scaffolding in front of the four words that carry the meaning, and at h3
   size it wraps on a narrow column. Splitting it onto two lines lets the label
   shrink to the site's existing .eyebrow ramp and the name sit at heading size
   where it can be scanned. It is also the eyebrow-over-heading pattern the
   case studies already use for their goals and phases, so it needs no new
   idiom — see .eyebrow-and-headline-container in juliepaik.css.

   Two ways to show a prototype, in priority order:
     1. figmaEmbedUrl present → an <iframe>, so it is operable in place. This
        is the intended resting state once the embeds exist.
     2. otherwise → the "Try it ↗" link out to the stub route in app/prototype/.
   The link renders either way, as the escape hatch for anyone whose browser
   blocks the embed.

   FadeIn is the site's existing reveal (components/FadeIn.tsx). Worth being
   precise about what it does: it fades on MOUNT, not on scroll — it is a
   motion.div with an animate-on-enter transition and no viewport trigger. */

export type FeatureTag = "New feature" | "Redesign";

export type FeatureShot = {
  screenshotSrc: string;
  screenshotAlt: string;
  caption: string;
};

export type FeaturePart = {
  /* The part's name — "Notification redesign". The PART 01 label above it is
     generated from position, so reordering the array renumbers them and there
     is no number to keep in sync by hand. */
  title: string;
  /* Per PART, because that is where the fact actually lives: a feature area
     can be a new surface built around a reworked one. The feature's own badges
     are derived from this — see featureTags below — so the two can never
     disagree. */
  tag: FeatureTag;
  body: string;
  screenshotSrc: string;
  screenshotAlt: string;
};

/* "New feature" first, always. When a feature area contains both kinds of work
   the newer thing is the headline — a reader scanning the page wants to know
   what was BUILT before what was revised, and a fixed order also means the
   badge row doesn't reshuffle between sections.

   Doubles as the de-duplicator: filtering a fixed list by "is this present"
   returns each tag at most once, in that list's order, however many parts
   carry it. */
const TAG_ORDER: FeatureTag[] = ["New feature", "Redesign"];

/* Zero-padded, matching the outcome cards' 01/02/03 and the PART labels. In a
   vertical list the padding is what keeps the names on one left edge; in the
   "Feature 01 of 03" line it is there so the same feature is called the same
   thing everywhere on the page. */
export const pad = (n: number) => String(n).padStart(2, "0");

type FeatureSectionProps = {
  id: string;
  /* The feature's NAME — "Consult Review", not "Feature 1 of 3: Consult
     Review". The prefix is added below so one string can serve the section
     heading, the in-page TOC and the cross-links at the foot of every other
     section. */
  eyebrow: string;
  /* Position and count, rendered as "Feature 1 of 3". Both are needed: the
     index alone says which one you are on but not how many are left, and a
     reader who has jumped straight here by anchor has seen neither the menu
     nor the sections above. Derived from the page's FEATURES array, so
     adding a fourth feature renumbers everything with no edit here. */
  index: number;
  total: number;
  /* Fallback for a feature with no parts. When parts exist their tags are the
     source of truth and this is ignored. */
  tag?: FeatureTag;
  heading: string;
  body: string;
  /* One pair per FEATURE, not per part. The parts walk through individual
     screens; this is the whole area seen from outside, which is the level at
     which "what changed" is a question worth answering. A pair per part would
     be six or eight images for one feature and would bury the parts' own
     screenshots among near-identical siblings. */
  beforeAfter?: { before: FeatureShot; after: FeatureShot };
  /* The screens this feature touched. When empty, the component falls back to
     the single screenshotSrc below. */
  parts?: FeaturePart[];
  screenshotSrc?: string;
  screenshotAlt?: string;
  prototypeHref: string;
  figmaEmbedUrl?: string;
  /* The OTHER feature areas, for the cross-links at the foot of this section.
     Without them a reader who jumps here from the TOC has to scroll back up to
     reach a sibling — and on a page whose whole argument is "here are the
     feature areas", that dead end is the one navigation failure that matters.
     Passed in rather than derived, so the page keeps its single list. */
  otherFeatures?: { id: string; label: string }[];
};

/* Shared by the part screenshots and the single-screenshot fallback. The brief
   specified Tailwind's `bg-gray-100`; there is no Tailwind in this project, so
   .placeholder-media in styles/custom.css paints the equivalent flat neutral
   from the existing token set and holds the aspect ratio so the page doesn't
   reflow when the real image lands.

   data-placeholder-for carries the src so each box says which asset it is
   waiting on — swapping in <ZoomableImage src={src} alt={alt} /> is then a
   one-line change with the path already in place. */
function Tag({ tag }: { tag: FeatureTag }) {
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

function ShotPlaceholder({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="placeholder-media"
      data-placeholder-for={src}
      /* aria-hidden, NOT role="img". A grey box is scaffolding, not content —
         role="img" promised assistive tech a picture that isn't there, and
         with 14 of these on the page that was 14 announcements of images that
         don't exist, several with alt text generated from a URL slug.
         `alt` is still taken so the call sites keep the description next to
         the asset path; write the real alt at swap time, against a real
         image. */
      aria-hidden="true"
      data-alt={alt}
    />
  );
}

export default function FeatureSection({
  id,
  eyebrow,
  index,
  total,
  tag,
  heading,
  body,
  beforeAfter,
  parts = [],
  screenshotSrc,
  screenshotAlt,
  prototypeHref,
  figmaEmbedUrl,
  otherFeatures = [],
}: FeatureSectionProps) {
  /* Derived, never passed in. Consult Review is two new screens plus a
     reworked one, so it carries BOTH badges — and because they come from the
     parts, a part changing kind updates the feature's row for free. */
  const featureTags =
    parts.length > 0
      ? TAG_ORDER.filter((t) => parts.some((p) => p.tag === t))
      : tag
        ? [tag]
        : [];

  return (
    <FadeIn>
      {/* id on the <section>, not on FadeIn's motion.div, so the in-page TOC
          lands on the element that actually carries the section's padding —
          scrolling to the wrapper would put the heading under the navbar. */}
      <section id={id} className="project-section showcase-section">
        <div className="container-1232">
          <div className="container-800">
            <div className="heading-and-body-container">
              <div className="eyebrow-and-headline-container">
                <div className="feature-label">
                  {/* A <p>, not an <h2>. This is a kicker on the heading below
                      it, and as a heading it put TWO h2s in every feature
                      section — so heading-by-heading navigation heard six
                      across three features, alternating label and question at
                      the same level with nothing pairing them.

                      The case studies' .eyebrow-and-headline-container does
                      use an h2 here; that is the export's mistake and not a
                      pattern worth matching. Every other kicker on this page
                      (Part 01, Overview) is already a <p>. */}
                  <p className="eyebrow">
                    Feature {pad(index)} of {pad(total)}: {eyebrow}
                  </p>
                  {featureTags.length > 0 && (
                    <span className="feature-tag-group">
                      {featureTags.map((t) => (
                        <Tag key={t} tag={t} />
                      ))}
                    </span>
                  )}
                </div>
                <h2>{heading}</h2>
              </div>
              <p>{body}</p>

              {/* Directly under the description, NOT at the foot of the
                  section. A feature with three parts is three screenshots
                  tall, and a link parked below all of them is a link nobody
                  finds — by the time you have scrolled past the images you are
                  already reading the next feature. Here it sits with the
                  sentence that explains what the prototype demonstrates. */}
              <p className="feature-prototype-link">
                {/* New tab, so a reader who opens a prototype doesn't lose
                    their place on a long page and have to find this section
                    again. rel="noopener" is required with target="_blank":
                    without it the opened page gets a window.opener handle back
                    into this one. The arrow is ↗ rather than → because that is
                    the convention for "leaves this page", and the aria-label
                    says so outright for anyone who can't see the glyph. */}
                <a
                  className="inline-link"
                  href={prototypeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Try the ${eyebrow} prototype (opens in a new tab)`}
                >
                  Try it &#8599;
                </a>
              </p>
            </div>
          </div>

          {/* BEFORE the parts, not after. The heading posed a design question;
              this pair answers it in one glance, and the parts below then show
              how. Reversed, a reader has to get through every part before
              seeing what any of it added up to — on a page whose whole job is
              making the work legible quickly, that is the wrong way round.

              .captioned-image / .caption-title / .caption is the export's own
              before-after idiom — vac-redesign uses exactly this markup for
              its flow comparisons — so this needs a grid and nothing else. */}
          {beforeAfter && (
            <div className="container-800">
              {/* `_2-x-1-grid comparison` — the site's screen-comparison
                  contract (custom.css §22), not a local grid. It brings equal
                  heights with tops and captions aligned side by side, and
                  equal widths flush to the gutter once stacked.

                  No --cols: both halves are placeholders at a shared 16:10, so
                  the even split already gives equal heights. Real screenshots
                  will need it — derive the two fr values from their
                  width/height props at this call site, as the vac-redesign
                  pairs do.

                  .image-wrapper is load-bearing, not decoration: §22's rules
                  reach the image through it. */}
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

          {parts.length > 0 ? (
            <div className="container-800 feature-parts">
              {parts.map((part, index) => (
                <div className="feature-part" key={part.title}>
                  <div className="eyebrow-and-headline-container">
                    {/* Same row shape as the feature label above — number
                        left, badge flush right — so the two levels read as
                        the same kind of thing at two scales. */}
                    <div className="feature-label">
                      <p className="eyebrow project-overview-label">
                        Part {pad(index + 1)}
                      </p>
                      <Tag tag={part.tag} />
                    </div>
                    <h3>{part.title}</h3>
                  </div>
                  <p>{part.body}</p>
                  <ShotPlaceholder
                    src={part.screenshotSrc}
                    alt={part.screenshotAlt}
                  />
                </div>
              ))}
            </div>
          ) : null}

          {/* The embed, when there is one, stays HERE rather than following
              the link above — it is the payoff at the end of the walkthrough,
              and an operable iframe between the description and Part 01 would
              pre-empt the parts it is meant to summarise. Same for the
              single-screenshot fallback a feature with no parts uses. */}
          {(figmaEmbedUrl || (parts.length === 0 && screenshotSrc)) && (
            <div className="container-800">
              <div className="feature-prototype">
                {figmaEmbedUrl ? (
                  <iframe
                    className="feature-embed"
                    src={figmaEmbedUrl}
                    title={`${eyebrow} prototype`}
                    allowFullScreen
                  />
                ) : (
                  <ShotPlaceholder
                    src={screenshotSrc as string}
                    alt={screenshotAlt ?? ""}
                  />
                )}
              </div>
            </div>
          )}

          {otherFeatures.length > 0 && (
            <div className="container-800 feature-more-block">
              <nav className="feature-more" aria-label="Other feature areas">
                <p className="eyebrow project-overview-label">
                  Other feature areas
                </p>
                <ul className="feature-toc-list" role="list">
                  {otherFeatures.map((other) => (
                    <li key={other.id}>
                      <a className="inline-link" href={`#${other.id}`}>
                        {other.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </section>
    </FadeIn>
  );
}
