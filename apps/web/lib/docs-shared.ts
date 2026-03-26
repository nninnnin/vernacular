export type DocFile = {
  slug: string[];
  title: string;
  title_en: string;
  dir: string;
};

export const DIR_LABELS: Record<string, string> = {
  principles: "원칙",
  decisions: "결정",
  architecture: "아키텍처",
  "": "일반",
};
