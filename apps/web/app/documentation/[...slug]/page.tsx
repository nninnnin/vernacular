import { notFound } from "next/navigation";
import { getAllDocs, readDoc } from "@/lib/docs";
import { PageShell } from "@/components/PageShell";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const doc = readDoc(slug);
  if (!doc) notFound();

  const { body, frontmatter } = doc;
  const firstLine = body.split("\n").find((l) => l.startsWith("# "));
  const title =
    frontmatter.title_en ??
    firstLine?.slice(2) ??
    slug[slug.length - 1];
  const description = frontmatter.title;
  const content = firstLine
    ? body.slice(body.indexOf("\n") + 1)
    : body;

  return (
    <PageShell title={title} description={description}>
      <MarkdownRenderer content={content} />
    </PageShell>
  );
}
