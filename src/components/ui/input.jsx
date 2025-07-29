import * as React from "react"

import { classNames } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={classNames(
        "input file:text-foreground placeholder:text-input-placeholder selection:bg-blue-200 selection:text-blue-900 border-input-border flex h-12 w-full min-w-0 rounded-md border bg-transparent mt-4 px-3 py-1 text-base transition-color outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        "focus-visible:border-input-border focus-visible:ring-ring/50 focus-visible:ring-[1px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props} />
  );
}

export { Input }
