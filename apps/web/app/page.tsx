import { FoundationColors } from "@/components/pages/foundation/Colors";
import { FoundationTypography } from "@/components/pages/foundation/Typography";
import { FoundationSpacing } from "@/components/pages/foundation/Spacing";
import { FoundationShadows } from "@/components/pages/foundation/Shadows";
import { FoundationRadius } from "@/components/pages/foundation/Radius";
import { ComponentButton } from "@/components/pages/components/Button";
import { ComponentInput } from "@/components/pages/components/Input";
import { ComponentBadge } from "@/components/pages/components/Badge";
import { ComponentCard } from "@/components/pages/components/Card";
import { ComponentSelect } from "@/components/pages/components/Select";
import { ComponentCheckbox } from "@/components/pages/components/Checkbox";
import { ComponentToggle } from "@/components/pages/components/Toggle";
import { PatternForm } from "@/components/pages/patterns/Form";
import { PatternNavigation } from "@/components/pages/patterns/Navigation";
import { PatternModal } from "@/components/pages/patterns/Modal";
import { PatternToast } from "@/components/pages/patterns/Toast";

const sections = [
  { label: "색상", Component: FoundationColors },
  { label: "타이포그래피", Component: FoundationTypography },
  { label: "간격", Component: FoundationSpacing },
  { label: "그림자", Component: FoundationShadows },
  { label: "둥근 모서리", Component: FoundationRadius },
  { label: "Button", Component: ComponentButton },
  { label: "Input", Component: ComponentInput },
  { label: "Badge", Component: ComponentBadge },
  { label: "Card", Component: ComponentCard },
  { label: "Select", Component: ComponentSelect },
  { label: "Checkbox", Component: ComponentCheckbox },
  { label: "Toggle", Component: ComponentToggle },
  { label: "Form", Component: PatternForm },
  { label: "Navigation", Component: PatternNavigation },
  { label: "Modal", Component: PatternModal },
  { label: "Toast", Component: PatternToast },
];

export default function Home() {
  return (
    <div className="divide-y divide-zinc-100">
      {sections.map(({ label, Component }) => (
        <div key={label}>
          <Component />
        </div>
      ))}
    </div>
  );
}
