import { CellContext } from "@tanstack/react-table";
import { convertBaseToDisplay } from "~/utils/chains";
import { NexusWallet } from "~/utils/queries/wallets/types";

export function BalanceCellRenderer(cell: CellContext<NexusWallet, string>) {
  const row = cell.row.original;
  const displayAmount = convertBaseToDisplay(
    row?.totalBalance?.balance ?? 0,
    row.blockchain.externalChainId
  );
  const fiatAmount = Number(displayAmount) * (row.marketData?.price ?? 0);

  return (
    <div className="flex flex-col">
      <span className="text-gray-200 font-medium">
        {displayAmount}{" "}
        <span className="uppercase">{row.blockchain.symbol}</span>
      </span>

      <span className="text-sm text-gray-400 group-hover/row:text-gray-100">${fiatAmount.toFixed(2)}</span>
    </div>
  );
}
