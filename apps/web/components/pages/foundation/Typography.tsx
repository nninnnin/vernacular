import { PageShell, Section } from "@/components/PageShell";

const scale = [
  { name: "xs", size: "12px", sample: "작은 텍스트" },
  { name: "sm", size: "14px", sample: "보조 텍스트" },
  { name: "base", size: "16px", sample: "본문 텍스트" },
  { name: "lg", size: "18px", sample: "강조 텍스트" },
  { name: "xl", size: "20px", sample: "소제목" },
  { name: "2xl", size: "24px", sample: "제목" },
  { name: "3xl", size: "30px", sample: "큰 제목" },
];

export function FoundationTypography() {
  return (
    <PageShell title="타이포그래피" description="가독성과 위계를 만드는 폰트 시스템이에요.">
      <Section title="스케일">
        <div className="flex flex-col divide-y divide-zinc-100 rounded-xl border border-zinc-200 overflow-hidden">
          {scale.map(({ name, size, sample }) => (
            <div key={name} className="flex items-center gap-6 px-5 py-4 bg-white">
              <span className="text-xs text-zinc-400 w-10">{name}</span>
              <span className="text-xs text-zinc-300 w-10">{size}</span>
              <span style={{ fontSize: size }}>{sample}</span>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
