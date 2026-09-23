export const ISSUE_TYPES = [
  "Missing shingles",
  "Active leak",
  "Storm damage",
  "Aging roof",
  "New construction",
  "Not sure — just inspect",
] as const;

export const TIME_WINDOWS = [
  "Morning (8–11)",
  "Afternoon (12–4)",
  "Evening (4–7)",
  "Flexible",
] as const;

export const CHANNELS = [
  {
    id: "whatsapp" as const,
    label: "WhatsApp",
    hint: "Recommended — fastest booking",
  },
  { id: "sms" as const, label: "SMS", hint: "Text messages" },
  { id: "email" as const, label: "Email", hint: "If you prefer inbox" },
];

export const SLOTS = {
  thu: "Thursday at 10 AM",
  fri: "Friday at 2 PM",
} as const;

export function introMessage(name: string) {
  const n = name.trim().split(/\s+/)[0] || "there";
  return `Hi ${n}, thanks for requesting your free roof inspection. Thursday at 10 AM or Friday at 2 PM better?`;
}

export function chaseMessage(name: string) {
  const n = name.trim().split(/\s+/)[0] || "there";
  return `Hi ${n} — just checking in. I can still hold Thursday 10 AM or Friday 2 PM for your free roof inspection. Which works?`;
}

export function bookedMessage(slot: string) {
  return `Perfect — you're booked ${slot}. We'll see you then. Reply here if you need to reschedule.`;
}

export function parseSlotReply(text: string): string | "unclear" | "defer" {
  const t = text.toLowerCase();
  if (/\b(later|wait|busy|not sure|idk|tomorrow)\b/.test(t)) return "defer";
  if (/\b(thu|thursday|10)\b/.test(t)) return SLOTS.thu;
  if (/\b(fri|friday|2)\b/.test(t)) return SLOTS.fri;
  if (/\b(yes|either|both|first|sure|ok|okay|book)\b/.test(t)) return SLOTS.thu;
  return "unclear";
}
