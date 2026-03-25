import { PageShell, Section, PreviewBox } from "@/components/PageShell";

export function PatternForm() {
  return (
    <PageShell title="Form" description="사용자 입력을 수집하는 패턴이에요.">
      <Section title="미리보기">
        <PreviewBox>
          <form className="flex flex-col gap-4 w-72" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-700">이름</label>
              <input className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="홍길동" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-700">이메일</label>
              <input type="email" className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="hello@example.com" />
            </div>
            <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors">제출</button>
          </form>
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
