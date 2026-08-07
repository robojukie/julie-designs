/* Fails if styles/juliepaik.css has gained a CSS rule.
 *
 * That file is the frozen record of what the original site's CSS did — see its
 * header. Deleting from it is the whole point; adding to it destroys the thing
 * that makes it worth keeping, because a record you have edited is no longer
 * evidence of anything.
 *
 * The header already said so, in plain language, and a rule was added anyway
 * within days — not carelessly, just by someone editing the file nearest the
 * thing they were changing. That is the normal way to work, which is why this
 * check exists: the rule needed a mechanism, not more prose.
 *
 * Deletions and edits to existing rules pass. Only ADDITIONS fail, and the
 * error says where the rule belongs instead.
 *
 * Usage:
 *   node scripts/check-frozen-stylesheet.mjs [baseRef]
 *
 * baseRef defaults to origin/main. CI passes the PR's base branch.
 */

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const FROZEN = "styles/juliepaik.css";
const base = process.argv[2] || "origin/main";

/* Parse into {media, selector} pairs. Bodies are deliberately ignored: this
   check is about a rule EXISTING, not about what it declares. Editing a value
   in place is allowed — the file still describes the same set of selectors. */
function rules(css) {
  const out = [];
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
  (function walk(text, media) {
    let pos = 0;
    while (pos < text.length) {
      const brace = text.indexOf("{", pos);
      if (brace === -1) break;
      const prelude = text.slice(pos, brace).trim();
      let depth = 0;
      let end = brace;
      for (; end < text.length; end++) {
        if (text[end] === "{") depth++;
        else if (text[end] === "}") {
          depth--;
          if (depth === 0) break;
        }
      }
      const body = text.slice(brace + 1, end);
      if (prelude.startsWith("@media")) {
        walk(body, [...media, prelude.replace(/\s+/g, " ")]);
      } else if (!prelude.startsWith("@")) {
        for (const sel of prelude.split(",").map((s) => s.replace(/\s+/g, " ").trim())) {
          if (sel) out.push(`${media.join(" && ")}|||${sel}`);
        }
      }
      pos = end + 1;
    }
  })(stripped, []);
  return out;
}

let baseCss;
try {
  baseCss = execSync(`git show ${base}:${FROZEN}`, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
} catch {
  // The file not existing on the base ref is not this check's problem.
  console.log(`skip: ${FROZEN} not found on ${base}`);
  process.exit(0);
}

const before = new Set(rules(baseCss));
const after = rules(readFileSync(FROZEN, "utf8"));
const added = after.filter((r) => !before.has(r));

const removedCount = [...before].filter((r) => !new Set(after).has(r)).length;

if (!added.length) {
  console.log(
    `ok: ${FROZEN} gained no rules ` +
      `(${removedCount} removed, which is allowed and expected)`
  );
  process.exit(0);
}

console.error(`FAIL: ${added.length} rule(s) were ADDED to ${FROZEN}\n`);
for (const r of added) {
  const [media, sel] = r.split("|||");
  console.error(`  ${media ? media + " " : ""}${sel}`);
}
console.error(`
${FROZEN} is the frozen record of the original site's CSS. It is edited by
DELETION only — adding to it means it no longer describes what the original
did, and the reason to trust it over the export is gone.

Put new styling in styles/custom.css instead. It loads after this file, so it
wins on equal specificity and nothing else has to change.

If a rule genuinely belongs here — i.e. you are restoring something that was
in the original export and was pruned by mistake — record it in the ledger at
scripts/cleanup.config.js in the migration repo and say so in the PR.`);
process.exit(1);
