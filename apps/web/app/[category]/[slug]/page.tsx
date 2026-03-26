import { nav } from "@/lib/nav";
import { notFound } from "next/navigation";
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
import { ComponentDropdownMenu } from "@/components/pages/components/DropdownMenu";
import { PatternForm } from "@/components/pages/patterns/Form";
import { ExampleTodo } from "@/components/pages/examples/Todo";
import { ExampleMultiForm } from "@/components/pages/examples/MultiForm";
import { ExampleLogin } from "@/components/pages/examples/Login";
import { ExampleNotification } from "@/components/pages/examples/Notification";
import { ExampleProfile } from "@/components/pages/examples/Profile";
import { ExampleDashboard } from "@/components/pages/examples/Dashboard";
import { PatternSegmentedControl } from "@/components/pages/patterns/SegmentedControl";
import { PatternModal } from "@/components/pages/patterns/Modal";
import { PatternToast } from "@/components/pages/patterns/Toast";

const pages: Record<string, Record<string, React.ComponentType>> = {
  foundation: {
    colors: FoundationColors,
    typography: FoundationTypography,
    spacing: FoundationSpacing,
    shadows: FoundationShadows,
    radius: FoundationRadius,
  },
  components: {
    button: ComponentButton,
    input: ComponentInput,
    badge: ComponentBadge,
    card: ComponentCard,
    select: ComponentSelect,
    checkbox: ComponentCheckbox,
    toggle: ComponentToggle,
    "dropdown-menu": ComponentDropdownMenu,
  },
  examples: {
    todo: ExampleTodo,
    "multi-form": ExampleMultiForm,
    login: ExampleLogin,
    notification: ExampleNotification,
    profile: ExampleProfile,
    dashboard: ExampleDashboard,
  },
  patterns: {
    form: PatternForm,
    "segmented-control": PatternSegmentedControl,
    modal: PatternModal,
    toast: PatternToast,
  },
};

export function generateStaticParams() {
  return nav.flatMap(({ category, items }) =>
    items.map(({ slug }) => ({ category, slug }))
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const Component = pages[category]?.[slug];
  if (!Component) notFound();
  return <Component />;
}
