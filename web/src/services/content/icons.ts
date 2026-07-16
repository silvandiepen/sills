import type { ContentPage } from "../../types/content";

const sectionIcons: Record<string, string> = {
  "Accessibility": "ui/accessibility-person",
  "Auditing": "wayfinding/security-check",
  "Brand": "ui/star-m",
  "Content": "ui/edit-line",
  "Design": "media/color-swatches",
  "Documentation": "ui/book",
  "Getting started": "ui/flag-golf",
  "Performance": "ui/performance-2",
  "Quality": "ui/check-m",
  "Security": "misc/shield-check",
  "SEO": "media/website",
  "Support": "ui/talk-star",
};

const slugIcons: Record<string, string> = {
  "/getting-started/": "ui/flag-golf",
  "/skills/": "ui/folder-star",
  "/documentation/": "ui/book-pages",
  "/documentation/examples/": "ui/file-code",
  "/support/": "ui/talk-star",
  "/understanding-reports/": "misc/graph-up-round",
};

const titleIcons: Array<[RegExp, string]> = [
  [/accessibility/i, "ui/accessibility-person"],
  [/architecture|codebase/i, "misc/branch-3"],
  [/brand/i, "ui/star-m"],
  [/changed-code/i, "ui/file-code"],
  [/content/i, "ui/edit-line"],
  [/design/i, "media/color-swatches"],
  [/full audit/i, "ui/folder-star"],
  [/performance/i, "ui/performance-2"],
  [/product experience|web product/i, "media/website"],
  [/security/i, "misc/shield-check"],
  [/seo/i, "media/website"],
  [/visual/i, "media/image"],
];

export const iconForPage = (page: ContentPage): string => {
  const byTitle = titleIcons.find(([pattern]) => pattern.test(page.meta.title));
  return slugIcons[page.slug] ?? byTitle?.[1] ?? sectionIcons[page.meta.section] ?? "ui/file-code";
};
