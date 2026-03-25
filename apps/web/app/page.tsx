import Sidebar from "@/components/Sidebar";
import ComponentPreview from "@/components/ComponentPreview";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-white text-zinc-900 font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <ComponentPreview />
      </main>
    </div>
  );
}
