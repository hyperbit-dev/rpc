export function SegmentTabs() {
  return (
    <div className="flex w-full bg-gray-100 hover:bg-gray-200 rounded-lg transition p-1 dark:bg-neutral-700 dark:hover:bg-neutral-600">
      <nav
        className="flex gap-x-1 flex-1"
        aria-label="Tabs"
        role="tablist"
        aria-orientation="horizontal"
      >
        <button
          type="button"
          className="flex-1 w-full items-center justify-center text-center hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-neutral-800 hs-tab-active:dark:text-neutral-400 dark:hs-tab-active:bg-gray-800 py-2 px-3 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:focus:text-white active"
          id="segment-item-1"
          aria-selected="true"
          data-hs-tab="#segment-1"
          aria-controls="segment-1"
          role="tab"
        >
          Receive
        </button>
        <button
          type="button"
          className="flex-1 w-full items-center justify-center text-center hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-neutral-800 hs-tab-active:dark:text-neutral-400 dark:hs-tab-active:bg-gray-800 py-2 px-3 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:focus:text-white"
          id="segment-item-2"
          aria-selected="false"
          data-hs-tab="#segment-2"
          aria-controls="segment-2"
          role="tab"
        >
          Transfer
        </button>
      </nav>
    </div>
  );
}
