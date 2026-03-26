import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { designSystems } from "@/db/schema";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  buildPackageTarball,
  buildPackageMetadata,
  versionFromDate,
} from "@/lib/npm-registry";

async function getDesignSystem(username: string) {
  const result = await db
    .select({
      tokens: designSystems.tokens,
      updatedAt: designSystems.updatedAt,
    })
    .from(designSystems)
    .innerJoin(users, eq(designSystems.userId, users.id))
    .where(eq(users.name, username))
    .limit(1);

  return result[0] ?? null;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const pathname = decodeURIComponent("/" + slug.join("/"));

  // GET /@vrnclr/toss → package metadata
  const metaMatch = pathname.match(/^\/@vrnclr\/([^/]+)$/);
  if (metaMatch) {
    const username = metaMatch[1];
    const ds = await getDesignSystem(username);
    if (!ds) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const version = versionFromDate(ds.updatedAt ?? new Date());
    const base = new URL(req.url).origin;
    const tarballUrl = `${base}/api/registry/@vrnclr/${username}/-/${username}-${version}.tgz`;
    const { shasum } = buildPackageTarball(
      username,
      version,
      ds.tokens as Record<string, unknown>
    );

    return NextResponse.json(
      buildPackageMetadata(username, version, shasum, tarballUrl)
    );
  }

  // GET /@vrnclr/toss/-/toss-1.0.xxx.tgz → tarball
  const tarballMatch = pathname.match(
    /^\/@vrnclr\/([^/]+)\/-\/[^/]+-(\d+\.\d+\.\d+)\.tgz$/
  );
  if (tarballMatch) {
    const username = tarballMatch[1];
    const ds = await getDesignSystem(username);
    if (!ds) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const version = versionFromDate(ds.updatedAt ?? new Date());
    const { tarball } = buildPackageTarball(
      username,
      version,
      ds.tokens as Record<string, unknown>
    );

    return new NextResponse(tarball, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${username}-${version}.tgz"`,
      },
    });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
