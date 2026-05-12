import { ArticleCard } from "./ArticleCard";
import { RecentArticleItem } from "@/components/ui/RecentArticleItem";
import { RevealTitle } from "@/components/ui/RevealTitle";
import type { SocialPost } from "@/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface SocialFeedSectionProps {
  posts: SocialPost[];
}

export function SocialFeedSection({ posts }: SocialFeedSectionProps) {
  const [featured, ...rest] = posts;
  const sidebarPosts = rest.slice(0, 3);

  if (!featured) return null;

  const [postTitle, ...excerptParts] = featured.text.split(" — ");
  const postExcerpt = excerptParts.join(" — ");

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* En-tête de section */}
      <div className="flex flex-col gap-3">
        <RevealTitle
          text="Sur nos réseaux"
          className="font-sans font-bold text-white"
          style={{
            fontSize: "var(--text-card-title)",
            lineHeight: "var(--text-card-title--line-height)",
          }}
        />
        <p
          className="font-body text-text-body-warm"
          style={{
            fontSize: "var(--text-nav)",
            lineHeight: "var(--text-nav--line-height)",
            opacity: 0.7,
          }}
        >
          Nos derniers posts LinkedIn et Instagram.
        </p>
      </div>

      {/* Grille posts */}
      <div className="grid grid-cols-12 gap-8">
        {/* Post principal — 8 colonnes */}
        <div className="col-span-8">
          <ArticleCard
            imageSrc={featured.imageSrc}
            category={featured.platform === "linkedin" ? "LinkedIn" : "Instagram"}
            date={formatDate(featured.date)}
            title={postTitle}
            excerpt={postExcerpt}
            ctaLabel="Voir le post"
            ctaHref={featured.postUrl}
            ctaTarget="_blank"
          />
        </div>

      {/* Sidebar — 4 colonnes */}
      <aside className="col-span-4 flex flex-col gap-10 pt-2">
        <div className="border-b border-white/5 pb-[17px] flex items-center justify-between gap-4">
          <h3
            className="font-ui font-extrabold text-text-heading uppercase tracking-[-0.5px] shrink-0"
            style={{ fontSize: "20px", lineHeight: "28px" }}
          >
            Récents
          </h3>
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com/company/steamulo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-text-muted hover:text-text-heading transition-colors"
              style={{ fontSize: "11px" }}
            >
              LinkedIn ↗
            </a>
            <a
              href="https://instagram.com/steamulo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-text-muted hover:text-text-heading transition-colors"
              style={{ fontSize: "11px" }}
            >
              Instagram ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {sidebarPosts.map((post) => (
            <RecentArticleItem
              key={post.id}
              imageSrc={post.imageSrc}
              category={post.platform === "linkedin" ? "LinkedIn" : "Instagram"}
              title={post.text.length > 80 ? post.text.slice(0, 80).trimEnd() + "…" : post.text}
              href={post.postUrl}
              target="_blank"
            />
          ))}
        </div>
      </aside>
      </div>
    </div>
  );
}
