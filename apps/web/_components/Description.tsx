import { ReactNode } from "react";
import { ClipboardButton } from "./ClipboardButton";
import clsx from "clsx";

type DescriptionProps = {
  name: ReactNode;
  value: string | number | ReactNode;
  copy?: boolean;
  copyValue?: string | number;
};

export function Description({
  copy = true,
  copyValue,
  name,
  value,
}: DescriptionProps) {
  const canCopy =
    copy && (typeof value === "string" || typeof value === "number");
  return (
    <div
      className={clsx(
        "p-2.5 action:bg-brand-50 grid items-center",
        copyValue || canCopy ? "grid-cols-[20px_auto]" : "grid-cols-[auto]",
      )}
    >
      {copyValue || canCopy ? (
        <ClipboardButton
          value={copyValue ? copyValue : canCopy ? value : ""}
          className="-mt-1 -ml-1"
        />
      ) : undefined}
      <div className={clsx("grid sm:grid-cols-[25%_auto] items-center")}>
        <dt>{name}</dt>
        <dd className="sm:text-right">{value}</dd>
      </div>
    </div>
  );
}
