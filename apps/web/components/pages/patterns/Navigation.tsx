import { PageShell, Section, PreviewBox } from "@/components/PageShell";

export function PatternNavigation() {
  return (
    <PageShell title="Navigation" description="사용자가 콘텐츠 사이를 이동하는 패턴이에요.">
      <Section title="미리보기">
        <PreviewBox>
          <nav className="flex items-center gap-1 bg-white border border-zinc-200 rounded-lg p-1 w-full max-w-sm">
            {["홈", "탐색", "라이브러리", "설정"].map((item, i) => (
              <button
                key={item}
                className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${i === 0 ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"}`}
              >
                {item}
              </button>
            ))}
          </nav>
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
