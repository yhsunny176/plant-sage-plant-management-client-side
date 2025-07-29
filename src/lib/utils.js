// Simple className utility function for concatenating class names
export function classNames(...classes) {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
}
