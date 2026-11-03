import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = resolve(root, "scripts/resume.html");
const out = resolve(root, "public/resume.pdf");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].filter(Boolean);

const browser = candidates.find((candidate) => existsSync(candidate));

if (!browser) {
  console.error("No Chrome/Edge binary found. Set CHROME_PATH and retry.");
  process.exit(1);
}

execFileSync(browser, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${out}`,
  `file:///${html.replace(/\\/g, "/")}`,
]);

console.log(`Wrote ${out} using ${browser}`);
