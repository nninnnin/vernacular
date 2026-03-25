"use client";

import { useState } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

export function SegmentedControlDemo({ items }: { items: string[] }) {
  const [selected, setSelected] = useState(items[0]);
  return (
    <div className="flex items-center gap-1 bg-zinc-100 border border-zinc-200 rounded-lg p-1">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setSelected(item)}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            selected === item ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function PatternSegmentedControl() {
  return (
    <PageShell title="Segmented Control" description="여러 옵션 중 하나를 선택하는 컨트롤이에요.">
      <Section title="미리보기">
        <PreviewBox>
          <SegmentedControlDemo items={["홈", "탐색", "라이브러리", "설정"]} />
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
