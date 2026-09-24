import { Link } from "@tanstack/react-router";
import { RidgeWordmark } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <RidgeWordmark />
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The simple follow-up system for local service businesses. Capture, follow up, and book the job.
          </p>
          <p className="mt-4 text-xs text-muted/80">
            © {new Date().getFullYear()} Ridge. Developed by Big Jay.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          <a href="/#product" className="hover:text-ink">
            Product
          </a>
          <a href="/#pricing" className="hover:text-ink">
            Pricing
          </a>
          <Link to="/demo" className="hover:text-ink">
            Roofing demo
          </Link>
          <Link to="/dashboard" className="hover:text-ink">
            Lead desk
          </Link>
        </div>
      </div>
    </footer>
  );
}
