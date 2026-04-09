"use client";

import { useRouter } from "@/navigation";
import { PoleTabsNav } from "@/components/ui/PoleTabsNav";

/** Client wrapper pour la navigation entre pôles depuis la page Conseil & Transformation */
export function PoleTabsNavWrapper() {
  const router = useRouter();

  return (
    <PoleTabsNav
      activeValue="conseil"
      onChange={(value) => {
        const routes: Record<string, string> = {
          conseil: "/nos-poles/conseil",
          dev: "/nos-poles/developpement",
          devops: "/nos-poles/hebergement",
        };
        const href = routes[value];
        if (href) router.push(href as "/");
      }}
    />
  );
}
