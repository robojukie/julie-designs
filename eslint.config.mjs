import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  {
    // The Webflow export is the migration source, not project code — linting it
    // is noise. Same for the draft pages kept for reference and build output.
    ignores: [
      "juliepaik.webflow/**",
      "drafts/**",
      ".next/**",
      // Plain CommonJS Node tooling, not part of the app build.
      "scripts/**",
      "extract-webflow-interactions.js",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default config;
