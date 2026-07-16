import type { NavigationLink } from "../../types/content";

export interface FooterGroup {
  title: string;
  links: NavigationLink[];
}

export interface SiteFooterProps {
  groups: FooterGroup[];
}
