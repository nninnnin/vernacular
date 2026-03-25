import { PageShell, Section, PreviewBox } from "@/components/PageShell";

const colors = [
  { name: "Primary", value: "#0066FF" },
  { name: "Neutral", value: "#71717A" },
  { name: "Success", value: "#22C55E" },
  { name: "Warning", value: "#F59E0B" },
  { name: "Error", value: "#EF4444" },
];

export function FoundationColors() {
  return (
    <PageShell title="색상" description="브랜드와 의미를 담은 색상 시스템이에요.">
      <Section title="팔레트">
        <div className="grid grid-cols-5 gap-3">
          {colors.map(({ name, value }) => (
            <div key={name} className="flex flex-col gap-2">
              <div
                className="h-16 rounded-lg border border-zinc-200"
                style={{ backgroundColor: value }}
              />
              <div>
                <p className="text-xs font-medium text-zinc-700">{name}</p>
                <p className="text-xs text-zinc-400">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
