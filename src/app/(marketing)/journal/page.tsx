import { buildMetadata } from "@/lib/seo/metadata";
import { PagePlaceholder } from "@/components/sections/page-placeholder";
import { placeholderRoutes } from "@/lib/routes/placeholders";

const route = placeholderRoutes.journal;

export const metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

export default function Page() {
  return (
    <PagePlaceholder
      title={route.title}
      description={route.description}
      path={route.path}
    />
  );
}
