import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppThread } from "@/components/whatsapp-thread";
import { useLeads } from "@/lib/leads-store";
import { firstName } from "@/lib/utils";

export const Route = createFileRoute("/demo/thanks")({
  component: ThanksPage,
});

function ThanksPage() {
  const lastLeadId = useLeads((s) => s.lastLeadId);
  const leads = useLeads((s) => s.leads);
  const lead =
    leads.find((l) => l.id === lastLeadId) ??
    leads.find((l) => l.source === "live") ??
    leads.find((l) => l.id === "seed-john");

  if (!lead) {
    return (
      <main className="mx-auto max-w-lg px-5 py-20 text-center">
        <h1 className="font-display text-3xl font-medium">No request yet</h1>
        <p className="mt-3 text-sm text-muted">
          Start with the inspection form to see the WhatsApp follow-up.
        </p>
        <Button asChild className="mt-6">
          <Link to="/demo/request">Request inspection</Link>
        </Button>
      </main>
    );
  }

  const n = firstName(lead.name);

  return (
    <main className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <p className="inline-flex items-center gap-2 text-sm font-medium text-ok">
          <Check className="size-4" />
          Request received
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Thanks, {n}. We’ll contact you via WhatsApp.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Alder Roofing just logged {lead.address}. You chose{" "}
          <span className="text-ink">{lead.channel}</span> as the primary
          channel — this demo still plays the WhatsApp follow-up, because that’s
          the path Ridge is built around.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-muted">
          <li>Issue: {lead.issueType}</li>
          <li>Window: {lead.preferredTime}</li>
          <li>Phone: {lead.phone}</li>
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Watch the thread on the right. Pick a time, type a reply, or simulate
          24 hours of silence to see the chase message.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/dashboard">
              Open the lead desk
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/demo/request">Submit another</Link>
          </Button>
        </div>
      </div>
      <WhatsAppThread lead={lead} autoIntro />
    </main>
  );
}
