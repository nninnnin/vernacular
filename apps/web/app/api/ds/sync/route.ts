import { auth } from "@/auth";
import { db } from "@/db";
import { designSystems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tokens } = await req.json();

  const existing = await db
    .select()
    .from(designSystems)
    .where(eq(designSystems.userId, session.user.id))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(designSystems)
      .set({ tokens, updatedAt: new Date() })
      .where(eq(designSystems.userId, session.user.id));
  } else {
    await db.insert(designSystems).values({
      userId: session.user.id,
      name: "My Design System",
      tokens,
    });
  }

  return NextResponse.json({ ok: true });
}
