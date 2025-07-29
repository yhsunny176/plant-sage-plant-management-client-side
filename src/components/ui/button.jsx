import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { classNames } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-btn-background-primary text-btn-text-primary hover:bg-btn-hover-bg hover:shadow-sm transition-colors duration-600 ease-in-out",
        outline:
          "border border-btn-outline bg-button-background-primary text-btn-text-primary hover:bg-btn-hover-bg hover:shadow-btn-shadow-primary transition-colors duration-600 ease-in-out",
      },
      size: {
        default: "px-6 py-2 gap-1.5 has-[>svg]:px-4",
        sm: "rounded-md gap-2 px-4 py-3 has-[>svg]:px-2.5",
        md: "rounded-md gap-2 px-6 py-3 has-[>svg]:px-2.5",
        lg: "rounded-md gap-3 px-8 py-4 has-[>svg]:px-4",
        nav: "rounded-md px-4 py-3",
        icon: "size-32",
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
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={classNames(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
