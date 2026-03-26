"use client";

import { useState } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

function NotificationApp() {
  const [items, setItems] = useState([
    { id: 1, title: "새 댓글", desc: "홍길동님이 댓글을 남겼어요", time: "방금", read: false, type: "info" },
    { id: 2, title: "업데이트 완료", desc: "디자인 시스템이 업데이트됐어요", time: "5분 전", read: false, type: "success" },
    { id: 3, title: "결제 실패", desc: "카드 정보를 확인해주세요", time: "1시간 전", read: true, type: "error" },
    { id: 4, title: "초대장 도착", desc: "프로젝트에 초대됐어요", time: "어제", read: true, type: "info" },
  ]);
  const typeColors: Record<string, string> = { info: "bg-blue-100 text-blue-600", success: "bg-green-100 text-green-600", error: "bg-red-100 text-red-600" };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-zinc-700">알림</span>
        <button onClick={() => setItems((i) => i.map((x) => ({ ...x, read: true })))} className="text-xs text-zinc-400 hover:text-zinc-600">모두 읽음</button>
      </div>
      {items.map((item) => (
        <div key={item.id} onClick={() => setItems((i) => i.map((x) => x.id === item.id ? { ...x, read: true } : x))} className={`flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${item.read ? "bg-white border-zinc-100" : "bg-zinc-50 border-zinc-200"}`}>
          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.read ? "bg-zinc-200" : "bg-zinc-900"}`} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-800">{item.title}</p>
            <p className="text-xs text-zinc-400 mt-0.5 truncate">{item.desc}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-[10px] text-zinc-300">{item.time}</span>
            <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${typeColors[item.type]}`}>{item.type}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ExampleNotification() {
  return (
    <PageShell title="Notification Center" description="읽음/안읽음 상태를 가진 알림 목록이에요.">
      <Section title="미리보기">
        <PreviewBox>
          <NotificationApp />
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
