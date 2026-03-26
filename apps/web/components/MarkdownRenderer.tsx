import React from "react";

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldIdx = remaining.indexOf("**");
    const codeIdx = remaining.indexOf("`");
    const linkIdx = remaining.indexOf("[");

    const earliest = Math.min(
      boldIdx >= 0 ? boldIdx : Infinity,
      codeIdx >= 0 ? codeIdx : Infinity,
      linkIdx >= 0 ? linkIdx : Infinity
    );

    if (earliest === Infinity) {
      parts.push(remaining);
      break;
    }

    if (earliest > 0) {
      parts.push(remaining.slice(0, earliest));
      remaining = remaining.slice(earliest);
      continue;
    }

    // Bold: **text**
    if (remaining.startsWith("**")) {
      const end = remaining.indexOf("**", 2);
      if (end > 0) {
        parts.push(
          <strong key={key++} className="font-semibold text-zinc-900">
            {remaining.slice(2, end)}
          </strong>
        );
        remaining = remaining.slice(end + 2);
        continue;
      }
    }

    // Inline code: `code`
    if (remaining.startsWith("`")) {
      const end = remaining.indexOf("`", 1);
      if (end > 0) {
        parts.push(
          <code
            key={key++}
            className="px-1 py-0.5 rounded bg-zinc-100 text-zinc-800 text-xs font-mono"
          >
            {remaining.slice(1, end)}
          </code>
        );
        remaining = remaining.slice(end + 1);
        continue;
      }
    }

    // Link: [text](url)
    if (remaining.startsWith("[")) {
      const textEnd = remaining.indexOf("]");
      if (textEnd > 0 && remaining[textEnd + 1] === "(") {
        const urlEnd = remaining.indexOf(")", textEnd);
        if (urlEnd > 0) {
          const linkText = remaining.slice(1, textEnd);
          const url = remaining.slice(textEnd + 2, urlEnd);
          parts.push(
            <a
              key={key++}
              href={url}
              className="text-zinc-900 underline underline-offset-2 hover:text-zinc-600"
            >
              {linkText}
            </a>
          );
          remaining = remaining.slice(urlEnd + 1);
          continue;
        }
      }
    }

    parts.push(remaining[0]);
    remaining = remaining.slice(1);
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={key++}
          className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 overflow-x-auto leading-relaxed my-4"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      i++;
      continue;
    }

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={key++}
          className="text-2xl font-semibold tracking-tight text-zinc-900 mt-2 mb-1"
        >
          {renderInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="text-base font-semibold text-zinc-900 mt-8 mb-2"
        >
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={key++}
          className="text-sm font-semibold text-zinc-800 mt-6 mb-1"
        >
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      elements.push(<hr key={key++} className="border-zinc-200 my-6" />);
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(
          <li key={i} className="text-sm text-zinc-700 leading-relaxed">
            {renderInline(lines[i].slice(2))}
          </li>
        );
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 my-3">
          {items}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("- ") &&
      lines[i].trim() !== "---"
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(
        <p key={key++} className="text-sm text-zinc-700 leading-relaxed my-3">
          {renderInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return <div className="max-w-2xl">{elements}</div>;
}
