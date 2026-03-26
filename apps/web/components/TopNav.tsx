import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { Button } from "@vernacular/ui";

export default function TopNav() {
  return (
    <header className="h-12 shrink-0 border-b border-zinc-200 bg-white flex items-center justify-between px-5">
      <Link
        href="/"
        className="flex items-center gap-2.5 hover:opacity-70 transition-opacity w-fit"
      >
        <span className="text-base font-semibold tracking-tight font-mono">
          Vernacular
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <Button asAnchor variant="ghost" size="sm">
          <Link href="/documentation" className="font-mono">Docs</Link>
        </Button>
        <UserAvatar />
      </div>
    </header>
  );
}
