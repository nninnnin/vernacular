const nav = [
  {
    group: "기초",
    items: ["색상", "타이포그래피", "간격", "그림자", "둥근 모서리"],
  },
  {
    group: "컴포넌트",
    items: ["Button", "Input", "Badge", "Card", "Select", "Checkbox", "Toggle"],
  },
  {
    group: "패턴",
    items: ["Form", "Navigation", "Modal", "Toast"],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-zinc-200 overflow-y-auto flex flex-col">
      <div className="px-5 py-5 border-b border-zinc-200">
        <span className="text-sm font-semibold tracking-tight">Vernacular</span>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-6">
        {nav.map(({ group, items }) => (
          <div key={group}>
            <p className="px-2 mb-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              {group}
            </p>
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item}>
                  <button className="w-full text-left px-2 py-1.5 text-sm text-zinc-600 rounded hover:bg-zinc-100 hover:text-zinc-900 transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
