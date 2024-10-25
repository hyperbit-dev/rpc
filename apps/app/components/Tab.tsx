export function Tab({
  selected = false,
  children,
}: {
  selected?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="hs-tab-active:font-semibold hs-tab-active:border-brand-600 hs-tab-active:text-brand-600 py-3 px-2 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-brand-600 focus:outline-none focus:text-brand-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-brand-500 active"
      aria-selected={selected}
      role="tab"
    >
      {children}
    </button>
  );
}
