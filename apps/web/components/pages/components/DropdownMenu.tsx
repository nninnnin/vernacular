"use client";

import { useState, useRef, useEffect } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

type DropdownItem =
  | { type: "item"; label: string; shortcut?: string; disabled?: boolean }
  | { type: "separator" };

function DropdownMenu({
  trigger,
  items,
}: {
  trigger: React.ReactNode;
  items: DropdownItem[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 min-w-40 rounded-lg border border-zinc-200 bg-white shadow-md py-1 text-sm text-zinc-900">
          {items.map((item, i) => {
            if (item.type === "separator") {
              return <div key={i} className="my-1 h-px bg-zinc-100" />;
            }
            return (
              <button
                key={i}
                disabled={item.disabled}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-between gap-4 px-3 py-1.5 text-sm rounded-md cursor-default select-none transition-colors hover:bg-zinc-100 disabled:text-zinc-400 disabled:pointer-events-none"
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span className="text-xs text-zinc-400">{item.shortcut}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const defaultItems: DropdownItem[] = [
  { type: "item", label: "프로필" },
  { type: "item", label: "설정", shortcut: "⌘S" },
  { type: "separator" },
  { type: "item", label: "팀 초대" },
  { type: "item", label: "새 팀", disabled: true },
  { type: "separator" },
  { type: "item", label: "로그아웃", shortcut: "⇧⌘Q" },
];

export function ComponentDropdownMenu() {
  return (
    <PageShell
      title="Dropdown Menu"
      description="트리거를 클릭하면 컨텍스트 메뉴가 나타나요."
    >
      <Section title="미리보기">
        <PreviewBox>
          <DropdownMenu
            trigger={
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 transition-colors">
                메뉴 열기
                <svg
                  className="w-3.5 h-3.5 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            }
            items={defaultItems}
          />
        </PreviewBox>
      </Section>

      <Section title="변형">
        <div className="rounded-xl border border-zinc-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-500">
                  변형
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-500">
                  설명
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {[
                {
                  label: "Default",
                  desc: "기본 메뉴 아이템",
                },
                {
                  label: "Shortcut",
                  desc: "오른쪽에 단축키 힌트 표시",
                },
                {
                  label: "Separator",
                  desc: "아이템 사이 구분선",
                },
                {
                  label: "Disabled",
                  desc: "비활성화된 아이템 (클릭 불가)",
                },
              ].map(({ label, desc }) => (
                <tr key={label}>
                  <td className="px-4 py-3 text-zinc-600 whitespace-nowrap">
                    {label}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="코드">
        <pre className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 overflow-x-auto leading-relaxed">
          <code>{`// 기본 구조
<DropdownMenu>
  <DropdownMenuTrigger>메뉴 열기</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>프로필</DropdownMenuItem>
    <DropdownMenuItem>설정</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem disabled>비활성 항목</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>로그아웃</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}</code>
        </pre>
      </Section>
    </PageShell>
  );
}
