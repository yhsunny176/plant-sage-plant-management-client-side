import { classNames } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={classNames("bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }
