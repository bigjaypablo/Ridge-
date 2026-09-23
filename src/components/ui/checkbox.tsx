import * as React from "react";
import {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator,
} from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive>) {
  return (
    <CheckboxPrimitive
      data-slot="checkbox"
      className={cn(
        "peer size-5 shrink-0 rounded-xs border border-line-strong bg-cream shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 data-[state=checked]:border-forest data-[state=checked]:bg-forest data-[state=checked]:text-forest-fg",
        className,
      )}
      {...props}
    >
      <CheckboxIndicator className="flex items-center justify-center text-current">
        <Check className="size-3.5" strokeWidth={3} />
      </CheckboxIndicator>
    </CheckboxPrimitive>
  );
}

export { Checkbox };
