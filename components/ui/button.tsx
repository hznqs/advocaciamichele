import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display text-xs font-semibold uppercase tracking-[-0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50 sm:text-sm",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-[#07111F] shadow-gold hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-[0_18px_60px_rgba(92,119,148,0.34)]",
        outline:
          "border border-gold/35 bg-white/[0.03] text-white hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10",
        ghost: "text-white/75 hover:text-white"
      },
      size: {
        default: "h-11 px-5 sm:h-12 sm:px-6",
        lg: "h-12 px-5 sm:h-14 sm:px-8",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
