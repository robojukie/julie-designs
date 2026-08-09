/* The product-context block on the NovinoPath showcase: a row of labelled
   columns carrying the facts a reader wants before they start scrolling
   features.

   SHAPE. Columns, not a single-line strip. An earlier version was a four-up
   band of one-line values spanning the full 1232 container; two things were
   wrong with it. It introduced a second measure — the band ran to 1232 while
   every paragraph on the page sits at 800, so the first two screens had two
   competing left-to-right rhythms. And a one-line value cell can only hold a
   job title: "1 PM, 4 engineers, 1 designer (me)" wrapped and broke the row's
   shared baseline. Columns of stacked items hold real content and stay on the
   prose measure.

   Deliberately NOT CaseStudyHero's `roles` list. That renders inside the
   hero's two-column grid and is scoped to a case study's own framing (My role
   / Tools / TEAM). This block sits below the overview prose, after a rule, and
   is the page's answer to "what is this and who built it".

   Reuses the ported .eyebrow type ramp for the column labels — the same
   treatment the case studies give their role labels — so the block stays in
   the existing type system rather than inventing a label size. Layout classes
   live in styles/custom.css under "NovinoPath showcase". */

type ContextValue = string | string[];

type ContextStripProps = {
  role: ContextValue;
  timeline: ContextValue;
  team: ContextValue;
  /* Optional so the block can run as three columns (the default, and what the
     800px measure comfortably holds) or four. */
  platform?: ContextValue;
};

export default function ContextStrip({
  role,
  timeline,
  team,
  platform,
}: ContextStripProps) {
  const columns = [
    { label: "Timeline", value: timeline },
    { label: "My Role", value: role },
    ...(platform ? [{ label: "Platform", value: platform }] : []),
    { label: "Team", value: team },
  ];

  return (
    <dl className="context-columns">
      {columns.map((column) => (
        <div className="context-column" key={column.label}>
          <dt className="eyebrow">{column.label}</dt>
          {/* A <dd> per item rather than one <dd> holding a list: each item is
              its own value for the same term, which is what a description list
              already models. Saves nesting a <ul> inside a <dd>.

              Keyed by index, not by the item's text. These lists are static and
              order-stable, and two entries can legitimately read the same — as
              the placeholder copy does today. Keying on the text made React
              drop the duplicates, which broke hydration for the whole subtree
              and left the FadeIn wrappers above stuck at opacity: 0. */}
          {(Array.isArray(column.value) ? column.value : [column.value]).map(
            (item, index) => (
              <dd className="context-column-item" key={index}>
                {item}
              </dd>
            ),
          )}
        </div>
      ))}
    </dl>
  );
}
