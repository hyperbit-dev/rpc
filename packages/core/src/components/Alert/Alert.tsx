import { forwardRef } from "react";
import clsx from "clsx";
import { AlertProps } from "./types";

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    className,
    children,
    size = "md",
    rounded = "md",
    variant = "warning",
    width = "full",
    justify = "start",
    onDismiss,
    ...attrs
  } = props;

  const btnClasses = clsx("absolute p-0 m-0 top-2.5 right-2.5 bottom-2.5");

  const dimensions = clsx(
    { "12": size === "sm" },
    { "16": size === "md" || !size },
    { "20": size === "lg" }
  );

  return (
    <div
      className={clsx(
        "sui--alert",
        "flex flex-wrap items-center relative leading-tight",
        { "pr-10": onDismiss },
        { [`w-${width}`]: width },
        { [`justify-content-${justify}`]: justify },
        rounded && [
          { "rounded-none": rounded === "none" },
          { "rounded-sm": rounded === "sm" },
          { "rounded-md": rounded === "md" },
          { "rounded-lg": rounded === "lg" },
          { "rounded-xl": rounded === "xl" },
          { "rounded-2xl": rounded === "2xl" },
          { "rounded-3xl": rounded === "3xl" },
          { "rounded-full": rounded === "full" },
        ],
        size && [
          { "px-3 py-2 text-sm": size === "sm" },
          { "px-4 py-2.5 text-md": size === "md" },
          { "px-6 py-3 text-lg": size === "lg" },
        ],
        variant !== "custom" && [
          variant === "primary" && ["text-white bg-brand-500/50 border-brand-500"],
          variant === "secondary" && ["text-white bg-gray-500/50 border-gray-500"],
          variant === "success" && ["text-white bg-sky-500 border-sky-500"],
          variant === "warning" && [
            "text-white bg-yellow-500/50 border-yellow-500",
          ],
          variant === "danger" && ["text-white bg-red-500/50 border-red-500"],
          variant === "dark" && ["text-white bg-black border-black"],
          variant === "info" && [
            "text-white bg-cyan-500/80 border-cyan-500/80",
          ],
          variant === "light" && ["text-gray-900 bg-gray-100 border-gray-100"],
        ],
        className
      )}
      role="alert"
      ref={ref}
      {...attrs}
    >
      {children}
      {onDismiss ? (
        <button type="button" className={btnClasses} onClick={onDismiss}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height={dimensions}
            width={dimensions}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      ) : undefined}
    </div>
  );
});

Alert.displayName = "SuiAlert";