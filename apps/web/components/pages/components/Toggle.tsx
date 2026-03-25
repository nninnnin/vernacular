"use client";

import { useState } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

function ToggleSwitch({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-10 h-6 rounded-full transition-colors ${on ? "bg-zinc-900" : "bg-zinc-200"}`}
    >
      <span
        className={`block w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${on ? "translate-x-4" : "translate-x-0"}`}
      />
    </button>
  );
}

export function ComponentToggle() {
  return (
    <PageShell title="Toggle" description="켜고 끄는 스위치예요.">
      <Section title="미리보기">
        <PreviewBox>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 text-sm text-zinc-700">
              <ToggleSwitch defaultOn={true} />
              켜짐
            </label>
            <label className="flex items-center gap-3 text-sm text-zinc-700">
              <ToggleSwitch defaultOn={false} />
              꺼짐
            </label>
          </div>
        </PreviewBox>
      </Section>
      <Section title="코드">
        <pre className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 overflow-x-auto leading-relaxed">
          <code>{`<button className="w-10 h-6 rounded-full bg-zinc-900">
  <span className="block w-4 h-4 bg-white rounded-full shadow translate-x-4" />
</button>`}</code>
        </pre>
      </Section>
    </PageShell>
  );
}
