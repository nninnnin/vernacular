import { PageShell, Section } from "@/components/PageShell";

const radii = [
  { name: "none", value: "0px" },
  { name: "sm", value: "4px" },
  { name: "md", value: "8px" },
  { name: "lg", value: "16px" },
  { name: "xl", value: "24px" },
  { name: "full", value: "9999px" },
];

export function FoundationRadius() {
  return (
    <PageShell title="둥근 모서리" description="형태의 부드러움을 결정해요.">
      <Section title="스케일">
        <div className="grid grid-cols-6 gap-4">
          {radii.map(({ name, value }) => (
            <div key={name} className="flex flex-col gap-3 items-center">
              <div
                className="w-full h-16 bg-zinc-200"
                style={{ borderRadius: value }}
              />
              <div className="text-center">
                <p className="text-xs font-medium text-zinc-600">{name}</p>
                <p className="text-xs text-zinc-400">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
