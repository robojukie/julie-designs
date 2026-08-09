/* Not in the original brief, which listed stubs for consult-review and
   slide-viewer only — but the showcase page has three feature areas and each
   one renders a "Try it →" link, so without this route the third link is a 404.
   Same shape as its two siblings; replace or delete together with them. */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboards Prototype",
};

export default function DashboardsPrototype() {
  return (
    <div className="prototype-stub">
      <h1>Dashboards Prototype &mdash; coming soon</h1>
    </div>
  );
}
