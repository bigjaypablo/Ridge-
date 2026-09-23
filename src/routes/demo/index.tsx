import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/demo/")({
  component: DemoHome,
});

function DemoHome() {
  return (
    <main>
      <section className="relative isolate min-h-[72dvh] overflow-hidden bg-ink">
        <img
          src="/images/inspector.jpg"
          alt="Roof inspector checking chimney flashing on a residential roof"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
        <div className="relative mx-auto flex min-h-[72dvh] max-w-6xl flex-col justify-end px-5 pb-14 pt-16 sm:px-8 sm:pb-20">
          <div className="stagger-in max-w-xl">
            <p className="text-sm font-medium tracking-wide text-cream/70">
              Portland & the Gorge · same-week visits
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium leading-tight text-cream sm:text-6xl">
              Get your free roof inspection.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-cream/80">
              Storm season does not wait. Neither should a leaking valley.
              Twenty minutes on the roof — we confirm the time on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="invert">
                <Link to="/demo/request">
                  Request inspection
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="border border-cream/20 text-cream hover:bg-cream/10 hover:text-cream"
              >
                <a href="#why">Why Alder</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="why"
        className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:grid-cols-3 sm:px-8 sm:py-20"
      >
        <article className="rounded-xl border border-line bg-cream p-6">
          <MapPin className="size-5 text-forest" />
          <h2 className="mt-4 font-display text-xl font-medium">Local crew</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Hawthorne to St. Johns. We know which ridges take the west wind.
          </p>
        </article>
        <article className="rounded-xl border border-line bg-cream p-6">
          <Clock3 className="size-5 text-forest" />
          <h2 className="mt-4 font-display text-xl font-medium">WhatsApp first</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            You pick how we reach you. Most homeowners want the thread, not a
            voicemail.
          </p>
        </article>
        <article className="rounded-xl border border-line bg-cream p-6">
          <ShieldCheck className="size-5 text-forest" />
          <h2 className="mt-4 font-display text-xl font-medium">No hard sell</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Inspection is free. If the roof is fine, we say so and leave.
          </p>
        </article>
      </section>

      <section className="border-t border-line bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <img
            src="/images/aerial-roof.jpg"
            alt="Architectural shingle roof with copper flashing"
            className="h-72 w-full rounded-xl object-cover sm:h-96"
          />
          <div>
            <p className="text-sm font-medium text-forest">The visit</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight">
              We walk the roof. You get a photo report the same day.
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
              <li>Shingles, flashing, valleys, and ventilation.</li>
              <li>Moisture at chimneys and skylights.</li>
              <li>A clear repair vs. replace note — no theatre.</li>
            </ul>
            <Button asChild className="mt-8">
              <Link to="/demo/request">Book the free inspection</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
