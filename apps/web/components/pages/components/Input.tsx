import { PageShell, Section, PreviewBox } from "@/components/PageShell";

export function ComponentInput() {
  return (
    <PageShell title="Input" description="텍스트를 입력받는 필드예요.">
      <Section title="미리보기">
        <PreviewBox>
          <input className="px-3 py-2 text-sm border border-zinc-200 rounded-md bg-white text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all w-48" placeholder="기본 입력" />
          <input className="px-3 py-2 text-sm border border-zinc-200 rounded-md bg-zinc-50 text-zinc-400 w-48" placeholder="비활성화" disabled />
          <input className="px-3 py-2 text-sm border border-red-400 rounded-md bg-white text-zinc-900 outline-none w-48" placeholder="오류 상태" />
        </PreviewBox>
      </Section>
      <Section title="코드">
        <pre className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 overflow-x-auto leading-relaxed">
          <code>{`<input
  className="px-3 py-2 text-sm border border-zinc-200 rounded-md"
  placeholder="입력하세요"
/>`}</code>
        </pre>
      </Section>
    </PageShell>
  );
}
