import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCheck, Clock3, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  bookedMessage,
  parseSlotReply,
  SLOTS,
} from "@/lib/constants";
import { type Lead, useLeads } from "@/lib/leads-store";
import { cn, firstName } from "@/lib/utils";

function TypingDots() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-md rounded-tl-xs bg-cream px-3 py-2.5 shadow-sm">
      <span className="typing-dot size-1.5 rounded-full bg-muted" />
      <span className="typing-dot size-1.5 rounded-full bg-muted" />
      <span className="typing-dot size-1.5 rounded-full bg-muted" />
    </div>
  );
}

function Bubble({
  from,
  text,
}: {
  from: "ai" | "lead";
  text: string;
}) {
  const mine = from === "lead";
  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "wa-bubble rounded-md px-3 py-2 text-sm leading-snug shadow-sm",
          mine
            ? "rounded-tr-xs bg-wa-bubble text-ink"
            : "rounded-tl-xs bg-cream text-ink",
        )}
      >
        <p className="whitespace-pre-wrap">{text}</p>
        <p className="mt-1 flex items-center justify-end gap-1 text-xs text-wa-meta">
          {mine ? <CheckCheck className="size-3 text-moss" /> : null}
          now
        </p>
      </div>
    </div>
  );
}

export function WhatsAppThread({
  lead,
  autoIntro = false,
  compact = false,
}: {
  lead: Lead;
  autoIntro?: boolean;
  compact?: boolean;
}) {
  const sendIntro = useLeads((s) => s.sendIntro);
  const sendChase = useLeads((s) => s.sendChase);
  const replyAsLead = useLeads((s) => s.replyAsLead);
  const appendAi = useLeads((s) => s.appendAi);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [pendingAi, setPendingAi] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const live = useLeads((s) => s.leads.find((l) => l.id === lead.id) ?? lead);

  useEffect(() => {
    if (!autoIntro) return;
    if (live.messages.length > 0) return;
    setTyping(true);
    const t = window.setTimeout(() => {
      sendIntro(live.id);
      setTyping(false);
    }, 1100);
    return () => window.clearTimeout(t);
  }, [autoIntro, live.id, live.messages.length, sendIntro]);

  useEffect(() => {
    if (!pendingAi) return;
    setTyping(true);
    const t = window.setTimeout(() => {
      if (pendingAi === "__chase__") sendChase(live.id);
      else if (pendingAi === "__intro__") sendIntro(live.id);
      setPendingAi(null);
      setTyping(false);
    }, 900);
    return () => window.clearTimeout(t);
  }, [pendingAi, live.id, sendChase, sendIntro]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [live.messages.length, typing]);

  const booked = live.status === "booked";
  const chased = live.messages.some((m) => m.text.includes("just checking in"));

  function sendText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || booked) return;
    const parsed = parseSlotReply(trimmed);
    if (parsed === "defer") {
      replyAsLead(live.id, trimmed);
      setDraft("");
      return;
    }
    if (parsed === "unclear") {
      replyAsLead(live.id, trimmed);
      setDraft("");
      window.setTimeout(() => {
        appendAi(
          live.id,
          `Got it, ${firstName(live.name)} — Thursday at 10 AM or Friday at 2 PM still open. Which should I lock?`,
        );
      }, 850);
      return;
    }
    replyAsLead(live.id, trimmed, parsed);
    setDraft("");
  }

  function pickSlot(slot: string) {
    if (booked) return;
    replyAsLead(live.id, slot, slot);
  }

  const statusLine = useMemo(() => {
    if (booked) return `Booked · ${live.bookedSlot}`;
    if (live.status === "waiting") return "Waiting · 24h chase sent";
    if (live.status === "contacted") return "Contacted · awaiting reply";
    return "New · intro queued";
  }, [booked, live.bookedSlot, live.status]);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-line bg-wa-deep shadow-soft",
        compact ? "wa-phone-compact" : "wa-phone",
      )}
    >
      <div className="flex items-center gap-3 bg-wa px-3 py-2.5 text-cream">
        <div className="flex size-9 items-center justify-center rounded-full bg-cream text-sm font-semibold text-wa">
          AR
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Alder Roofing</p>
          <p className="truncate text-xs text-cream/70">{statusLine}</p>
        </div>
        <span className="text-xs text-cream/60">WhatsApp</span>
      </div>

      <div
        ref={scroller}
        className="wa-wallpaper flex-1 space-y-2 overflow-y-auto px-3 py-3"
      >
        <p className="mx-auto mb-3 max-w-xs rounded-sm bg-cream/90 px-2 py-1 text-center text-xs leading-snug text-muted">
          Demo thread — no live WhatsApp is sent. Consent recorded for{" "}
          {live.channel}.
        </p>
        {live.messages.map((m) => (
          <Bubble key={m.id} from={m.from} text={m.text} />
        ))}
        {typing ? <TypingDots /> : null}
      </div>

      <div className="border-t border-wa-deep/40 bg-cream px-3 py-3">
        {!booked ? (
          <div className="mb-2 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => pickSlot(SLOTS.thu)}>
              {SLOTS.thu}
            </Button>
            <Button size="sm" variant="outline" onClick={() => pickSlot(SLOTS.fri)}>
              {SLOTS.fri}
            </Button>
            {!chased ? (
              <Button
                size="sm"
                variant="ghost"
                className="text-muted"
                onClick={() => setPendingAi("__chase__")}
              >
                <Clock3 className="size-3.5" />
                Simulate 24h silence
              </Button>
            ) : null}
          </div>
        ) : (
          <p className="mb-2 text-xs text-ok">
            Locked in. This lead is now booked on the dashboard.
          </p>
        )}
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendText(draft);
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={
              booked ? "Conversation complete" : `Reply as ${firstName(live.name)}…`
            }
            disabled={booked}
            className="h-11 flex-1 rounded-full border border-line bg-paper px-4 text-sm text-ink placeholder:text-faint focus-visible:border-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20"
          />
          <Button
            type="submit"
            variant="wa"
            size="icon"
            className="rounded-full"
            disabled={booked || !draft.trim()}
            aria-label="Send"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export function SampleWhatsAppPreview() {
  return (
    <div className="flex min-h-96 flex-col overflow-hidden rounded-xl border border-line bg-wa-deep shadow-soft wa-phone-compact">
      <div className="flex items-center gap-3 bg-wa px-3 py-2.5 text-cream">
        <div className="flex size-9 items-center justify-center rounded-full bg-cream text-sm font-semibold text-wa">
          AR
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Alder Roofing</p>
          <p className="text-xs text-cream/70">online · demo</p>
        </div>
      </div>
      <div className="wa-wallpaper flex-1 space-y-2 px-3 py-4">
        <Bubble
          from="ai"
          text="Hi John, thanks for requesting your free roof inspection. Thursday at 10 AM or Friday at 2 PM better?"
        />
        <Bubble from="lead" text="Thursday 10 works" />
        <Bubble from="ai" text={bookedMessage("Thursday at 10 AM")} />
      </div>
    </div>
  );
}
