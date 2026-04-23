// ArticlesFeaturedSection — Grille article featured (8/12 cols) + sidebar récents (4/12)
// Figma node I517:3693;427:2450
// Grid 12 colonnes : grand article à gauche, sidebar "RÉCENTS" à droite

import { ArticleCard, type ArticleCardProps } from "./ArticleCard";
import { RecentArticleItem } from "@/components/ui/RecentArticleItem";

export interface RecentArticle {
  imageSrc?: string;
  imageAlt?: string;
  category: string;
  title: string;
  href?: string;
}

export interface ArticlesFeaturedSectionProps {
  featured: ArticleCardProps;
  recentArticles: RecentArticle[];
}

export function ArticlesFeaturedSection({
  featured,
  recentArticles,
}: ArticlesFeaturedSectionProps) {
  return (
    <div className="grid grid-cols-12 gap-8 w-full">
      {/* Article principal — 8 colonnes */}
      <div className="col-span-8">
        <ArticleCard {...featured} />
      </div>

      {/* Sidebar récents — 4 colonnes */}
      <aside className="col-span-4 flex flex-col gap-10 pt-2">
        {/* Titre "RÉCENTS" avec border-bottom */}
        <div className="border-b border-white/5 pb-[17px]">
          <h3
            className="font-ui font-extrabold text-text-heading uppercase tracking-[-0.5px]"
            style={{ fontSize: "20px", lineHeight: "28px" }}
          >
            Récents
          </h3>
        </div>

        {/* Liste d'articles récents */}
        <div className="flex flex-col gap-8">
          {recentArticles.map((article) => (
            <RecentArticleItem key={article.title} {...article} />
          ))}
        </div>
      </aside>
    </div>
  );
}
