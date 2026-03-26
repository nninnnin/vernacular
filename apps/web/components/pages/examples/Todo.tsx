"use client";

import { useState } from "react";
import { PageShell, Section, PreviewBox } from "@/components/PageShell";

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
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="새 항목 추가" />
        <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors">추가</button>
      </form>
      <div className="flex flex-col gap-1.5">
        {todos.map((todo) => (
          <label key={todo.id} className="flex items-center gap-3 px-3 py-2.5 bg-white border border-zinc-100 rounded-lg cursor-pointer hover:border-zinc-200 transition-colors">
            <input type="checkbox" checked={todo.done} onChange={() => setTodos((t) => t.map((x) => x.id === todo.id ? { ...x, done: !x.done } : x))} className="w-4 h-4 accent-zinc-900" />
            <span className={`text-sm flex-1 ${todo.done ? "line-through text-zinc-400" : "text-zinc-700"}`}>{todo.text}</span>
            {todo.done && <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-green-100 text-green-700">완료</span>}
          </label>
        ))}
      </div>
    </div>
  );
}

export function ExampleTodo() {
  return (
    <PageShell title="Todo App" description="체크리스트 형태의 할 일 관리 앱이에요.">
      <Section title="미리보기">
        <PreviewBox>
          <TodoApp />
        </PreviewBox>
      </Section>
    </PageShell>
  );
}
