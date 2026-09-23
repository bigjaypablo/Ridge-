import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { RidgeWordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#product", label: "Product" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#stories", label: "Stories" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const invert = !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled || open
          ? "border-b border-line bg-paper/95 backdrop-blur-md"
          : "border-b border-transparent bg-ink/35 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="Ridge home" onClick={() => setOpen(false)}>
          <RidgeWordmark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-150",
                invert
                  ? "text-cream/80 hover:text-cream"
                  : "text-muted hover:text-ink",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            asChild
            variant={invert ? "ghost" : "ghost"}
            size="sm"
            className={invert ? "text-cream hover:bg-cream/10 hover:text-cream" : ""}
          >
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant={invert ? "invert" : "default"} size="sm">
            <Link to="/demo">Try the demo</Link>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-md md:hidden",
            invert ? "text-cream" : "text-ink",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-cream"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/dashboard"
              className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-cream"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Button asChild className="mt-3 w-full">
              <Link to="/demo" onClick={() => setOpen(false)}>
                Try the roofing demo
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
