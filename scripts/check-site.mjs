import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const pages = ["index.html", "our-story.html", "menu.html", "bakery.html", "specials.html", "contact.html"];
const errors = [];
const exists = p => fs.existsSync(path.join(root, p));
for (const page of pages) {
  if (!exists(page)) { errors.push(`Missing page: ${page}`); continue; }
  const html = fs.readFileSync(path.join(root, page), "utf8");
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${page}: missing title`);
  if (!/<meta\s+name="description"\s+content="[^"]+/i.test(html)) errors.push(`${page}: missing meta description`);
  if (!/<link\s+rel="canonical"\s+href="https:\/\/naijapotkitchengrill\.co\.uk/i.test(html)) errors.push(`${page}: missing canonical URL`);
  if (!/property="og:title"/i.test(html) || !/property="og:image"/i.test(html)) errors.push(`${page}: incomplete Open Graph tags`);
  if (!/name="twitter:card"/i.test(html)) errors.push(`${page}: missing Twitter card metadata`);
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const value = match[1].trim();
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(value) || value.startsWith("#")) continue;
    const local = decodeURIComponent(value.split("?")[0]);
    if (local && !exists(local)) errors.push(`${page}: missing local asset/link ${local}`);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { errors.push(`${page}: invalid JSON-LD structured data`); }
  }
}
for (const file of ["robots.txt", "sitemap.xml", ".github/workflows/check-site.yml", ".github/workflows/deploy-hostinger.yml"]) if (!exists(file)) errors.push(`Missing required project file: ${file}`);
if (exists("sitemap.xml")) {
  const xml = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  for (const page of pages) {
    const url = page === "index.html" ? "https://naijapotkitchengrill.co.uk/" : `https://naijapotkitchengrill.co.uk/${page}`;
    if (!xml.includes(`<loc>${url}</loc>`)) errors.push(`sitemap.xml: missing ${url}`);
  }
}
if (errors.length) { console.error("Site checks failed:\n- " + errors.join("\n- ")); process.exit(1); }
console.log(`Site checks passed: ${pages.length} pages, metadata, local references, JSON-LD, sitemap and deployment files.`);
