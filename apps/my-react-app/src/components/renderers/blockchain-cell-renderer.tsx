import { CellContext } from "@tanstack/react-table";
import { NexusWallet } from "~/utils/queries/wallets/types";

export function BlockchainCellRenderer(cell: CellContext<NexusWallet, string>) {
  const row = cell.row.original;
  
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-gray-500"></div>
      <div className="flex flex-col">
        {row.label ? (
          <span className="text-gray-200 group-hover/row:text-gray-100 font-medium">{row.label}</span>
        ) : undefined}
        <span className="text-sm text-gray-400 group-hover/row:text-gray-100">{row.blockchain.name}</span>
      </div>
    </div>
  );
}
