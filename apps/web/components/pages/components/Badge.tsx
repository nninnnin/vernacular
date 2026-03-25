import { PageShell, Section, PreviewBox } from "@/components/PageShell";

export function ComponentBadge() {
  return (
    <PageShell title="Badge" description="상태나 카테고리를 표시하는 레이블이에요.">
      <Section title="미리보기">
        <PreviewBox>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-900 text-white">기본</span>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">정보</span>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">성공</span>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">경고</span>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">오류</span>
        </PreviewBox>
      </Section>
      <Section title="코드">
        <pre className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 overflow-x-auto leading-relaxed">
          <code>{`<span className="px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-900 text-white">
  레이블
</span>`}</code>
        </pre>
      </Section>
    </PageShell>
  );
}
