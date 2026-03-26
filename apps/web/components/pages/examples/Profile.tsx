"use client";

import { useState } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

function ProfileApp() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className={`w-9 h-5 rounded-full transition-colors ${on ? "bg-zinc-900" : "bg-zinc-200"}`}>
      <span className={`block w-3 h-3 bg-white rounded-full shadow transition-transform mx-1 ${on ? "translate-x-4" : "translate-x-0"}`} />
    </button>
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 bg-white border border-zinc-200 rounded-xl p-5">
        <div className="w-12 h-12 rounded-full bg-zinc-200 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-900">홍길동</p>
          <p className="text-xs text-zinc-400">hello@example.com</p>
        </div>
        <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50">수정</button>
      </div>
      <div className="bg-white border border-zinc-200 rounded-xl divide-y divide-zinc-100 overflow-hidden">
        {[
          { label: "알림 수신", desc: "새 소식을 알려드려요", on: notifications, toggle: () => setNotifications(!notifications) },
          { label: "마케팅 수신", desc: "프로모션 정보를 보내드려요", on: marketing, toggle: () => setMarketing(!marketing) },
        ].map(({ label, desc, on, toggle }) => (
          <div key={label} className="flex items-center justify-between px-5 py-4">
            <div><p className="text-sm text-zinc-700">{label}</p><p className="text-xs text-zinc-400">{desc}</p></div>
            <Toggle on={on} onToggle={toggle} />
          </div>
        ))}
      </div>
      <button className="px-4 py-2 text-sm font-medium rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition-colors">로그아웃</button>
    </div>
  );
}

export function ExampleProfile() {
  return (
    <PageShell title="Profile Settings" description="사용자 프로필 및 알림 설정 화면이에요.">
      <Section title="미리보기">
        <PreviewBox>
          <ProfileApp />
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
