import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: `Course Catalog — ${SITE.name}` },
      { name: "description", content: "Browse enrollable courses at St Leonards College — academic, professional and technology programs." },
    ],
  }),
  component: () => <Outlet />,
});
