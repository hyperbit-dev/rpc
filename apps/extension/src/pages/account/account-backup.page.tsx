import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export function AccountBackupPage() {
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
        <div className="font-medium text-md">Backup</div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
}
