import { useEffect } from "react";
import { useLeads } from "@/lib/leads-store";

export function HydrateLeads() {
  useEffect(() => {
    void useLeads.persist.rehydrate();
  }, []);
  return null;
}
