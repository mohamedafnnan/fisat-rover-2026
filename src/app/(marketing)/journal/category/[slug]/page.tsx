import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/shared/page-hero";
import { ProjectCard } from "@/components/domain";
import { journalPosts } from "@/content/site-content";

type Props = { params: Promise<{ slug: string }> };

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const title = titleFromSlug(slug);
  return buildMetadata({
    title: `${title} · Journal`,
    description: `Journal posts in ${title}.`,
    path: `/journal/category/${slug}`,
  });
}

export default async function JournalCategoryPage({ params }: Props) {
  const { slug } = await params;
  const label = titleFromSlug(slug);
  const posts = journalPosts.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  return (
    <>
      <PageHero
        eyebrow="Journal · Category"
        title={label}
        description={
          posts.length
            ? `${posts.length} post${posts.length === 1 ? "" : "s"} in this category.`
            : "No posts here yet — browse the full journal."
        }
        primaryCta={{ label: "All posts", href: "/journal" }}
      />
      <section className="section-y">
        <Container className="space-y-8">
          {posts.length ? (
            <ul className="card-grid">
              {posts.map((post) => (
                <li key={post.slug}>
                  <ProjectCard
                    href={`/journal/${post.slug}`}
                    title={post.title}
                    summary={post.summary}
                    eyebrow={post.category}
                    chips={[post.date]}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-border-strong px-6 py-12 text-center">
              <p className="text-muted-foreground">No posts in this category yet.</p>
              <Button asChild variant="secondary" className="mt-4">
                <Link href="/journal">Browse all posts</Link>
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}