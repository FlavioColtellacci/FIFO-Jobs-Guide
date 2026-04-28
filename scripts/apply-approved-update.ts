import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type BaseRole = {
  id: string;
  title: string;
  salaryRangeAud?: { min: number; max: number };
  rosters?: string[];
  sources?: Array<{
    url: string;
    publisher: string;
    capturedAt: string;
    confidence: number;
  }>;
};

type PendingChange = {
  roleId: string;
  changeType: "salary_range_signal" | "roster_signal" | "new_source";
  proposedValue: unknown;
  confidence: number;
  evidence: {
    url: string;
    publisherHint: string;
    capturedAt: string;
  };
};

const ROOT = process.cwd();
const BASE_FILE = path.join(ROOT, "data", "roles.base.json");
const PENDING_FILE = path.join(ROOT, "data", "updates.pending.json");
const TRUSTED_PUBLISHERS = ["seek.com.au", "indeed.com.au", "hays.com.au", "programmed.com.au", "recruitwest.com.au"];

async function main() {
  const confidenceThreshold = Number(process.env.AUTO_APPLY_MIN_CONFIDENCE ?? "0.9");

  const baseRaw = await readFile(BASE_FILE, "utf8");
  const pendingRaw = await readFile(PENDING_FILE, "utf8");

  const base = JSON.parse(baseRaw) as { lastUpdated: string; roles: BaseRole[] };
  const pending = JSON.parse(pendingRaw) as { changes: PendingChange[] };

  for (const change of pending.changes) {
    if (change.confidence < confidenceThreshold) continue;
    const trustedPublisher = TRUSTED_PUBLISHERS.some((trusted) => change.evidence.publisherHint.includes(trusted));
    const role = base.roles.find((item) => item.id === change.roleId);
    if (!role) continue;

    if (change.changeType === "salary_range_signal") {
      if (!trustedPublisher) continue;
      const salary = change.proposedValue as { min?: number; max?: number };
      if (typeof salary.min === "number" && typeof salary.max === "number") {
        role.salaryRangeAud = { min: salary.min, max: salary.max };
      }
    }

    if (change.changeType === "roster_signal") {
      const rosters = change.proposedValue as string[];
      if (Array.isArray(rosters) && rosters.length > 0) {
        role.rosters = Array.from(new Set([...(role.rosters ?? []), ...rosters]));
      }
    }

    if (change.changeType === "new_source") {
      role.sources = role.sources ?? [];
      const alreadyExists = role.sources.some((source) => source.url === change.evidence.url);
      if (!alreadyExists) {
        role.sources.push({
          url: change.evidence.url,
          publisher: change.evidence.publisherHint,
          capturedAt: change.evidence.capturedAt,
          confidence: change.confidence,
        });
      }
    }
  }

  base.lastUpdated = new Date().toISOString().slice(0, 10);
  await writeFile(BASE_FILE, `${JSON.stringify(base, null, 2)}\n`);
  console.log(`base data updated at ${base.lastUpdated}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
