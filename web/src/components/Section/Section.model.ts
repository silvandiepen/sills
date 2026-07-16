export type SectionColor =
  | "background"
  | "blue"
  | "cream"
  | "dark"
  | "green"
  | "green-dark"
  | "ink"
  | "light"
  | "pink"
  | "yellow";

export interface SectionProps {
  color?: SectionColor;
}
