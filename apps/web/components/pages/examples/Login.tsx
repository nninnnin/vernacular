"use client";

import { useState } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

function LoginApp() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <div className="w-10 h-10 bg-zinc-900 rounded-xl mx-auto mb-3" />
        <h2 className="text-base font-semibold text-zinc-900">로그인</h2>
        <p className="text-xs text-zinc-400 mt-0.5">계속하려면 로그인하세요</p>
      </div>
      <form className="flex flex-col gap-3 w-full max-w-xs bg-white border border-zinc-200 rounded-xl p-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-600">이메일</label>
          <input type="email" className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="hello@example.com" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-600">비밀번호</label>
          <input type="password" className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="••••••••" />
        </div>
        <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors mt-1">로그인</button>
        <button type="button" className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors">Google로 계속하기</button>
        <p className="text-center text-xs text-zinc-400">계정이 없으신가요? <span className="text-zinc-700 cursor-pointer underline">가입하기</span></p>
      </form>
    </div>
  );
}

export function ExampleLogin() {
  return (
    <PageShell title="Login" description="이메일/비밀번호 로그인 화면이에요.">
      <Section title="미리보기">
        <PreviewBox>
          <LoginApp />
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
