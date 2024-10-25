import { createColumnHelper } from "@tanstack/react-table";
import { PoubDbWallet } from "@/_lib/pouchdb";
import { getNetwork } from "@/_lib/blockchain";
import { Button } from "@hyperbit-private/react";

const columnHelper = createColumnHelper<PoubDbWallet>();

export function getColumns(setOpen: (open: boolean) => void) {
  return [
    columnHelper.accessor("doc.name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("doc.chainId", {
      header: "Blockchain",
      cell: (info) => {
        const network = getNetwork(info.getValue());
        if (network) {
          return <span className="capitalize">{network.name}</span>;
        }
        return "Unknown";
      },
    }),
    columnHelper.accessor("doc.chainId", {
      header: "Network",
      cell: (info) => {
        const network = getNetwork(info.getValue());
        if (network) {
          return <span className="capitalize">{network.network}</span>;
        }
        return "Unknown";
      },
    }),
    columnHelper.display({
      id: "doc._id",
      cell: (info) => {
        function handleSend(e: React.MouseEvent<HTMLButtonElement>) {
          e.stopPropagation();
          setOpen(true);
        }

        function handleReceive(e: React.MouseEvent<HTMLButtonElement>) {
          e.stopPropagation();
        }

        return (
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              size="sm"
              className="bg-white"
              onClick={handleSend}
              outline
            >
              Send
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-white"
              onClick={handleReceive}
              outline
            >
              Receive
            </Button>
          </div>
        );
      },
    }),
  ];
}
