import React from "react";
import { Drawer } from "../drawer";
import { NexusWallet } from "~/utils/queries/wallets/types";
import { FormGroup } from "../form-group";
import { Input } from "../input";
import { Label } from "../label";
import { Checkbox } from "../checkbox";
import { Button } from "../button";
import { convertBaseToDisplay } from "~/utils/chains";
import { HelperText } from "../helper-text";
import { QRCodeSVG } from "qrcode.react";
import { useGetReceiveAddressQuery } from "~/utils/queries/wallet-addresses";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CopyIcon, ReloadIcon } from "@radix-ui/react-icons";
import { copy } from "~/utils/clipboard";
import { usePouchDbWallet } from "~/hooks/use-pouch-db-wallets";
import { RadioGroup } from "../radio-group";

type TransferRecieveDrawerProps = {
  Trigger: React.ReactNode;
  wallet: NexusWallet;
};

export function TransferRecieveDrawer({
  Trigger,
  wallet,
}: TransferRecieveDrawerProps) {
  const getReceiveAddressQuery = useGetReceiveAddressQuery({
    walletId: wallet.id,
  });

  const address = getReceiveAddressQuery.data;
  const pouchDbWallet = usePouchDbWallet(wallet.id);
  console.log("pouchDbWallet", pouchDbWallet);

  function generateAddress() {}

  return (
    <Drawer
      Title={`Request ${wallet.blockchain.name}`}
      Trigger={Trigger}
      Content={
        getReceiveAddressQuery.isLoading ? (
          <>
            <Skeleton height={30} />
            <Skeleton height={250} />
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton height={30} />
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <RadioGroup
              Options={[
                {
                  label: "Deposit Address",
                  value: "recieve",
                },
                {
                  label: "Create Invoice",
                  value: "invoice",
                },
              ]}
            />
            <div className="flex items-center justify-center max-w-xs mx-auto px-4 my-2 rounded-lg border border-gray-300">
              {address ? (
                <QRCodeSVG value={address.address} size={325} />
              ) : undefined}
            </div>

            {address ? (
              <div className="text-center">{address.address}</div>
            ) : undefined}

            <Button
              type="button"
              Variant="brand"
              className="gap-2 max-w-xs mx-auto w-full mt-4"
              onClick={() => {
                copy(address?.address ?? "");
              }}
            >
              <CopyIcon /> Copy Address
            </Button>
            <Button
              type="button"
              Variant="light"
              className="gap-2 max-w-xs mx-auto w-full"
              onClick={() => generateAddress()}
            >
              <ReloadIcon /> Generate New Address
            </Button>
          </div>
        )
      }
      Footer={
        <>
          &nbsp;
          <Button type="button" Variant="light">
            Close
          </Button>
        </>
      }
    />
  );
}
