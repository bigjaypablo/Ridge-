import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  bookedMessage,
  chaseMessage,
  introMessage,
} from "@/lib/constants";

export type LeadStatus = "new" | "contacted" | "waiting" | "booked";
export type Channel = "whatsapp" | "sms" | "email";

export type ChatMessage = {
  id: string;
  from: "ai" | "lead";
  text: string;
  at: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  issueType: string;
  preferredTime: string;
  channel: Channel;
  consent: boolean;
  status: LeadStatus;
  createdAt: string;
  bookedSlot?: string;
  messages: ChatMessage[];
  source: "seed" | "live";
};

export type LeadDraft = {
  name: string;
  email: string;
  phone: string;
  address: string;
  issueType: string;
  preferredTime: string;
  channel: Channel;
  consent: boolean;
};

function nid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function msg(
  id: string,
  from: ChatMessage["from"],
  text: string,
  at: string,
): ChatMessage {
  return { id, from, text, at };
}

const SEED_LEADS: Lead[] = [
  {
    id: "seed-john",
    name: "John Reeves",
    email: "john.reeves@email.com",
    phone: "5035550142",
    address: "418 Hawthorne Blvd, Portland, OR",
    issueType: "Active leak",
    preferredTime: "Morning (8–11)",
    channel: "whatsapp",
    consent: true,
    status: "contacted",
    createdAt: "2026-09-23T18:20:00.000Z",
    source: "seed",
    messages: [
      msg("m-john-1", "ai", introMessage("John Reeves"), "2026-09-23T18:26:00.000Z"),
    ],
  },
  {
    id: "seed-priya",
    name: "Priya Shah",
    email: "priya.shah@email.com",
    phone: "9715550188",
    address: "902 NE Alberta St, Portland, OR",
    issueType: "Missing shingles",
    preferredTime: "Afternoon (12–4)",
    channel: "whatsapp",
    consent: true,
    status: "waiting",
    createdAt: "2026-09-22T15:10:00.000Z",
    source: "seed",
    messages: [
      msg("m-priya-1", "ai", introMessage("Priya Shah"), "2026-09-22T15:40:00.000Z"),
      msg("m-priya-2", "ai", chaseMessage("Priya Shah"), "2026-09-23T16:10:00.000Z"),
    ],
  },
  {
    id: "seed-tom",
    name: "Tom Brennan",
    email: "tbrennan@email.com",
    phone: "5035550190",
    address: "2214 SE Division St, Portland, OR",
    issueType: "Storm damage",
    preferredTime: "Flexible",
    channel: "sms",
    consent: true,
    status: "new",
    createdAt: "2026-09-23T19:05:00.000Z",
    source: "seed",
    messages: [],
  },
  {
    id: "seed-hannah",
    name: "Hannah Cole",
    email: "hannah.cole@email.com",
    phone: "5035550166",
    address: "77 N Williams Ave, Portland, OR",
    issueType: "Not sure — just inspect",
    preferredTime: "Morning (8–11)",
    channel: "whatsapp",
    consent: true,
    status: "booked",
    createdAt: "2026-09-23T09:15:00.000Z",
    bookedSlot: "Thursday at 10 AM",
    source: "seed",
    messages: [
      msg("m-hannah-1", "ai", introMessage("Hannah Cole"), "2026-09-23T09:20:00.000Z"),
      msg("m-hannah-2", "lead", "Thursday 10 works", "2026-09-23T09:28:00.000Z"),
      msg("m-hannah-3", "ai", bookedMessage("Thursday at 10 AM"), "2026-09-23T09:28:30.000Z"),
    ],
  },
  {
    id: "seed-luis",
    name: "Luis Ortega",
    email: "luis.o@email.com",
    phone: "9715550112",
    address: "1506 SW Broadway, Portland, OR",
    issueType: "Aging roof",
    preferredTime: "Evening (4–7)",
    channel: "whatsapp",
    consent: true,
    status: "booked",
    createdAt: "2026-09-21T14:00:00.000Z",
    bookedSlot: "Friday at 2 PM",
    source: "seed",
    messages: [
      msg("m-luis-1", "ai", introMessage("Luis Ortega"), "2026-09-21T14:12:00.000Z"),
      msg("m-luis-2", "lead", "Friday please", "2026-09-21T14:40:00.000Z"),
      msg("m-luis-3", "ai", bookedMessage("Friday at 2 PM"), "2026-09-21T14:40:20.000Z"),
    ],
  },
  {
    id: "seed-claire",
    name: "Claire Dinh",
    email: "claire.dinh@email.com",
    phone: "5035550177",
    address: "3308 N Mississippi Ave, Portland, OR",
    issueType: "Storm damage",
    preferredTime: "Afternoon (12–4)",
    channel: "email",
    consent: true,
    status: "contacted",
    createdAt: "2026-09-23T14:30:00.000Z",
    source: "seed",
    messages: [
      msg("m-claire-1", "ai", introMessage("Claire Dinh"), "2026-09-23T14:42:00.000Z"),
    ],
  },
];

type Store = {
  leads: Lead[];
  lastLeadId: string | null;
  waitlist: string[];
  addLead: (draft: LeadDraft) => Lead;
  sendIntro: (id: string) => void;
  sendChase: (id: string) => void;
  replyAsLead: (id: string, text: string, bookedSlot?: string) => void;
  appendAi: (id: string, text: string) => void;
  setStatus: (id: string, status: LeadStatus) => void;
  addWaitlist: (email: string) => boolean;
  resetDemo: () => void;
};

export const useLeads = create<Store>()(
  persist(
    (set, get) => ({
      leads: SEED_LEADS,
      lastLeadId: null,
      waitlist: [],
      addLead: (draft) => {
        const lead: Lead = {
          ...draft,
          id: nid("lead"),
          status: "new",
          createdAt: new Date().toISOString(),
          messages: [],
          source: "live",
        };
        set({ leads: [lead, ...get().leads], lastLeadId: lead.id });
        return lead;
      },
      sendIntro: (id) => {
        const now = new Date().toISOString();
        set({
          leads: get().leads.map((lead) => {
            if (lead.id !== id) return lead;
            if (lead.messages.some((m) => m.text.startsWith("Hi "))) return lead;
            return {
              ...lead,
              status: lead.status === "booked" ? lead.status : "contacted",
              messages: [
                ...lead.messages,
                msg(nid("m"), "ai", introMessage(lead.name), now),
              ],
            };
          }),
        });
      },
      sendChase: (id) => {
        const now = new Date().toISOString();
        set({
          leads: get().leads.map((lead) => {
            if (lead.id !== id || lead.status === "booked") return lead;
            return {
              ...lead,
              status: "waiting",
              messages: [
                ...lead.messages,
                msg(nid("m"), "ai", chaseMessage(lead.name), now),
              ],
            };
          }),
        });
      },
      replyAsLead: (id, text, bookedSlot) => {
        const now = new Date().toISOString();
        set({
          leads: get().leads.map((lead) => {
            if (lead.id !== id) return lead;
            const next: Lead = {
              ...lead,
              messages: [...lead.messages, msg(nid("m"), "lead", text, now)],
            };
            if (bookedSlot) {
              next.status = "booked";
              next.bookedSlot = bookedSlot;
              next.messages = [
                ...next.messages,
                msg(nid("m"), "ai", bookedMessage(bookedSlot), now),
              ];
            }
            return next;
          }),
        });
      },
      appendAi: (id, text) => {
        const now = new Date().toISOString();
        set({
          leads: get().leads.map((lead) =>
            lead.id === id
              ? { ...lead, messages: [...lead.messages, msg(nid("m"), "ai", text, now)] }
              : lead,
          ),
        });
      },
      setStatus: (id, status) => {
        set({
          leads: get().leads.map((lead) =>
            lead.id === id ? { ...lead, status } : lead,
          ),
        });
      },
      addWaitlist: (email) => {
        const clean = email.trim().toLowerCase();
        if (!clean || get().waitlist.includes(clean)) return false;
        set({ waitlist: [...get().waitlist, clean] });
        return true;
      },
      resetDemo: () => {
        set({ leads: SEED_LEADS, lastLeadId: null });
      },
    }),
    {
      name: "ridge-leads-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        leads: state.leads,
        lastLeadId: state.lastLeadId,
        waitlist: state.waitlist,
      }),
      skipHydration: true,
    },
  ),
);

export const STATUS_META: Record<
  LeadStatus,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className: "bg-ink text-cream",
  },
  contacted: {
    label: "Contacted",
    className: "bg-forest text-forest-fg",
  },
  waiting: {
    label: "Waiting",
    className: "bg-warn/15 text-warn",
  },
  booked: {
    label: "Booked",
    className: "bg-ok/15 text-ok",
  },
};
