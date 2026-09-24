import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CHANNELS, ISSUE_TYPES, TIME_WINDOWS } from "@/lib/constants";
import { type Channel, useLeads } from "@/lib/leads-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo/request")({
  component: RequestPage,
});

const selectClass =
  "flex h-11 w-full rounded-md border border-line bg-cream px-3.5 text-sm text-ink focus-visible:border-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25";

type Errors = Partial<Record<string, string>>;

function RequestPage() {
  const navigate = useNavigate();
  const addLead = useLeads((s) => s.addLead);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [issueType, setIssueType] = useState<(typeof ISSUE_TYPES)[number] | "">(
    "",
  );
  const [preferredTime, setPreferredTime] = useState<
    (typeof TIME_WINDOWS)[number] | ""
  >("");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter a valid email.";
    if (phone.replace(/\D/g, "").length < 10)
      next.phone = "Enter a valid phone number with area code.";
    if (address.trim().length < 8) next.address = "Enter the property address.";
    if (!issueType) next.issueType = "Select what you are seeing.";
    if (!preferredTime) next.preferredTime = "Pick a time window.";
    if (!consent) next.consent = "Consent is required to contact you.";
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    addLead({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      issueType,
      preferredTime,
      channel,
      consent,
    });
    void navigate({ to: "/demo/thanks" });
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <p className="text-sm font-medium text-forest">Free inspection</p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Tell us where to look. We’ll text you available times.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          Takes about a minute. We text you straight away with two concrete times so you can pick what works best for your schedule.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          <Field label="Full name" error={errors.name} htmlFor="name">
            <Input
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Hale"
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" error={errors.email} htmlFor="email">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </Field>
            <Field
              label="Phone number"
              error={errors.phone}
              htmlFor="phone"
            >
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(503) 555-0142"
              />
            </Field>
          </div>
          <Field label="Property address" error={errors.address} htmlFor="address">
            <Input
              id="address"
              autoComplete="street-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="418 Hawthorne Blvd, Portland, OR"
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Issue type" error={errors.issueType} htmlFor="issue">
              <select
                id="issue"
                className={selectClass}
                value={issueType}
                onChange={(e) =>
                  setIssueType(e.target.value as typeof issueType)
                }
              >
                <option value="">Select one</option>
                {ISSUE_TYPES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Preferred time"
              error={errors.preferredTime}
              htmlFor="time"
            >
              <select
                id="time"
                className={selectClass}
                value={preferredTime}
                onChange={(e) =>
                  setPreferredTime(e.target.value as typeof preferredTime)
                }
              >
                <option value="">Select a window</option>
                {TIME_WINDOWS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-ink-soft">
              How should we reach you?
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {CHANNELS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setChannel(c.id)}
                  className={cn(
                    "rounded-lg border px-4 py-3 text-left transition-colors duration-150",
                    channel === c.id
                      ? "border-forest bg-forest text-forest-fg"
                      : "border-line bg-cream hover:border-line-strong",
                  )}
                >
                  <span className="block text-sm font-medium">{c.label}</span>
                  <span
                    className={cn(
                      "mt-0.5 block text-xs",
                      channel === c.id ? "text-cream/70" : "text-muted",
                    )}
                  >
                    {c.hint}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex items-start gap-3 rounded-lg border border-line bg-cream p-4">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
              className="mt-0.5"
            />
            <div>
              <Label htmlFor="consent" className="leading-snug">
                I agree to be contacted by Alder Roofing about this inspection.
                Messages include two time options and one follow-up check if I don’t reply.
              </Label>
              {errors.consent ? (
                <p className="mt-1 text-xs text-danger">{errors.consent}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
            Request free inspection
          </Button>
        </form>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-24 overflow-hidden rounded-xl border border-line bg-cream shadow-soft">
          <img
            src="/images/hero-house.jpg"
            alt=""
            className="h-56 w-full object-cover"
          />
          <div className="p-6">
            <p className="font-display text-xl font-medium">What happens next</p>
            <ol className="mt-4 space-y-3 text-sm text-muted">
              <li>1. You receive an instant text with appointment options.</li>
              <li>2. Pick Thursday 10 AM or Friday 2 PM — or reply with a time that works.</li>
              <li>3. If you get busy, we send one quiet check-in after 24 hours.</li>
            </ol>
          </div>
        </div>
      </aside>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
}
