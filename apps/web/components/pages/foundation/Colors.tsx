import { PageShell, Section } from "@/components/PageShell";
import { defaultTokens } from "@/lib/tokens";

const { palette, semantic } = defaultTokens.color;

const scaleSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const semanticEntries = Object.entries(semantic) as [string, string][];

export function FoundationColors() {
  return (
    <PageShell title="색상" description="브랜드와 의미를 담은 색상 시스템이에요.">
      <Section title="팔레트">
        <p className="text-sm text-zinc-500 -mt-1 mb-2">
          Seed에서 자동 생성되는 11단계 스케일이에요. 팔레트를 직접 편집하려면 seed를 바꾸세요.
        </p>
        {(["neutral", "accent"] as const).map((name) => (
          <div key={name} className="mb-4">
            <p className="text-xs font-medium text-zinc-500 mb-2 capitalize">{name}</p>
            <div className="flex gap-1">
              {scaleSteps.map((step) => (
                <div key={step} className="flex flex-col gap-1 flex-1">
                  <div
                    className="h-10 rounded border border-zinc-200"
                    style={{ backgroundColor: palette[name][step] }}
                  />
                  <p className="text-[10px] text-zinc-400 text-center">{step}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="시맨틱">
        <p className="text-sm text-zinc-500 -mt-1 mb-2">
          팔레트에서 역할에 맞게 매핑된 토큰이에요. 컴포넌트가 실제로 참조하는 값들이에요.
        </p>
        <div className="grid grid-cols-4 gap-2">
          {semanticEntries.map(([token, value]) => (
            <div key={token} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded border border-zinc-200 shrink-0"
                style={{ backgroundColor: value }}
              />
              <div>
                <p className="text-xs font-medium text-zinc-700">{token}</p>
                <p className="text-[10px] text-zinc-400">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
