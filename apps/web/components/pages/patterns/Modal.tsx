"use client";

import { useState } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
      >
        모달 열기
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-xl border border-zinc-200 p-6 w-80 flex flex-col gap-4 shadow-xl">
            <h3 className="text-sm font-semibold text-zinc-900">모달 제목</h3>
            <p className="text-sm text-zinc-500">모달 안에 들어가는 내용이에요. 중요한 정보나 액션을 담아요.</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50">취소</button>
              <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-white">확인</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function PatternModal() {
  return (
    <PageShell title="Modal" description="집중이 필요한 상호작용을 오버레이로 표시해요.">
      <Section title="미리보기">
        <PreviewBox>
          <ModalDemo />
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
