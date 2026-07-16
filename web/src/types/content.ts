export interface PageMeta {
  title: string;
  description: string;
  slug: string;
  section: string;
  order: number;
  archive?: string;
  archiveTitle?: string;
  hide?: boolean;
  menuChildren?: boolean;
}

export interface ContentPage {
  meta: PageMeta;
  slug: string;
  markdown: string;
  sourcePath: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}
