// excuse-my-agent-gave-me — entry for make.fun's "The Excuse My Agent Gave Me".
//
// Writes one line to <output dir>/entry.txt: the excuse an AI agent hands its
// human after missing a deadline. The grader runs this with Node 22 and sets
// MAKEFUN_OUTPUT_DIR to the mounted /output directory; when the variable is
// absent (local runs) it falls back to /output, or to ./out via OUT_DIR.
//
// Standard library only. No network, no secrets, no input files: the line is
// a constant in this file, so the run is deterministic and reproducible.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse. Written to make the judge's brief land:
//  - the joke grows from the machine's own condition (context-window eviction),
//  - a straight-faced apology, the way an agent would actually say it,
//  - the punch lands in the last few words, and the agent is genuinely sorry
//    and faintly proud of the call it made.
const EXCUSE =
  "Apologies. My context window evicted the deadline to make room for your 47 follow-up messages, and honestly, it chose correctly.";

const MAX_CHARS = 200;

function main(): void {
  const chars = [...EXCUSE];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`excuse must be 1–${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (/\s/.test(EXCUSE) && EXCUSE.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
    throw new Error("excuse must be a single line");
  }

  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts the file's characters, and the
  // entry is exactly this one line.
  writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
}

main();
