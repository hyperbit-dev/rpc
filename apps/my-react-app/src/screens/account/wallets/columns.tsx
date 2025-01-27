import { createColumnHelper } from "@tanstack/react-table";
import { ActionCellRenderer } from "~/components/renderers/action-cell-renderer";
import { BalanceCellRenderer } from "~/components/renderers/balance-cell-renderer";
import { BlockchainCellRenderer } from "~/components/renderers/blockchain-cell-renderer";
import { NexusWallet } from "~/utils/queries/wallets/types";

const columnHelper = createColumnHelper<NexusWallet>();

export const columns = [
  columnHelper.accessor("id", {
    header: "Name",
    cell: BlockchainCellRenderer,
  }),
  columnHelper.accessor("blockchainId", {
    header: "Balance",
    cell: BalanceCellRenderer,
  }),
  // columnHelper.accessor('marketData.price', {
  //   header: 'Price',
  //   cell: (info) => <div>${info.getValue() ?? ' - '}</div>,
  // }),
  columnHelper.accessor("totalAssets", {
    header: () => <div className="text-center">Tokens</div>,
    cell: (info) => <div className="text-center">{info.getValue() ?? 0}</div>,
    maxSize: 50,
  }),
  columnHelper.accessor("blockchain.network", {
    header: "Network",
    cell: (info) => <div className="capitalize">{info.getValue()}</div>,
    maxSize: 50,
  }),
  columnHelper.accessor("blockchain.active", {
    header: "Status",
    cell: (info) => (
      <div className="capitalize">
        {info.getValue() === true ? "Active" : "Inactive"}
      </div>
    ),
    maxSize: 50,
  }),
  columnHelper.accessor("updatedAt", {
    header: () => <div className="text-right pr-2">Actions</div>,
    cell: ActionCellRenderer,
    maxSize: 150,
  }),
];
