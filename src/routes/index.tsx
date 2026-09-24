import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SampleWhatsAppPreview } from "@/components/whatsapp-thread";
import { WaitlistForm } from "@/components/waitlist-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({ component: Home });

const FEATURES = [
  {
    icon: Smartphone,
    title: "Capture the job details",
    body: "Homeowners give their name, address, phone, and what's wrong with the roof on a simple form built for high conversion.",
  },
  {
    icon: ShieldCheck,
    title: "Clear permission to message",
    body: "Every homeowner ticks a quick box so you have full consent to text them straight away about their job.",
  },
  {
    icon: MessageCircle,
    title: "Two times, one question",
    body: "The message asks a direct question: Thursday at 10 AM or Friday at 2 PM? Homeowners reply fast to simple options.",
  },
  {
    icon: Clock3,
    title: "The 24-hour chase",
    body: "If they don't reply immediately, Ridge sends one quiet follow-up the next day to catch leads that go cold overnight.",
  },
  {
    icon: CalendarCheck,
    title: "A simple board, not a complex CRM",
    body: "New, Contacted, Waiting, Booked. See every lead and thread in one place so your team knows who is going where.",
  },
  {
    icon: ArrowRight,
    title: "Reminders, reviews & future services",
    body: "After the job, keep in touch to send appointment reminders, ask for Google reviews, or offer future roof checks.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Homeowner reaches out",
    body: "They fill out a short estimate form on a simple page designed for local homeowners.",
  },
  {
    n: "02",
    title: "Ridge follows up",
    body: "Ridge texts them two concrete time slots. If they go quiet, a 24-hour check-in keeps the job alive.",
  },
  {
    n: "03",
    title: "You get the appointment",
    body: "The lead picks a time and locks themselves into your calendar before calling another contractor.",
  },
];

const TIERS = [
  {
    name: "Starter",
    buildFee: "$200",
    monthlyFee: "$29",
    blurb: "One funnel, single crew setup.",
    features: [
      "Custom roofing inspection page",
      "Instant text follow-up sequence",
      "Up to 200 leads / month",
      "Simple New → Booked pipeline",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    buildFee: "$400",
    monthlyFee: "$49",
    blurb: "The setup most busy shops run.",
    features: [
      "Unlimited live leads",
      "24-hour automatic chase sequence",
      "Shared lead desk (3 team seats)",
      "Templates for other trade services",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    buildFee: "$700",
    monthlyFee: "$99",
    blurb: "Multi-location or high volume.",
    features: [
      "Unlimited shop locations",
      "Custom follow-up scripts",
      "Dedicated onboarding support",
      "Priority system updates",
    ],
    highlight: false,
  },
];

const STORIES = [
  {
    quote:
      "Storm leads used to go cold by morning. Ridge texts two times before we even open the shop. We book the ones we used to lose.",
    name: "Marcus Hale",
    role: "Owner, Alder Roofing",
    img: "/images/marcus.jpg",
  },
  {
    quote:
      "We adjusted the roofing page for HVAC tune-ups in an afternoon. Same simple follow-up, same booked appointments.",
    name: "Elena Ruiz",
    role: "Harbor Air",
    img: "/images/elena.jpg",
  },
  {
    quote:
      "I am not a software person. I run a business. I open the board, see who is booked, send the crew out, and go.",
    name: "James Cotter",
    role: "Cotter Plumbing",
    img: "/images/james.jpg",
  },
  {
    quote:
      "Cleaning reminders use the same simple logic. Quick message, concrete times, confirmed appointment on the schedule.",
    name: "Dr. Mei Lin",
    role: "Lin Family Dental",
    img: "/images/mei.jpg",
  },
];

function Home() {
  return (
    <div className="min-h-dvh bg-paper">
      <SiteNav />
      <main>
        <Hero />
        <LogosBar />
        <Features />
        <How />
        <Pricing />
        <Stories />
        <Signup />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-ink">
      <img
        src="/images/hero-house.jpg"
        alt="Craftsman house with a standing-seam metal roof at golden hour"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25" />
      <div className="relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24">
        <div className="stagger-in max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-cream/70">
            Follow up fast. Book the job.
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-cream sm:text-6xl">
            Get more roofing jobs booked.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">
            Ridge helps roofing companies turn new enquiries into booked appointments. We handle the quick follow-up and stay in touch for reminders, reviews, and future services.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="invert">
              <Link to="/demo">
                See how Ridge works
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="border border-cream/20 text-cream hover:bg-cream/10 hover:text-cream"
            >
              <a href="#pricing">See pricing</a>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-cream/15 pt-6 text-cream">
            <div>
              <dt className="text-xs text-cream/60">First text sent</dt>
              <dd className="mt-1 font-display text-2xl">Instantly</dd>
            </div>
            <div>
              <dt className="text-xs text-cream/60">Follow-up check</dt>
              <dd className="mt-1 font-display text-2xl">24 hours</dd>
            </div>
            <div>
              <dt className="text-xs text-cream/60">The goal</dt>
              <dd className="mt-1 font-display text-2xl">Booked</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function LogosBar() {
  return (
    <section className="border-b border-line bg-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-6 text-sm text-muted sm:px-8">
        <span className="text-ink-soft">Built for roofers. Works for all trades:</span>
        <span>Roofing</span>
        <span>Plumbing</span>
        <span>HVAC</span>
        <span>Landscaping</span>
        <span>Dental</span>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="product" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-forest">What Ridge does</p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Stop losing good leads because nobody followed up in time.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Most shops get lead forms and hope someone calls them back hours later. Ridge responds immediately after the form is filled—before the homeowner calls another truck.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="rounded-xl border border-line bg-cream p-6 shadow-soft"
            >
              <f.icon className="size-5 text-forest" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-xl font-medium text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function How() {
  return (
    <section
      id="how"
      className="scroll-mt-24 border-y border-line bg-cream px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-medium text-forest">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Three simple steps to a full calendar.
          </h2>
          <ol className="mt-10 space-y-8">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-5">
                <span className="font-display text-lg text-faint">{s.n}</span>
                <div>
                  <h3 className="font-display text-xl font-medium">{s.title}</h3>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <Button asChild className="mt-10">
            <Link to="/demo">
              See how Ridge works
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <SampleWhatsAppPreview />
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium text-forest">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            One-time setup. Low monthly automation.
          </h2>
          <p className="mt-4 text-muted">
            A simple build fee to set up your system, followed by a flat monthly rate to keep the automation running.
          </p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.name}
              className={
                t.highlight
                  ? "flex flex-col rounded-xl border border-forest bg-forest p-6 text-forest-fg shadow-soft"
                  : "flex flex-col rounded-xl border border-line bg-cream p-6"
              }
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-medium">{t.name}</h3>
                {t.highlight ? (
                  <Badge variant="outline" className="border-cream/30 text-cream">
                    Popular
                  </Badge>
                ) : null}
              </div>
              <p
                className={
                  t.highlight ? "mt-1 text-sm text-cream/70" : "mt-1 text-sm text-muted"
                }
              >
                {t.blurb}
              </p>
              
              <div className="mt-6 border-y border-line/20 py-4">
                <p className="font-display text-3xl font-medium">
                  {t.buildFee}
                  <span className={t.highlight ? "text-xs font-normal text-cream/70 ml-1" : "text-xs font-normal text-muted ml-1"}>
                    one-time setup
                  </span>
                </p>
                <p className={t.highlight ? "mt-1 text-sm text-cream/80" : "mt-1 text-sm text-muted"}>
                  then <span className="font-semibold text-lg">{t.monthlyFee}</span>/mo automation fee
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={t.highlight ? "invert" : "outline"}
                className="mt-8 w-full"
              >
                <a href="#signup">Start with {t.name}</a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section
      id="stories"
      className="scroll-mt-24 border-y border-line bg-cream px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-forest">Stories</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Built for owners who spend their days on site, not behind a computer.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {STORIES.map((s) => (
            <figure
              key={s.name}
              className="flex flex-col rounded-xl border border-line bg-paper p-6"
            >
              <blockquote className="flex-1 font-display text-xl font-medium leading-snug text-ink">
                {s.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={s.img}
                  alt=""
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-ink">{s.name}</p>
                  <p className="text-xs text-muted">{s.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Signup() {
  return (
    <section
      id="signup"
      className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl bg-ink lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="text-sm font-medium text-cream/60">Early access</p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-cream sm:text-4xl">
            Put your follow-up on autopilot before storm season hits.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
            Join the waitlist. We’ll send over a quick walkthrough video and give you early access to open Starter seats.
          </p>
          <div className="mt-8 max-w-md">
            <WaitlistForm invert />
          </div>
        </div>
        <div className="relative min-h-64">
          <img
            src="/images/aerial-roof.jpg"
            alt="Aerial view of an architectural shingle roof"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
