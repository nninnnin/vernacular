import { PageShell, Section } from "@/components/PageShell";

const shadows = [
  { name: "sm", value: "0 1px 2px rgba(0,0,0,0.05)" },
  { name: "md", value: "0 4px 6px rgba(0,0,0,0.07)" },
  { name: "lg", value: "0 10px 15px rgba(0,0,0,0.1)" },
  { name: "xl", value: "0 20px 25px rgba(0,0,0,0.1)" },
];

export function FoundationShadows() {
  return (
    <PageShell title="그림자" description="깊이와 층위를 표현하는 그림자 시스템이에요.">
      <Section title="스케일">
        <div className="grid grid-cols-4 gap-6">
          {shadows.map(({ name, value }) => (
            <div key={name} className="flex flex-col gap-4 items-center">
              <div
                className="w-full h-20 bg-white rounded-xl"
                style={{ boxShadow: value }}
              />
              <span className="text-xs text-zinc-400">{name}</span>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
