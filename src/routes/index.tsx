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
    title: "Capture the job, not a newsletter",
    body: "A short funnel — name, WhatsApp, address, issue, time window — built to convert storm-day traffic.",
  },
  {
    icon: ShieldCheck,
    title: "Consent before the first ping",
    body: "WhatsApp is first. SMS and email stay optional. Every lead ticks a clear opt-in before you write them.",
  },
  {
    icon: MessageCircle,
    title: "Two times, one question",
    body: "The opener is specific: Thursday at 10 AM or Friday at 2 PM. People reply to a choice, not a calendar.",
  },
  {
    icon: Clock3,
    title: "The 24-hour chase",
    body: "No reply? One follow-up the next day. Quiet, human, and enough to recover the jobs that go cold overnight.",
  },
  {
    icon: CalendarCheck,
    title: "A desk, not a spreadsheet",
    body: "New, contacted, waiting, booked. Every thread lives next to the lead so the crew can see what moved.",
  },
  {
    icon: ArrowRight,
    title: "Trades, not just roofs",
    body: "Start with roofing. The same skeleton later becomes plumbing, HVAC, landscaping, or a dental chair.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Request",
    body: "Homeowner asks for a free inspection from a page that looks like your company, not a SaaS.",
  },
  {
    n: "02",
    title: "Opt in",
    body: "They pick WhatsApp (or SMS, or email) and agree to be contacted about this job only.",
  },
  {
    n: "03",
    title: "Follow up",
    body: "Ridge sends two concrete times. If the thread goes quiet, a 24-hour chase keeps the slot warm.",
  },
  {
    n: "04",
    title: "Booked",
    body: "The lead desk flips to booked. Your crew sees the address, issue, and the conversation that closed it.",
  },
];

const TIERS = [
  {
    name: "Starter",
    price: "$79",
    blurb: "One funnel, one crew.",
    features: [
      "Roofing inspection page",
      "WhatsApp-first opt-in",
      "200 leads / month",
      "New → booked pipeline",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$179",
    blurb: "The desk most shops run.",
    features: [
      "Unlimited live leads",
      "24-hour chase sequence",
      "Shared lead desk, 3 seats",
      "Trade templates (HVAC, plumbing…)",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    price: "$349",
    blurb: "Multi-location, custom scripts.",
    features: [
      "Unlimited locations",
      "Custom AI openers",
      "Ready for live WhatsApp API",
      "Priority onboarding",
    ],
    highlight: false,
  },
];

const STORIES = [
  {
    quote:
      "Storm leads used to go cold by morning. Ridge texts two times before we unlock the shop. We book the ones we used to lose.",
    name: "Marcus Hale",
    role: "Owner, Alder Roofing",
    img: "/images/marcus.jpg",
  },
  {
    quote:
      "We swapped the roof copy for HVAC tune-ups in an afternoon. Same funnel, same WhatsApp habit. The board finally matches the vans.",
    name: "Elena Ruiz",
    role: "Harbor Air",
    img: "/images/elena.jpg",
  },
  {
    quote:
      "I am not a software person. I am a plumber. I open the desk, see who is waiting, and go. That is the whole product.",
    name: "James Cotter",
    role: "Cotter Plumbing",
    img: "/images/james.jpg",
  },
  {
    quote:
      "Hygiene recall is a different trade, same behavior. Consent, a short thread, a time on the chair. Patients actually reply.",
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
            WhatsApp-first lead desk for local trades
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-cream sm:text-6xl">
            Leads that book themselves.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">
            Ridge captures the request, gets consent, and follows up on WhatsApp
            until the inspection is on the calendar. Built for roofers. Ready
            for plumbers, HVAC, landscapers, and dentists.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="invert">
              <Link to="/demo">
                Try the roofing demo
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
              <dt className="text-xs text-cream/60">Median first ping</dt>
              <dd className="mt-1 font-display text-2xl">11 min</dd>
            </div>
            <div>
              <dt className="text-xs text-cream/60">Quiet-thread chase</dt>
              <dd className="mt-1 font-display text-2xl">24h</dd>
            </div>
            <div>
              <dt className="text-xs text-cream/60">Pipeline statuses</dt>
              <dd className="mt-1 font-display text-2xl">4</dd>
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
        <span className="text-ink-soft">Later, same system for</span>
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
          <p className="text-sm font-medium text-forest">The product</p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Lead capture, opt-in, and a follow-up that actually happens.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Most shops buy ads, then hope someone calls back. Ridge is the hour
            after the form — WhatsApp first — before the lead finds another
            truck.
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
            Four steps. No CRM theatre.
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
              Run the live funnel
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
            Simple desks. No per-text surprise.
          </h2>
          <p className="mt-4 text-muted">
            WhatsApp Business API fees pass through at cost when you go live.
            This demo does not send real messages.
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
              <p className="mt-6 font-display text-4xl">
                {t.price}
                <span
                  className={
                    t.highlight
                      ? "ml-1 text-base text-cream/60"
                      : "ml-1 text-base text-muted"
                  }
                >
                  /mo
                </span>
              </p>
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
          Built with shops who answer the phone with dirty hands.
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
            Put the follow-up on rails before storm season.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
            Join the list. We’ll send a walkthrough of the roofing demo, then
            open Starter seats in waves.
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
