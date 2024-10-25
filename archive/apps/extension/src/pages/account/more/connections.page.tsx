import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";

export function MoreConnectionsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 h-full py-2 select-none">
      <div className="flex items-center justify-between px-2 pt-1 pb-3">
        <button
          type="button"
          className="outline-brand-500 action:text-brand-500"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon className="w-5" />
        </button>
        <div className="font-medium text-md">Connections</div>
        <PlusIcon className="w-5" />
      </div>
      <Virtuoso
        style={{ height: "100%" }}
        totalCount={200}
        itemContent={(index) => (
          <div className="p-3 mx-1 mb-1 leading-tight border border-gray-300 rounded">
            Item {index}
          </div>
        )}
      />
    </div>
  );
}
