import clsx from "clsx";

export function Container({
  children,
  className,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div {...props} className={clsx("max-w-xl px-4 mx-auto", className)}>
      {children}
    </div>
  );
}
