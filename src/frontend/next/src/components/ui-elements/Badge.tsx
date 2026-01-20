export const Badge = ({ children }) => {
  return (
    <span className="border select-none px-[4px] bg-neutral-200 border-neutral-300 rounded">
      {children}
    </span>
  );
};
