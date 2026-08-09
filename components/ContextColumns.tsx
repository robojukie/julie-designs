/* A row of labelled columns: a short label over a stack of values.

   USED AT TWO LEVELS on the NovinoPath showcase, deliberately the same shape
   in both. The opening block answers "what is this, then who built it" —
   overview prose, a rule, then Timeline / My Role / Team. Each project section
   repeats that flow at its own scale: the design question, the description,
   then User roles / Screens. A reader who has learned to read the first one
   gets the second for free.

   Generic columns rather than named props (role, timeline, team). The named
   version could not serve the project sections without growing a second set of
   names for the same rendering, and the labels differ per placement while the
   markup does not.

   WHY THIS AND NOT A COMMA-SEPARATED LINE. An earlier version put the same
   facts in one run of text — "Pathologists, Lab technicians · 3 screens" —
   which left the reader to infer that the first two were user roles and the
   number was a screen count. Nothing said so. Labels are the whole point of
   this pattern: the value is only legible once you know what question it
   answers.

   Reuses the ported .eyebrow ramp for the labels, the same treatment the case
   studies give their role labels. Layout lives in styles/custom.css. */

type ContextValue = string | string[];

export type ContextColumn = {
  label: string;
  value: ContextValue;
};

export default function ContextColumns({
  columns,
}: {
  columns: ContextColumn[];
}) {
  return (
    <dl className="context-columns">
      {columns.map((column) => (
        <div className="context-column" key={column.label}>
          <dt className="eyebrow">{column.label}</dt>
          {/* A <dd> per item rather than one <dd> holding a list: each item is
              its own value for the same term, which is what a description list
              already models. Saves nesting a <ul> inside a <dd>.

              Keyed by index, not by text. These lists are static and
              order-stable, and two entries can legitimately read the same — as
              the placeholder copy does. Keying on the text made React drop the
              duplicates, which broke hydration for the whole subtree. */}
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
