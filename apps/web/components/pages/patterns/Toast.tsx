"use client";

import { useState } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

export function ToastDemo() {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: string }[]>([]);
  let id = 0;

  const show = (message: string, type: string) => {
    const newId = ++id;
    setToasts((t) => [...t, { id: newId, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== newId)), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <button onClick={() => show("저장됐어요", "success")} className="px-3 py-1.5 text-xs font-medium rounded-md bg-green-500 text-white">성공</button>
        <button onClick={() => show("문제가 생겼어요", "error")} className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-500 text-white">오류</button>
        <button onClick={() => show("확인이 필요해요", "warning")} className="px-3 py-1.5 text-xs font-medium rounded-md bg-yellow-500 text-white">경고</button>
      </div>
      <div className="flex flex-col gap-2 w-64">
        {toasts.map(({ id, message, type }) => (
          <div key={id} className={`px-4 py-3 rounded-lg text-xs font-medium text-white ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-yellow-500"}`}>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PatternToast() {
  return (
    <PageShell title="Toast" description="짧고 일시적인 피드백 메시지예요.">
      <Section title="미리보기">
        <PreviewBox>
          <ToastDemo />
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
