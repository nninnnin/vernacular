import fs from "fs";
import path from "path";
import type { DocFile } from "./docs-shared";

export type { DocFile } from "./docs-shared";
export { DIR_LABELS } from "./docs-shared";

export const DOCS_ROOT = path.join(process.cwd(), "../../docs");

type Frontmatter = { title?: string; title_en?: string };

function parseFrontmatter(content: string): { frontmatter: Frontmatter; body: string } {
  if (!content.startsWith("---")) return { frontmatter: {}, body: content };

  const end = content.indexOf("---", 3);
  if (end === -1) return { frontmatter: {}, body: content };

  const block = content.slice(3, end).trim();
  const frontmatter: Frontmatter = {};

  for (const line of block.split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    if (key === "title") frontmatter.title = value;
    if (key === "title_en") frontmatter.title_en = value;
  }

  return { frontmatter, body: content.slice(end + 3).trimStart() };
}

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getAllDocs(): DocFile[] {
  const results: DocFile[] = [];

  function walk(dir: string, segments: string[]) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...segments, entry.name]);
      } else if (entry.name.endsWith(".md")) {
        const slug = [...segments, entry.name.replace(/\.md$/, "")];
        const content = fs.readFileSync(path.join(dir, entry.name), "utf-8");
        const { frontmatter } = parseFrontmatter(content);
        const fallback = formatTitle(entry.name.replace(/\.md$/, ""));
        results.push({
          slug,
          title: frontmatter.title ?? fallback,
          title_en: frontmatter.title_en ?? fallback,
          dir: segments[0] ?? "",
        });
      }
    }
  }

  walk(DOCS_ROOT, []);
  return results;
}

export function readDoc(slug: string[]): { body: string; frontmatter: Frontmatter } | null {
  const filePath = path.join(DOCS_ROOT, ...slug) + ".md";
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(content);
}
