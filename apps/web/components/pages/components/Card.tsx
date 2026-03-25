import { PageShell, Section, PreviewBox } from "@/components/PageShell";

export function ComponentCard() {
  return (
    <PageShell title="Card" description="관련 정보를 하나의 컨테이너로 묶어요.">
      <Section title="미리보기">
        <PreviewBox>
          <div className="bg-white rounded-xl border border-zinc-200 p-5 w-64 flex flex-col gap-3">
            <div className="w-full h-32 bg-zinc-100 rounded-lg" />
            <div>
              <p className="text-sm font-semibold text-zinc-900">카드 제목</p>
              <p className="text-xs text-zinc-500 mt-1">카드에 들어가는 설명 텍스트예요.</p>
            </div>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-white w-fit">액션</button>
          </div>
        </PreviewBox>
      </Section>
      <Section title="코드">
        <pre className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 overflow-x-auto leading-relaxed">
          <code>{`<div className="bg-white rounded-xl border border-zinc-200 p-5">
  <p className="text-sm font-semibold">카드 제목</p>
</div>`}</code>
        </pre>
      </Section>
    </PageShell>
  );
}
