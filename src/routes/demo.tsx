import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { AlderMark, RidgeWordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/demo")({
  component: DemoLayout,
});

function DemoLayout() {
  return (
    <div className="min-h-dvh bg-paper">
      <div className="sticky top-0 z-30">
        <div className="bg-ink px-5 py-2 text-center text-xs text-cream/70 sm:px-8">
          Live Ridge demo — Alder Roofing. No real WhatsApp is sent.{" "}
          <Link to="/" className="text-cream underline-offset-2 hover:underline">
            Back to Ridge
          </Link>
        </div>
        <header className="border-b border-line bg-paper/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
            <Link to="/demo" className="flex items-center gap-2.5 text-ink">
              <AlderMark className="text-forest" />
              <span className="font-display text-lg font-medium tracking-tight">
                Alder Roofing
              </span>
            </Link>
            <nav className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/dashboard">Lead desk</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/demo/request">Free inspection</Link>
              </Button>
            </nav>
          </div>
        </header>
      </div>
      <Outlet />
      <footer className="border-t border-line bg-cream px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Portland metro · Licensed & insured · Est. 1998
          </p>
          <RidgeWordmark className="opacity-80" />
        </div>
      </footer>
    </div>
  );
}
