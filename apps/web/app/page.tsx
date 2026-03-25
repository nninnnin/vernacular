"use client";

import { ModalDemo } from "@/components/pages/patterns/Modal";
import { ToastDemo } from "@/components/pages/patterns/Toast";

function FormDemo() {
  return (
    <form className="flex flex-col gap-4 w-72" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-700">이름</label>
        <input className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="홍길동" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-700">이메일</label>
        <input type="email" className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="hello@example.com" />
      </div>
      <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors">제출</button>
    </form>
  );
}

function NavigationDemo() {
  return (
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
  );
}

export default function Home() {
  return (
    <div className="min-h-full flex items-center justify-center bg-zinc-50 p-12">
      <div className="flex flex-col gap-4 w-full max-w-lg">
        {[
          { label: "Navigation", Demo: NavigationDemo },
          { label: "Form", Demo: FormDemo },
          { label: "Modal", Demo: ModalDemo },
          { label: "Toast", Demo: ToastDemo },
        ].map(({ label, Demo }) => (
          <div key={label} className="bg-white rounded-2xl border border-zinc-200 p-8 flex flex-col gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">{label}</span>
            <Demo />
          </div>
        ))}
      </div>
    </div>
  );
}
