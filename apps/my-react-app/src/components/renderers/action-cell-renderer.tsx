import { useNavigate } from "@tanstack/react-router";
import { CellContext } from "@tanstack/react-table";
import { NexusWallet } from "~/utils/queries/wallets/types";
import { Button } from "../button";

export function ActionCellRenderer(cell: CellContext<NexusWallet, string>) {
  const navigate = useNavigate();

  const row = cell.row.original;
  return (
    <div className="flex flex-row items-center gap-2 justify-end">
      <Button
        type="button"
        Size="sm"
        Variant="dark"
        onClick={() => {
          navigate({ to: `/account/wallets/${row.id}` });
        }}
      >
        Details
      </Button>
    </div>
  );
}
