import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLeads } from "@/lib/leads-store";

export function WaitlistForm({ invert = false }: { invert?: boolean }) {
  const [email, setEmail] = useState("");
  const addWaitlist = useLeads((s) => s.addWaitlist);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      toast.error("Enter a valid work email.");
      return;
    }
    const added = addWaitlist(email);
    if (added) toast.success("You're on the list. We'll write when Ridge opens.");
    else toast("That email is already on the list.");
    setEmail("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-2 sm:flex-row sm:items-center"
    >
      <label htmlFor="waitlist-email" className="sr-only">
        Work email
      </label>
      <Input
        id="waitlist-email"
        type="email"
        autoComplete="email"
        placeholder="Work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={
          invert
            ? "h-12 border-ink/10 bg-cream text-ink placeholder:text-faint"
            : "h-12"
        }
      />
      <Button type="submit" size="lg">
        Get early access
      </Button>
    </form>
  );
}
