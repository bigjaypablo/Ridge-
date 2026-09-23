import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarCheck,
  Clock3,
  Inbox,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import { RidgeWordmark } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppThread } from "@/components/whatsapp-thread";
import {
  type Lead,
  type LeadStatus,
  STATUS_META,
  useLeads,
} from "@/lib/leads-store";
import { cn, firstName, formatPhone, relativeTime } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

const FILTERS: { id: "all" | LeadStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "waiting", label: "Waiting" },
  { id: "booked", label: "Booked" },
];

function DashboardPage() {
  const leads = useLeads((s) => s.leads);
  const lastLeadId = useLeads((s) => s.lastLeadId);
  const resetDemo = useLeads((s) => s.resetDemo);
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDetail, setMobileDetail] = useState(false);

  const counts = useMemo(() => {
    const base = { new: 0, contacted: 0, waiting: 0, booked: 0, all: leads.length };
    for (const lead of leads) base[lead.status] += 1;
    return base;
  }, [leads]);

  const visible = useMemo(() => {
    const list = filter === "all" ? leads : leads.filter((l) => l.status === filter);
    return [...list].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );
  }, [leads, filter]);

  const selected =
    leads.find((l) => l.id === (selectedId ?? lastLeadId ?? visible[0]?.id)) ??
    visible[0] ??
    null;

  function openLead(id: string) {
    setSelectedId(id);
    setMobileDetail(true);
  }

  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Ridge home">
              <RidgeWordmark />
            </Link>
            <span className="hidden text-sm text-muted sm:inline">
              Alder Roofing · lead desk
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/demo">Funnel</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                resetDemo();
                setSelectedId(null);
                setMobileDetail(false);
              }}
            >
              <RotateCcw className="size-3.5" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Inbox} label="New" value={counts.new} />
          <Kpi icon={MessageCircle} label="Contacted" value={counts.contacted} />
          <Kpi icon={Clock3} label="Waiting" value={counts.waiting} />
          <Kpi icon={CalendarCheck} label="Booked" value={counts.booked} />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "h-10 rounded-full px-4 text-sm font-medium transition-colors duration-150",
                filter === f.id
                  ? "bg-ink text-cream"
                  : "bg-cream text-muted hover:text-ink",
              )}
            >
              {f.label}
              <span className="ml-1.5 tabular-nums text-xs opacity-70">
                {f.id === "all" ? counts.all : counts[f.id]}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <section
            className={cn(
              "rounded-xl border border-line bg-cream",
              mobileDetail ? "hidden lg:block" : "block",
            )}
          >
            <header className="border-b border-line px-4 py-3 text-sm font-medium">
              {visible.length} {visible.length === 1 ? "lead" : "leads"}
            </header>
            {visible.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-muted">
                Nothing in this column yet.
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {visible.map((lead) => (
                  <li key={lead.id}>
                    <button
                      type="button"
                      onClick={() => openLead(lead.id)}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-paper",
                        selected?.id === lead.id && "bg-paper",
                      )}
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-medium text-forest-fg">
                        {initials(lead.name)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate font-medium text-ink">
                            {lead.name}
                          </span>
                          <span className="shrink-0 text-xs text-faint tabular-nums">
                            {relativeTime(lead.createdAt)}
                          </span>
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted">
                          {lead.issueType} · {lead.address}
                        </span>
                        <span className="mt-2">
                          <StatusBadge status={lead.status} />
                          {lead.source === "live" ? (
                            <Badge variant="outline" className="ml-1.5">
                              Live
                            </Badge>
                          ) : null}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section
            className={cn(
              "rounded-xl border border-line bg-cream p-4 sm:p-5",
              mobileDetail ? "block" : "hidden lg:block",
            )}
          >
            {selected ? (
              <LeadDetail
                lead={selected}
                onBack={() => setMobileDetail(false)}
              />
            ) : (
              <p className="py-16 text-center text-sm text-muted">
                Select a lead to read the thread.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Inbox;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-line bg-cream px-4 py-4">
      <div className="flex items-center justify-between text-muted">
        <p className="text-sm">{label}</p>
        <Icon className="size-4" />
      </div>
      <p className="mt-2 font-display text-3xl tabular-nums text-ink">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const meta = STATUS_META[status];
  const variant =
    status === "booked"
      ? "booked"
      : status === "waiting"
        ? "waiting"
        : status === "contacted"
          ? "forest"
          : "default";
  return <Badge variant={variant}>{meta.label}</Badge>;
}

function LeadDetail({ lead, onBack }: { lead: Lead; onBack: () => void }) {
  const live = useLeads((s) => s.leads.find((l) => l.id === lead.id) ?? lead);
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-3 inline-flex h-10 items-center gap-1 text-sm text-muted lg:hidden"
      >
        <ArrowLeft className="size-4" />
        All leads
      </button>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-medium">
            {firstName(live.name)} {live.name.split(" ").slice(1).join(" ")}
          </h1>
          <p className="mt-1 text-sm text-muted">{live.address}</p>
        </div>
        <StatusBadge status={live.status} />
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        <Info label="Issue" value={live.issueType} />
        <Info label="Window" value={live.preferredTime} />
        <Info label="Channel" value={live.channel} />
        <Info label="WhatsApp" value={formatPhone(live.phone)} />
        <Info label="Email" value={live.email} />
        <Info
          label="Slot"
          value={live.bookedSlot ?? "—"}
        />
      </dl>
      <div className="mt-5">
        <WhatsAppThread lead={live} compact />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-0.5 truncate text-ink">{value}</dd>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
