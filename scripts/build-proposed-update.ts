import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type BaseRole = {
  id: string;
  title: string;
  aliases?: string[];
  salaryRangeAud?: { min: number; max: number };
};

type ExtractedSignal = {
  url: string;
  publisherHint: string;
  title: string;
  snippet: string;
  roleHints: string[];
  rosterHints: string[];
  salaryHintsAud: number[];
  visaHints: string[];
  confidence: number;
  capturedAt: string;
};

type PendingChange = {
  roleId: string;
  roleTitle: string;
  changeType: "salary_range_signal" | "roster_signal" | "new_source";
  proposedValue: unknown;
  confidence: number;
  evidence: {
    url: string;
    publisherHint: string;
    snippet: string;
    capturedAt: string;
  };
};

const ROOT = process.cwd();
const BASE_FILE = path.join(ROOT, "data", "roles.base.json");
const EXTRACTED_FILE = path.join(ROOT, "data", "extracted.raw.json");
const OUTPUT_FILE = path.join(ROOT, "data", "updates.pending.json");

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, " ");
}

function roleMatchesSignal(role: BaseRole, signal: ExtractedSignal): boolean {
  const haystack = normalize(`${signal.title} ${signal.snippet}`);
  const terms = [role.title, ...(role.aliases ?? [])].map(normalize);
  return terms.some((term) => term.split(" ").filter(Boolean).every((word) => haystack.includes(word)));
}

function buildChanges(role: BaseRole, signal: ExtractedSignal): PendingChange[] {
  const changes: PendingChange[] = [];
  const evidence = {
    url: signal.url,
    publisherHint: signal.publisherHint,
    snippet: signal.snippet,
    capturedAt: signal.capturedAt,
  };

  if (signal.salaryHintsAud.length >= 2 && signal.confidence >= 0.65) {
    const salaryMin = Math.min(...signal.salaryHintsAud);
    const salaryMax = Math.max(...signal.salaryHintsAud);
    changes.push({
      roleId: role.id,
      roleTitle: role.title,
      changeType: "salary_range_signal",
      proposedValue: { min: salaryMin, max: salaryMax },
      confidence: signal.confidence,
      evidence,
    });
  }

  if (signal.rosterHints.length > 0 && signal.confidence >= 0.6) {
    changes.push({
      roleId: role.id,
      roleTitle: role.title,
      changeType: "roster_signal",
      proposedValue: Array.from(new Set(signal.rosterHints)),
      confidence: signal.confidence,
      evidence,
    });
  }

  if (signal.confidence >= 0.55) {
    changes.push({
      roleId: role.id,
      roleTitle: role.title,
      changeType: "new_source",
      proposedValue: {
        url: signal.url,
        publisher: signal.publisherHint,
      },
      confidence: signal.confidence,
      evidence,
    });
  }

  return changes;
}

async function main() {
  const baseRaw = await readFile(BASE_FILE, "utf8");
  const extractedRaw = await readFile(EXTRACTED_FILE, "utf8");

  const base = JSON.parse(baseRaw) as { roles: BaseRole[] };
  const extracted = JSON.parse(extractedRaw) as { items: ExtractedSignal[] };

  const changes: PendingChange[] = [];
  for (const signal of extracted.items) {
    for (const role of base.roles) {
      if (roleMatchesSignal(role, signal)) {
        changes.push(...buildChanges(role, signal));
      }
    }
  }

  const uniqueChanges = Array.from(
    new Map(changes.map((change) => [`${change.roleId}:${change.changeType}:${JSON.stringify(change.proposedValue)}`, change])).values()
  );

  const output = {
    generatedAt: new Date().toISOString(),
    reviewRequired: true,
    summary: {
      newSources: uniqueChanges.filter((c) => c.changeType === "new_source").length,
      potentialSalaryChanges: uniqueChanges.filter((c) => c.changeType === "salary_range_signal").length,
      potentialRosterSignals: uniqueChanges.filter((c) => c.changeType === "roster_signal").length,
      lowConfidenceItems: uniqueChanges.filter((c) => c.confidence < 0.65).length,
    },
    changes: uniqueChanges,
  };

  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`);

  if (uniqueChanges.length === 0) {
    console.log("no proposed updates");
    return;
  }

  console.log(`proposed updates: ${uniqueChanges.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
