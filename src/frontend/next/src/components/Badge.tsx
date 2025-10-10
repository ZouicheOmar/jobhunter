export const Badge = ({ children }) => {
  return (
    <span
      className="flex align-middle select-none text-foreground rounded border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 "
    > {children}
    </span>)
}
