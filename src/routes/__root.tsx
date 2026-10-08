import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { VaultProvider } from "@/lib/vault-store";
import { SiteHeader } from "@/components/vault/site-header";
import { SiteFooter } from "@/components/vault/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="engraved-label mb-4">404</p>
        <h1 className="font-display text-6xl font-medium text-pearl" style={{ lineHeight: 1.05 }}>
          Not in the vault
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The stone or page you requested may have sold or been relisted.
        </p>
        <div className="mt-8">
          <Link
            to="/browse"
            search={{ type: undefined }}
            className="facet-sheen btn-gold"
          >
            Browse available stones
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="engraved-label mb-4">Error</p>
        <h1 className="font-display text-2xl text-pearl">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something failed on our side. Reload, or return to the vault.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="facet-sheen btn-gold"
          >
            Try again
          </button>
          <a
            href="/"
            className="btn-outline-gold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rhea Ceylon — 100% Pure Natural Certified Gemstones from Sri Lanka" },
      {
        name: "description",
        content:
          "Rhea Ceylon specialises in certified loose natural gemstones — sapphires, rubies, emeralds and rare Ceylon (Sri Lankan) stones. Every gem is 100% naturally mined, independently graded with full origin and treatment disclosure. No lab-grown, no synthetics.",
      },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rheaceylon.lk/" },
      { property: "og:site_name", content: "Rhea Ceylon" },
      { property: "og:image", content: "https://www.rheaceylon.lk/logo.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Rhea Ceylon — 100% Natural Certified Gemstones from Sri Lanka" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@rheaceylon" },
      { name: "twitter:image", content: "https://www.rheaceylon.lk/logo.png" },
      // Theme
      { name: "theme-color", content: "#0a0906" },
      { name: "color-scheme", content: "dark" },
      // Mobile web-app
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Rhea Ceylon" },
      { name: "application-name", content: "Rhea Ceylon" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
      // Favicons — Google requires an icon at the root, ≥48×48px
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/logo.png" },
      { rel: "shortcut icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouterState();
  const isDashboard = routerState.location.pathname.startsWith("/dashboard");
  const isLogin = routerState.location.pathname.startsWith("/login");
  const isStandalone = isDashboard || isLogin;

  return (
    <QueryClientProvider client={queryClient}>
      <VaultProvider>
        {isStandalone ? (
          <Outlet />
        ) : (
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <Outlet />
            </main>
            <SiteFooter />
          </div>
        )}
      </VaultProvider>
    </QueryClientProvider>
  );
}
