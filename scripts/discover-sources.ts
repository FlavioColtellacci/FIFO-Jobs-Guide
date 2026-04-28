import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type SourceQueryConfig = {
  queries: string[];
  maxResultsPerQuery: number;
};

type BraveResult = {
  url: string;
  title?: string;
  description?: string;
  age?: string;
};

type DiscoveryItem = {
  query: string;
  url: string;
  title: string;
  snippet: string;
  age?: string;
  capturedAt: string;
};

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data");
const QUERY_FILE = path.join(DATA_DIR, "source-queries.json");
const OUTPUT_FILE = path.join(DATA_DIR, "discovery.raw.json");

async function loadQueries(): Promise<SourceQueryConfig> {
  const raw = await readFile(QUERY_FILE, "utf8");
  return JSON.parse(raw) as SourceQueryConfig;
}

async function searchBrave(query: string, count: number, apiKey: string): Promise<BraveResult[]> {
  const url = new URL("https://api.search.brave.com/res/v1/web/search");
  url.searchParams.set("q", query);
  url.searchParams.set("count", String(Math.min(Math.max(count, 1), 20)));
  url.searchParams.set("search_lang", "en");
  url.searchParams.set("country", "au");

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "X-Subscription-Token": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Brave API request failed (${response.status}) for query: ${query}`);
  }

  const data = (await response.json()) as {
    web?: { results?: BraveResult[] };
  };

  return data.web?.results ?? [];
}

function normalizeResults(query: string, results: BraveResult[]): DiscoveryItem[] {
  const capturedAt = new Date().toISOString();
  return results
    .filter((result) => Boolean(result.url))
    .map((result) => ({
      query,
      url: result.url,
      title: result.title ?? "",
      snippet: result.description ?? "",
      age: result.age,
      capturedAt,
    }));
}

async function main() {
  const apiKey = process.env.BRAVE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing BRAVE_API_KEY environment variable.");
  }

  const config = await loadQueries();
  const allItems: DiscoveryItem[] = [];

  for (const query of config.queries) {
    const results = await searchBrave(query, config.maxResultsPerQuery, apiKey);
    allItems.push(...normalizeResults(query, results));
  }

  const uniqueByUrl = Array.from(new Map(allItems.map((item) => [item.url, item])).values());
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: "brave-search",
        itemCount: uniqueByUrl.length,
        items: uniqueByUrl,
      },
      null,
      2
    )
  );

  console.log(`discovery complete: ${uniqueByUrl.length} unique urls`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
