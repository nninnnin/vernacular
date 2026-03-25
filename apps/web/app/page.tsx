"use client";

import { useState } from "react";
import { SegmentedControlDemo } from "@/components/pages/patterns/SegmentedControl";

// 1. 투두 앱
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "디자인 시스템 색상 정의", done: false },
    { id: 2, text: "컴포넌트 구현", done: true },
    { id: 3, text: "문서 작성", done: false },
  ]);
  const [input, setInput] = useState("");
  let nextId = 4;

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos((t) => [...t, { id: nextId++, text: input.trim(), done: false }]);
    setInput("");
  };

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={add} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
          placeholder="새 항목 추가"
        />
        <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors">추가</button>
      </form>
      <div className="flex flex-col gap-1.5">
        {todos.map((todo) => (
          <label key={todo.id} className="flex items-center gap-3 px-3 py-2.5 bg-white border border-zinc-100 rounded-lg cursor-pointer hover:border-zinc-200 transition-colors">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => setTodos((t) => t.map((x) => x.id === todo.id ? { ...x, done: !x.done } : x))}
              className="w-4 h-4 accent-zinc-900"
            />
            <span className={`text-sm flex-1 ${todo.done ? "line-through text-zinc-400" : "text-zinc-700"}`}>{todo.text}</span>
            {todo.done && <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-green-100 text-green-700">완료</span>}
          </label>
        ))}
      </div>
    </div>
  );
}

// 2. 멀티 필드 폼
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
          <option>디자이너</option>
          <option>개발자</option>
          <option>기획자</option>
          <option>기타</option>
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

// 3. 로그인 화면
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

// 4. 알림 센터
function NotificationApp() {
  const [items, setItems] = useState([
    { id: 1, title: "새 댓글", desc: "홍길동님이 댓글을 남겼어요", time: "방금", read: false, type: "info" },
    { id: 2, title: "업데이트 완료", desc: "디자인 시스템이 업데이트됐어요", time: "5분 전", read: false, type: "success" },
    { id: 3, title: "결제 실패", desc: "카드 정보를 확인해주세요", time: "1시간 전", read: true, type: "error" },
    { id: 4, title: "초대장 도착", desc: "프로젝트에 초대됐어요", time: "어제", read: true, type: "info" },
  ]);

  const typeColors: Record<string, string> = {
    info: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
    error: "bg-red-100 text-red-600",
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-zinc-700">알림</span>
        <button onClick={() => setItems((i) => i.map((x) => ({ ...x, read: true })))} className="text-xs text-zinc-400 hover:text-zinc-600">모두 읽음</button>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => setItems((i) => i.map((x) => x.id === item.id ? { ...x, read: true } : x))}
          className={`flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${item.read ? "bg-white border-zinc-100" : "bg-zinc-50 border-zinc-200"}`}
        >
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

// 5. 프로필 설정
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
            <div>
              <p className="text-sm text-zinc-700">{label}</p>
              <p className="text-xs text-zinc-400">{desc}</p>
            </div>
            <Toggle on={on} onToggle={toggle} />
          </div>
        ))}
      </div>
      <button className="px-4 py-2 text-sm font-medium rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition-colors">로그아웃</button>
    </div>
  );
}

// 6. 대시보드
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

  const statusColors: Record<string, string> = {
    완료: "bg-green-100 text-green-700",
    진행중: "bg-blue-100 text-blue-700",
    미시작: "bg-zinc-100 text-zinc-400",
  };

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
        <div className="px-4 py-3 border-b border-zinc-100">
          <span className="text-xs font-medium text-zinc-600">최근 항목</span>
        </div>
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

const tabs = ["투두", "폼", "로그인", "알림", "프로필", "대시보드"];
const apps = [TodoApp, MultiForm, LoginApp, NotificationApp, ProfileApp, DashboardApp];

export default function Home() {
  const [selected, setSelected] = useState(tabs[0]);
  const AppComponent = apps[tabs.indexOf(selected)];

  return (
    <div className="min-h-full bg-zinc-50 p-12 flex flex-col gap-8 items-center">
      <SegmentedControlDemo items={tabs} onSelect={setSelected} selected={selected} />
      <div className="w-full max-w-lg">
        <AppComponent />
      </div>
    </div>
  );
}
