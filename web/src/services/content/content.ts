import type { ContentPage, PageMeta } from "../../types/content";

const modules = import.meta.glob("../../../docs/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const normalizeSlug = (slug: string): string => {
  if (!slug || slug === "/") return "/";
  return `/${slug.replace(/^\/|\/$/g, "")}/`;
};

const parseFrontmatter = (text: string): [Partial<PageMeta>, string] => {
  if (!text.startsWith("---\n")) return [{}, text.trim()];

  const end = text.indexOf("\n---\n", 4);
  if (end < 0) return [{}, text.trim()];

  const meta: Partial<PageMeta> = {};
  const frontmatter = text.slice(4, end).split("\n");

  for (const line of frontmatter) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;

    const key = line.slice(0, separator).trim() as keyof PageMeta;
    const rawValue = line.slice(separator + 1).trim().replace(/^"|"$/g, "");
    const value = key === "order" ? Number(rawValue) : rawValue === "true" ? true : rawValue;

    meta[key] = value as never;
  }

  return [meta, text.slice(end + 5).trim()];
};

const toPage = ([path, markdown]: [string, unknown]): ContentPage => {
  const [frontmatter, body] = parseFrontmatter(String(markdown));
  const fallbackTitle = path.split("/").pop()?.replace(".md", "") ?? "Untitled";
  const slug = normalizeSlug(frontmatter.slug ?? fallbackTitle);

  return {
    meta: {
      title: frontmatter.title ?? fallbackTitle,
      description: frontmatter.description ?? "Evidence-based audit skills for exceptional websites and apps.",
      slug,
      section: frontmatter.section ?? "Documentation",
      order: Number(frontmatter.order ?? 999),
      archive: frontmatter.archive,
      archiveTitle: frontmatter.archiveTitle,
      hide: frontmatter.hide === true,
      menuChildren: frontmatter.menuChildren === true,
    },
    slug,
    markdown: body,
    sourcePath: path.replace("../../../docs/", ""),
  };
};

const sortPages = (a: ContentPage, b: ContentPage): number => {
  if (a.meta.order !== b.meta.order) return a.meta.order - b.meta.order;
  return a.meta.title.localeCompare(b.meta.title);
};

export const pages = Object.entries(modules).map(toPage).sort(sortPages);

export const visiblePages = pages.filter((page) => !page.meta.hide);

export const findPage = (slug: string): ContentPage | undefined => {
  const normalized = normalizeSlug(slug);
  return pages.find((page) => page.slug === normalized);
};

export const routeDepth = (slug: string): number => normalizeSlug(slug).split("/").filter(Boolean).length;

export const parentSlug = (slug: string): string => {
  const parts = normalizeSlug(slug).split("/").filter(Boolean);
  if (parts.length <= 1) return "/";
  return `/${parts.slice(0, -1).join("/")}/`;
};

export const childrenOf = (slug: string): ContentPage[] => {
  const normalized = normalizeSlug(slug);
  const depth = routeDepth(normalized);
  return visiblePages
    .filter((page) => page.slug !== normalized && page.slug.startsWith(normalized) && routeDepth(page.slug) === depth + 1)
    .sort(sortPages);
};

export const siblingsOf = (slug: string): ContentPage[] => {
  const parent = parentSlug(slug);
  return visiblePages
    .filter((page) => parentSlug(page.slug) === parent && page.slug !== "/")
    .sort(sortPages);
};

export const pagesUnder = (slug: string): ContentPage[] => {
  const normalized = normalizeSlug(slug);
  return visiblePages
    .filter((page) => page.slug !== normalized && page.slug.startsWith(normalized))
    .sort(sortPages);
};
