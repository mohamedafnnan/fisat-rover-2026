import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { ProjectCard } from "@/components/domain";
import { journalPosts } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Journal",
  description: "Build logs, competition diaries, and storytelling from the FISAT Rover Team.",
  path: "/journal",
});

const categories = ["All", "Build log", "Field test", "Science", "Culture", "Engineering", "Sponsors"];

/** Product "News" maps to Journal IA. */
export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="News · Journal"
        title="Build logs & field stories"
        description="How Artemis comes together — manufacturing notes, design reviews, and competition diaries."
        primaryCta={{ label: "Subscribe later", href: "/contact" }}
        secondaryCta={{ label: "Press kit", href: "/press" }}
      />

      <section className="section-y" aria-labelledby="posts-heading">
        <Container className="space-y-8">
          <div className="flex flex-wrap gap-2" role="list" aria-label="Categories">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/journal" : `/journal/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex"
              >
                <Badge tone={cat === "All" ? "accent" : "neutral"} className="hover:border-border-strong">
                  {cat}
                </Badge>
              </Link>
            ))}
          </div>

          <h2 id="posts-heading" className="sr-only">
            Posts
          </h2>
          <ul className="card-grid">
            {journalPosts.map((post) => (
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
        </Container>
      </section>

      <CtaBand
        tone="dual"
        headline="Want updates in your inbox?"
        primaryCta={{ label: "Contact / notify me", href: "/contact" }}
        secondaryCta={{ label: "Join the team", href: "/join" }}
      />
    </>
  );
}