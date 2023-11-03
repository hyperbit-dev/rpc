import clsx from "clsx";

export function Container({
  children,
  className,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx("px-8 mx-auto max-w-7xl w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}
