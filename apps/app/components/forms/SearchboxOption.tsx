import { ReactNode } from "react";

type SearchboxOptionProps = {
  Image?: ReactNode;
  Group?: string;
  data: { label: string; value: string; group?: string };
  onClick: (data: any) => void;
  selected?: boolean;
};

export function SearchboxOption({
  data,
  onClick,
  selected,
}: SearchboxOptionProps) {
  return (
    <div
      data-hs-combo-box-output-item={`{"group": {"name": "${data.group ?? ""}", "title": "${data.group ?? ""}"}}`}
      tabIndex={6}
      onClick={() => onClick(data)}
    >
      <div className="py-2 px-2.5 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
        {selected ? (
          <svg
            className="shrink-0 size-4 text-teal-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg
            className="shrink-0 size-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
          </svg>
        )}
        <span
          className="text-sm text-gray-800 dark:text-neutral-200"
          data-hs-combo-box-search-text={data.label}
          data-hs-combo-box-value=""
        >
          {data.label}
        </span>
        {/* <span
          className="ms-auto text-xs text-gray-400 dark:text-neutral-500"
          data-hs-combo-box-search-text="Offline"
          data-hs-combo-box-value=""
        >
          Offline
        </span> */}
      </div>
    </div>
  );
}
