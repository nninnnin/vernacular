"use client";

import { useState } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

function MultiForm() {
  return (
    <form className="flex flex-col gap-4 bg-white border border-zinc-200 rounded-xl p-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-600">이름</label>
          <input className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="홍길동" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-600">생년월일</label>
          <input type="date" className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-600">이메일</label>
        <input type="email" className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="hello@example.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-600">직군</label>
        <select className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-white">
          <option>디자이너</option><option>개발자</option><option>기획자</option><option>기타</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-600">소개</label>
        <textarea rows={3} className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all resize-none" placeholder="간단히 소개해주세요" />
      </div>
      <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 accent-zinc-900" />
        이용약관에 동의합니다
      </label>
      <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors">제출하기</button>
    </form>
  );
}

export function ExampleMultiForm() {
  return (
    <PageShell title="Multi-field Form" description="여러 필드를 가진 입력 폼이에요.">
      <Section title="미리보기">
        <PreviewBox>
          <MultiForm />
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
