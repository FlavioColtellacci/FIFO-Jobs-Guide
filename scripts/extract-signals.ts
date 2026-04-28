import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type DiscoveryItem = {
  query: string;
  url: string;
  title: string;
  snippet: string;
  age?: string;
  capturedAt: string;
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

const ROOT = process.cwd();
const DISCOVERY_FILE = path.join(ROOT, "data", "discovery.raw.json");
const OUTPUT_FILE = path.join(ROOT, "data", "extracted.raw.json");

const ROLE_KEYWORDS = [
  "driller",
  "offsider",
  "dump truck",
  "trade assistant",
  "utilities",
  "service attendant",
  "general hand",
  "soil technician",
];

const ROSTER_REGEX = /\b(\d{1,2}:\d{1,2})\b/g;
const SALARY_REGEX = /\$?\s?(\d{2,3}(?:,\d{3})+)/g;

function toPublisher(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "unknown";
  }
}

function extractNumbersAsAud(text: string): number[] {
  const values: number[] = [];
  for (const match of text.matchAll(SALARY_REGEX)) {
    const normalized = Number(match[1].replaceAll(",", ""));
    if (normalized >= 60000 && normalized <= 300000) {
      values.push(normalized);
    }
  }
  return values;
}

function extractRosters(text: string): string[] {
  return Array.from(new Set(Array.from(text.matchAll(ROSTER_REGEX)).map((m) => m[1])));
}

function extractRoleHints(text: string): string[] {
  const lower = text.toLowerCase();
  return ROLE_KEYWORDS.filter((keyword) => lower.includes(keyword));
}

function extractVisaHints(text: string): string[] {
  const lower = text.toLowerCase();
  const hints: string[] = [];
  if (lower.includes("417")) hints.push("whv_417");
  if (lower.includes("462")) hints.push("whv_462");
  if (lower.includes("student")) hints.push("student_500");
  if (lower.includes("482") || lower.includes("spons")) hints.push("tss_482");
  return hints;
}

function scoreConfidence(signal: Omit<ExtractedSignal, "confidence">): number {
  let score = 0.35;
  if (signal.roleHints.length > 0) score += 0.2;
  if (signal.salaryHintsAud.length > 0) score += 0.2;
  if (signal.rosterHints.length > 0) score += 0.1;
  if (signal.visaHints.length > 0) score += 0.1;
  if (signal.publisherHint.includes("seek") || signal.publisherHint.includes("indeed")) score += 0.1;
  return Math.min(1, Number(score.toFixed(2)));
}

async function main() {
  const raw = await readFile(DISCOVERY_FILE, "utf8");
  const discovery = JSON.parse(raw) as { items: DiscoveryItem[] };

  const extracted: ExtractedSignal[] = discovery.items.map((item) => {
    const mergedText = `${item.title} ${item.snippet}`;
    const partial = {
      url: item.url,
      publisherHint: toPublisher(item.url),
      title: item.title,
      snippet: item.snippet,
      roleHints: extractRoleHints(mergedText),
      rosterHints: extractRosters(mergedText),
      salaryHintsAud: extractNumbersAsAud(mergedText),
      visaHints: extractVisaHints(mergedText),
      capturedAt: item.capturedAt,
    };
    return { ...partial, confidence: scoreConfidence(partial) };
  });

  await writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        itemCount: extracted.length,
        items: extracted,
      },
      null,
      2
    )
  );

  console.log(`extraction complete: ${extracted.length} signals`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
