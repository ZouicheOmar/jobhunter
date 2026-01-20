export const MonoLayoutTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => (
  <div className={`mb-6 ${className}`}>
    <p className={`text-xl md:text-3xl font-medium capitalize `}>{title}</p>
  </div>
);
