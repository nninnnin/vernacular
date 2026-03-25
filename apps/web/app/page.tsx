"use client";

import { useState, useEffect } from "react";


type Status = "완료" | "진행중" | "검토필요" | "미시작";
type Category = "기초" | "컴포넌트" | "패턴";
type Filter = "전체" | Status;

type Component = {
  id: number;
  name: string;
  category: Category;
  status: Status;
  notes: string;
};

const statusColors: Record<Status, string> = {
  완료: "bg-green-100 text-green-700",
  진행중: "bg-blue-100 text-blue-700",
  검토필요: "bg-yellow-100 text-yellow-700",
  미시작: "bg-zinc-100 text-zinc-400",
};

const initialComponents: Component[] = [
  { id: 1, name: "색상", category: "기초", status: "완료", notes: "Primary, Semantic 정의 완료" },
  { id: 2, name: "타이포그래피", category: "기초", status: "완료", notes: "스케일 7단계 정의" },
  { id: 3, name: "간격", category: "기초", status: "진행중", notes: "기본 스케일만 있음" },
  { id: 4, name: "그림자", category: "기초", status: "검토필요", notes: "다크모드 대응 필요" },
  { id: 5, name: "둥근 모서리", category: "기초", status: "미시작", notes: "" },
  { id: 6, name: "Button", category: "컴포넌트", status: "완료", notes: "4가지 변형 구현" },
  { id: 7, name: "Input", category: "컴포넌트", status: "완료", notes: "" },
  { id: 8, name: "Badge", category: "컴포넌트", status: "진행중", notes: "사이즈 변형 미완" },
  { id: 9, name: "Card", category: "컴포넌트", status: "검토필요", notes: "레이아웃 재검토 필요" },
  { id: 10, name: "Select", category: "컴포넌트", status: "미시작", notes: "" },
  { id: 11, name: "Checkbox", category: "컴포넌트", status: "미시작", notes: "" },
  { id: 12, name: "Toggle", category: "컴포넌트", status: "미시작", notes: "" },
  { id: 13, name: "Form", category: "패턴", status: "진행중", notes: "유효성 검사 미완" },
  { id: 14, name: "Navigation", category: "패턴", status: "미시작", notes: "" },
  { id: 15, name: "Modal", category: "패턴", status: "완료", notes: "" },
  { id: 16, name: "Toast", category: "패턴", status: "미시작", notes: "" },
];

function Toast({ message, type, onClose }: { message: string; type: "success" | "error" | "warning"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = { success: "bg-green-500", error: "bg-red-500", warning: "bg-yellow-500" };

  return (
    <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg text-white text-sm font-medium shadow-lg ${colors[type]} flex items-center gap-3 z-50`}>
      {message}
      <button onClick={onClose} className="opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

function DetailModal({ item, onClose, onSave }: { item: Component; onClose: () => void; onSave: (updated: Component) => void }) {
  const [notes, setNotes] = useState(item.notes);
  const [status, setStatus] = useState<Status>(item.status);
  const statuses: Status[] = ["미시작", "진행중", "검토필요", "완료"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl border border-zinc-200 p-6 w-80 flex flex-col gap-5 shadow-xl">
        <div>
          <p className="text-xs text-zinc-400 mb-1">{item.category}</p>
          <h3 className="text-base font-semibold text-zinc-900">{item.name}</h3>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-600">상태</label>
          <div className="flex gap-2 flex-wrap">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${status === s ? statusColors[s] : "bg-zinc-100 text-zinc-400"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-600">메모</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all resize-none"
            placeholder="메모를 남겨요"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50">취소</button>
          <button onClick={() => { onSave({ ...item, status, notes }); onClose(); }} className="px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700">저장</button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [items, setItems] = useState<Component[]>(initialComponents);
  const [filter, setFilter] = useState<Filter>("전체");
  const [search, setSearch] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [selected, setSelected] = useState<Component | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "warning") => setToast({ message, type });

  const saveItem = (updated: Component) => {
    setItems((prev) => prev.map((x) => x.id === updated.id ? updated : x));
    showToast("저장됐어요", "success");
  };

  const filters: Filter[] = ["전체", "완료", "진행중", "검토필요", "미시작"];
  const categories: Category[] = ["기초", "컴포넌트", "패턴"];

  const filtered = items.filter((item) => {
    if (!showCompleted && item.status === "완료") return false;
    if (filter !== "전체" && item.status !== filter) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const completedCount = items.filter((x) => x.status === "완료").length;
  const progress = Math.round((completedCount / items.length) * 100);

  return (
    <div className="min-h-full bg-zinc-50 font-sans">
      <main className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
        {/* Summary card */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-semibold text-zinc-900">내 디자인 시스템</h1>
              <p className="text-xs text-zinc-400 mt-0.5">{items.length}개 항목 중 {completedCount}개 완료</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">완료 숨기기</span>
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className={`w-9 h-5 rounded-full transition-colors ${showCompleted ? "bg-zinc-200" : "bg-zinc-900"}`}
              >
                <span className={`block w-3 h-3 bg-white rounded-full shadow transition-transform mx-1 ${showCompleted ? "translate-x-0" : "translate-x-4"}`} />
              </button>
            </div>
          </div>
          <div className="w-full bg-zinc-100 rounded-full h-1.5">
            <div className="bg-zinc-900 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex gap-3">
            {(["완료", "진행중", "검토필요", "미시작"] as Status[]).map((s) => {
              const count = items.filter((x) => x.status === s).length;
              return (
                <span key={s} className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[s]}`}>
                  {s} {count}
                </span>
              );
            })}
          </div>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-md bg-white outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
            placeholder="컴포넌트 검색"
          />
          <nav className="flex items-center gap-1 bg-white border border-zinc-200 rounded-lg p-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-colors ${filter === f ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"}`}
              >
                {f}
              </button>
            ))}
          </nav>
        </div>

        {/* Component list by category */}
        {categories.map((cat) => {
          const catItems = filtered.filter((x) => x.category === cat);
          if (catItems.length === 0) return null;
          return (
            <div key={cat} className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 px-1">{cat}</p>
              {catItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="bg-white rounded-xl border border-zinc-200 px-4 py-3 flex items-center gap-3 hover:border-zinc-300 transition-colors text-left w-full"
                >
                  <span className="flex-1 text-sm text-zinc-700 font-medium">{item.name}</span>
                  {item.notes && (
                    <span className="text-xs text-zinc-400 truncate max-w-32 hidden sm:block">{item.notes}</span>
                  )}
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full shrink-0 ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                </button>
              ))}
            </div>
          );
        })}
      </main>

      {/* Detail modal */}
      {selected && (
        <DetailModal item={selected} onClose={() => setSelected(null)} onSave={saveItem} />
      )}

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
