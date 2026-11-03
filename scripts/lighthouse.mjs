import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const base = process.env.LH_URL ?? "http://localhost:3000";
const strategies = (process.env.LH_STRATEGY ?? "mobile,desktop").split(",");
const locales = (process.env.LH_LOCALES ?? "ar,en").split(",");
const routes = ["", "/services", "/services/creative-sculptures", "/works", "/about", "/contact"];
const outDir = join(process.cwd(), "lighthouse-reports");
const categories = ["performance", "accessibility", "best-practices", "seo"];

mkdirSync(outDir, { recursive: true });

const rows = [];

for (const strategy of strategies) {
  for (const locale of locales) {
    for (const route of routes) {
      const path = `/${locale}${route}`;
      const name = `${strategy}-${locale}${route.replace(/\//g, "-") || "-home"}`;
      const jsonPath = join(outDir, `${name}.json`);
      const args = [
        "--yes",
        "lighthouse@12",
        `${base}${path}`,
        "--quiet",
        "--output=json",
        "--output=html",
        `--output-path=${join(outDir, name)}`,
        `--only-categories=${categories.join(",")}`,
        "--chrome-flags=--headless=new --no-sandbox",
      ];
      if (strategy === "desktop") args.push("--preset=desktop");

      try {
        execFileSync("npx", args, { stdio: "ignore", shell: true });
        const result = JSON.parse(readFileSync(`${join(outDir, name)}.report.json`, "utf8"));
        const score = (id) => Math.round((result.categories[id]?.score ?? 0) * 100);
        const a = result.audits;
        rows.push({
          strategy,
          path,
          perf: score("performance"),
          a11y: score("accessibility"),
          bp: score("best-practices"),
          seo: score("seo"),
          LCP: a["largest-contentful-paint"]?.displayValue,
          CLS: a["cumulative-layout-shift"]?.displayValue,
          TBT: a["total-blocking-time"]?.displayValue,
        });
      } catch {
        rows.push({ strategy, path, perf: "ERR", a11y: "ERR", bp: "ERR", seo: "ERR" });
      }
      rmSync(jsonPath, { force: true });
    }
  }
}

console.table(rows);
console.log(`HTML reports: ${outDir}`);
