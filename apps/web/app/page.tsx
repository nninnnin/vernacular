"use client";

import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors shrink-0"
    >
      {copied ? "복사됨" : "복사"}
    </button>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-zinc-950 px-5 py-4">
      <code className="text-xs text-zinc-100 font-mono">{code}</code>
      <CopyButton text={code} />
    </div>
  );
}

export default function Home() {
  const [username] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("vernacular:user");
      if (stored) return JSON.parse(stored).name ?? null;
    } catch {}
    return null;
  });

  const pkgName = username ? `@vrnclr/${username}` : "@vrnclr/[username]";
  const registryLine = `@vrnclr:registry=https://vernacular-seven.vercel.app/api/registry`;

  return (
    <div className="max-w-2xl mx-auto px-10 py-12 flex flex-col gap-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          {username ? (
            <>
              <span className="text-zinc-400">@vrnclr/</span>
              {username}
            </>
          ) : (
            "Vernacular"
          )}
        </h1>
        <p className="text-sm text-zinc-500">
          나만의 디자인 시스템 토큰을 npm 패키지로 받아 사용할 수 있어요.
          컨트롤 패널에서 시드 값을 조정하면 토큰이 업데이트돼요.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            1. 레지스트리 설정
          </p>
          <p className="text-sm text-zinc-500">
            프로젝트 루트의 <code className="px-1 py-0.5 rounded bg-zinc-100 text-zinc-800 text-xs font-mono">.npmrc</code> 파일에 추가하세요.
          </p>
          <CodeBlock code={registryLine} />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            2. 패키지 설치
          </p>
          <p className="text-sm text-zinc-500">
            {username
              ? `${pkgName} 패키지를 설치하면 현재 토큰 값이 포함된 패키지를 받을 수 있어요.`
              : "로그인하면 나만의 패키지 이름이 생성돼요."}
          </p>
          <CodeBlock code={`npm install ${pkgName}`} />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            3. 사용
          </p>
          <p className="text-sm text-zinc-500">
            패키지에서 토큰을 import해서 사용하세요.
          </p>
          <div className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 leading-relaxed font-mono">
            <p><span className="text-zinc-500">{`// ES Module`}</span></p>
            <p>{`import { tokens } from '${pkgName}';`}</p>
            <p className="mt-3"><span className="text-zinc-500">{`// CommonJS`}</span></p>
            <p>{`const { tokens } = require('${pkgName}');`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
