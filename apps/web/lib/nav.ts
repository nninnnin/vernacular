export type NavItem = {
  label: string;
  slug: string;
};

export type NavGroup = {
  label: string;
  category: string;
  items: NavItem[];
};

export const nav: NavGroup[] = [
  {
    label: "기초",
    category: "foundation",
    items: [
      { label: "색상", slug: "colors" },
      { label: "타이포그래피", slug: "typography" },
      { label: "간격", slug: "spacing" },
      { label: "그림자", slug: "shadows" },
      { label: "둥근 모서리", slug: "radius" },
    ],
  },
  {
    label: "컴포넌트",
    category: "components",
    items: [
      { label: "Button", slug: "button" },
      { label: "Input", slug: "input" },
      { label: "Badge", slug: "badge" },
      { label: "Card", slug: "card" },
      { label: "Select", slug: "select" },
      { label: "Checkbox", slug: "checkbox" },
      { label: "Toggle", slug: "toggle" },
      { label: "Dropdown Menu", slug: "dropdown-menu" },
    ],
  },
  {
    label: "패턴",
    category: "patterns",
    items: [
      { label: "Form", slug: "form" },
      { label: "Segmented Control", slug: "segmented-control" },
      { label: "Modal", slug: "modal" },
      { label: "Toast", slug: "toast" },
    ],
  },
];
