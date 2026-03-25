import { PageShell, Section } from "@/components/PageShell";

const scale = [
  { name: "1", value: "4px" },
  { name: "2", value: "8px" },
  { name: "3", value: "12px" },
  { name: "4", value: "16px" },
  { name: "6", value: "24px" },
  { name: "8", value: "32px" },
  { name: "12", value: "48px" },
  { name: "16", value: "64px" },
];

export function FoundationSpacing() {
  return (
    <PageShell title="간격" description="레이아웃과 컴포넌트의 숨결을 결정해요.">
      <Section title="스케일">
        <div className="flex flex-col divide-y divide-zinc-100 rounded-xl border border-zinc-200 overflow-hidden">
          {scale.map(({ name, value }) => (
            <div key={name} className="flex items-center gap-6 px-5 py-3 bg-white">
              <span className="text-xs text-zinc-400 w-6">{name}</span>
              <span className="text-xs text-zinc-300 w-10">{value}</span>
              <div
                className="bg-blue-200 h-4 rounded"
                style={{ width: value }}
              />
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
