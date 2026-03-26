import zlib from "node:zlib";
import crypto from "node:crypto";

// ─── Minimal tar builder ───────────────────────────────────────────────────

function tarHeader(name: string, size: number): Buffer {
  const buf = Buffer.alloc(512, 0);

  buf.write(name.slice(0, 100), 0);
  buf.write("0000755\0", 100);
  buf.write("0000000\0", 108);
  buf.write("0000000\0", 116);
  buf.write(size.toString(8).padStart(11, "0") + "\0", 124);
  buf.write(
    Math.floor(Date.now() / 1000)
      .toString(8)
      .padStart(11, "0") + "\0",
    136
  );
  buf.fill(32, 148, 156); // checksum: spaces as placeholder
  buf.write("0", 156);    // typeflag: regular file
  buf.write("ustar\0", 257);
  buf.write("00", 263);

  let checksum = 0;
  for (let i = 0; i < 512; i++) checksum += buf[i];
  buf.write(checksum.toString(8).padStart(6, "0") + "\0 ", 148);

  return buf;
}

function tarEntry(name: string, content: Buffer): Buffer {
  const header = tarHeader(name, content.length);
  const padding = Buffer.alloc((512 - (content.length % 512)) % 512, 0);
  return Buffer.concat([header, content, padding]);
}

// ─── Package builder ──────────────────────────────────────────────────────

export function buildPackageTarball(
  username: string,
  version: string,
  tokens: Record<string, unknown>
): { tarball: Buffer; shasum: string } {
  const pkgName = `@vrnclr/${username}`;

  const packageJson = Buffer.from(
    JSON.stringify(
      {
        name: pkgName,
        version,
        description: `${username}'s Vernacular design system tokens`,
        main: "index.js",
        module: "index.mjs",
        types: "index.d.ts",
      },
      null,
      2
    )
  );

  const cjs = Buffer.from(
    `'use strict';\nObject.defineProperty(exports,'__esModule',{value:true});\nexports.tokens = ${JSON.stringify(tokens, null, 2)};\n`
  );

  const esm = Buffer.from(
    `export const tokens = ${JSON.stringify(tokens, null, 2)};\n`
  );

  const dts = Buffer.from(
    `export declare const tokens: ${JSON.stringify(tokens, null, 2)};\n`
  );

  const tar = Buffer.concat([
    tarEntry("package/package.json", packageJson),
    tarEntry("package/index.js", cjs),
    tarEntry("package/index.mjs", esm),
    tarEntry("package/index.d.ts", dts),
    Buffer.alloc(1024, 0), // end-of-archive
  ]);

  const tarball = zlib.gzipSync(tar);
  const shasum = crypto.createHash("sha1").update(tarball).digest("hex");

  return { tarball, shasum };
}

// ─── Metadata builder ─────────────────────────────────────────────────────

export function buildPackageMetadata(
  username: string,
  version: string,
  shasum: string,
  tarballUrl: string
) {
  const pkgName = `@vrnclr/${username}`;

  return {
    name: pkgName,
    "dist-tags": { latest: version },
    versions: {
      [version]: {
        name: pkgName,
        version,
        description: `${username}'s Vernacular design system tokens`,
        main: "index.js",
        module: "index.mjs",
        types: "index.d.ts",
        dist: { tarball: tarballUrl, shasum },
      },
    },
  };
}

// ─── Version from timestamp ───────────────────────────────────────────────

export function versionFromDate(date: Date): string {
  return `1.0.${Math.floor(date.getTime() / 1000)}`;
}
