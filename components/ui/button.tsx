import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-[11px] font-medium uppercase tracking-[0.18em] whitespace-nowrap transition-[background-color,border-color,color,opacity] duration-500 outline-none select-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border-border bg-transparent hover:border-foreground/25 hover:bg-foreground/[0.03]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/85",
        ghost:
          "hover:bg-foreground/[0.04] hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "normal-case tracking-normal text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2 px-6",
        xs: "h-8 gap-1 px-3 text-[10px] tracking-[0.16em]",
        sm: "h-9 gap-1.5 px-4 text-[10px]",
        lg: "h-12 gap-2 px-8",
        icon: "size-10",
        "icon-xs": "size-8",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
