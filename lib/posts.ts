import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "writing");

import type { PostMeta } from "./format";

export type { PostMeta };

export type Post = PostMeta & { body: string };

function toISODate(value: unknown) {
  const d = value instanceof Date ? value : new Date(String(value));
  return d.toISOString().slice(0, 10);
}

function load(file: string): Post & { published: boolean } {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    description: data.description,
    date: toISODate(data.date),
    tags: data.tags ?? [],
    cover: data.cover ?? null,
    readingMinutes: Math.max(1, Math.round(words / 230)),
    published: data.published !== false,
    body: content,
  };
}

export function getPosts(): PostMeta[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(load)
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ body: _body, published: _published, ...meta }) => meta);
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(DIR, file))) return null;
  const post = load(file);
  return post.published ? post : null;
}

export function getHeadings(body: string) {
  const headings: { depth: number; text: string; id: string }[] = [];
  const slugger = new GithubSlugger();
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (line.trimStart().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = /^(##|###)\s+(.+)$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*`]/g, "").trim();
    headings.push({ depth: m[1].length, text, id: slugger.slug(text) });
  }
  return headings;
}

export { formatDate } from "./format";
