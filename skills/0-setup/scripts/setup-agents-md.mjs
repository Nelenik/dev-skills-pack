#!/usr/bin/env node
// Installs or updates the managed dev-skills-pack block in AGENTS.md.
//
// - No AGENTS.md            -> creates it with the block.
// - AGENTS.md without block -> appends the block, existing content untouched.
// - AGENTS.md with block    -> replaces only the text between the markers.
// - CLAUDE.md that exists but does not import AGENTS.md -> appends a marked
//   `@AGENTS.md` import (Claude Code reads CLAUDE.md, not AGENTS.md).
//
// Usage: node setup-agents-md.mjs [--cwd <dir>] [--dry-run] [--check] [--claude]
//   --dry-run  print what would happen, write nothing
//   --check    validate AGENTS.md markers, write nothing
//   --claude   also create CLAUDE.md with the import when it does not exist
// Exit codes: 0 ok, 1 usage/IO error, 2 broken markers (file left untouched).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BEGIN_RE = /<!-- dev-skills-pack:begin( v(\d+))? -->/;
const BEGIN_MARKER_RE = /<!--\s*dev-skills-pack:begin\b[^>]*-->/g;
const END_MARKER_RE = /<!--\s*dev-skills-pack:end\s*-->/g;
const END = "<!-- dev-skills-pack:end -->";
const IMPORT_BEGIN = "<!-- dev-skills-pack:import:begin -->";
const IMPORT_END = "<!-- dev-skills-pack:import:end -->";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const dryRun = flag("--dry-run");
const checkOnly = flag("--check");
const cwd = path.resolve(opt("--cwd") ?? process.cwd());
const here = path.dirname(fileURLToPath(import.meta.url));
const blockPath = path.resolve(here, "../templates/agents-block.md");

/** Writes a file unless running in dry-run mode. */
function write(file, text) {
  if (!dryRun) fs.writeFileSync(file, text);
}

/** Returns the dominant line ending of `text` ("\r\n" or "\n"). */
function eolOf(text) {
  return text.includes("\r\n") ? "\r\n" : "\n";
}

/** Converts all line endings of `text` to `eol`. */
function withEol(text, eol) {
  return text.replace(/\r\n/g, "\n").replace(/\n/g, eol);
}

let block;
try {
  block = fs.readFileSync(blockPath, "utf8").replace(/\r\n/g, "\n").trimEnd();
} catch (err) {
  console.error(`Cannot read block template: ${blockPath}\n${err.message}`);
  process.exit(1);
}
const newVersion = block.match(BEGIN_RE)?.[2] ?? "?";

const agentsFile = path.join(cwd, "AGENTS.md");
const claudeFile = path.join(cwd, "CLAUDE.md");
const prefix = dryRun ? "[dry-run] " : "";

// ---- AGENTS.md -----------------------------------------------------------
if (!fs.existsSync(agentsFile)) {
  if (checkOnly) {
    console.log("AGENTS.md: missing; integrity check passed (setup may be needed).");
  } else {
  write(agentsFile, block + "\n");
  console.log(`${prefix}AGENTS.md: created with dev-skills-pack block v${newVersion}.`);
  }
} else {
  const original = fs.readFileSync(agentsFile, "utf8");
  const eol = eolOf(original);
  const text = original.replace(/\r\n/g, "\n");
  const markerBegins = [...text.matchAll(BEGIN_MARKER_RE)];
  const markerEnds = [...text.matchAll(END_MARKER_RE)];
  const begins = [...text.matchAll(new RegExp(BEGIN_RE.source, "g"))];
  const ends = markerEnds;
  const begin = begins[0];
  const endIdx = ends[0]?.index ?? -1;

  if (markerBegins.length !== begins.length || begins.length > 1 || ends.length > 1) {
    console.error("AGENTS.md has malformed or ambiguous dev-skills-pack markers. Fix it manually; nothing was changed.");
    process.exit(2);
  }

  if (begin && endIdx === -1) {
    console.error("AGENTS.md has a dev-skills-pack begin marker without an end marker. Fix it manually; nothing was changed.");
    process.exit(2);
  }
  if (!begin && endIdx !== -1) {
    console.error("AGENTS.md has a dev-skills-pack end marker without a begin marker. Fix it manually; nothing was changed.");
    process.exit(2);
  }

  if (checkOnly) {
    console.log(begin ? "AGENTS.md: managed block is valid." : "AGENTS.md: managed block is missing; integrity check passed (setup may be needed).");
  } else if (begin) {
    const start = begin.index;
    const stop = endIdx + END.length;
    if (stop <= start) {
      console.error("AGENTS.md markers are in the wrong order. Fix it manually; nothing was changed.");
      process.exit(2);
    }
    const oldVersion = begin[2] ?? "?";
    const current = text.slice(start, stop);
    if (current === block) {
      console.log(`${prefix}AGENTS.md: block v${oldVersion} is already up to date.`);
    } else {
      const next = text.slice(0, start) + block + text.slice(stop);
      write(agentsFile, withEol(next, eol));
      console.log(`${prefix}AGENTS.md: block updated v${oldVersion} -> v${newVersion} (text outside the markers untouched).`);
    }
  } else {
    const sep = text.trim().length === 0 ? "" : text.endsWith("\n") ? "\n" : "\n\n";
    const next = text + sep + block + "\n";
    write(agentsFile, withEol(next, eol));
    console.log(`${prefix}AGENTS.md: block v${newVersion} appended to the existing file (existing content untouched).`);
  }
}

if (checkOnly) process.exit(0);

// ---- CLAUDE.md -----------------------------------------------------------
const importBlock = `${IMPORT_BEGIN}\n@AGENTS.md\n${IMPORT_END}`;
if (fs.existsSync(claudeFile)) {
  const original = fs.readFileSync(claudeFile, "utf8");
  if (/^\s*@AGENTS\.md\s*$/m.test(original)) {
    console.log(`${prefix}CLAUDE.md: already imports AGENTS.md.`);
  } else {
    const eol = eolOf(original);
    const text = original.replace(/\r\n/g, "\n");
    const sep = text.trim().length === 0 ? "" : text.endsWith("\n") ? "\n" : "\n\n";
    write(claudeFile, withEol(text + sep + importBlock + "\n", eol));
    console.log(`${prefix}CLAUDE.md: appended an @AGENTS.md import (existing content untouched).`);
  }
} else if (flag("--claude")) {
  write(claudeFile, importBlock + "\n");
  console.log(`${prefix}CLAUDE.md: created with an @AGENTS.md import.`);
} else {
  console.log(
    `${prefix}CLAUDE.md: not found, left alone. Claude Code reads CLAUDE.md, not AGENTS.md; re-run with --claude to create one that imports AGENTS.md.`
  );
}
