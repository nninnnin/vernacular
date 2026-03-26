"use client";

import { useState } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

function DashboardApp() {
  const stats = [
    { label: "총 컴포넌트", value: "24", change: "+3", up: true },
    { label: "완료율", value: "68%", change: "+12%", up: true },
    { label: "검토 필요", value: "5", change: "+2", up: false },
  ];
  const items = [
    { name: "Button", status: "완료", category: "컴포넌트" },
    { name: "Input", status: "완료", category: "컴포넌트" },
    { name: "Modal", status: "진행중", category: "패턴" },
    { name: "Toast", status: "미시작", category: "패턴" },
  ];
  const statusColors: Record<string, string> = { 완료: "bg-green-100 text-green-700", 진행중: "bg-blue-100 text-blue-700", 미시작: "bg-zinc-100 text-zinc-400" };
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, change, up }) => (
          <div key={label} className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col gap-1">
            <span className="text-xs text-zinc-400">{label}</span>
            <span className="text-xl font-semibold text-zinc-900">{value}</span>
            <span className={`text-[10px] font-medium ${up ? "text-green-600" : "text-red-500"}`}>{change}</span>
          </div>
        ))}
      </div>
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100"><span className="text-xs font-medium text-zinc-600">최근 항목</span></div>
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-3 px-4 py-3 border-b border-zinc-50 last:border-0">
            <span className="text-sm text-zinc-700 flex-1">{item.name}</span>
            <span className="text-xs text-zinc-400">{item.category}</span>
            <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[item.status]}`}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExampleDashboard() {
  return (
    <PageShell title="Dashboard" description="통계와 최근 항목을 보여주는 대시보드예요.">
      <Section title="미리보기">
        <PreviewBox>
          <DashboardApp />
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
