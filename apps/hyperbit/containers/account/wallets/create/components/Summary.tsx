import { Wallet } from "@/services/wallet";
import React from "react";
import { useFormContext } from "react-hook-form";
import { QRGenerator } from "./QRGenerator";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { WalletDocument } from "./WalletDocument";
import Link from "next/link";
import { Button } from "@/components";

export function Summary({ wallet }: { wallet?: Wallet }) {
  const form = useFormContext();

  if (!wallet) {
    return null;
  }

  const blockchain = form.watch("blockchain");
  const network = form.watch("network");
  const name = form.watch("name");
  const passphrase = form.watch("passphrase");

  return (
    <>
      <div
        className="grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-2"
        style={{ userSelect: "none" }}
      >
        {wallet.mnemonic?.words.map((word, index) => (
          <div
            key={`${word}-${index}`}
            className="relative p-2 text-center bg-white border border-gray-200 rounded"
          >
            <span className="absolute inset-y-0 flex items-center justify-center left-4">
              {index + 1}.
            </span>
            {word}
          </div>
        ))}
      </div>
      <div className="flex flex-row items-start gap-2">
        <QRGenerator
          id="wallet-words"
          value={wallet.mnemonic?.words.join(" ")}
        />
        <div className="hidden">
          <QRGenerator
            id="wallet-xpriv"
            value={wallet?.mnemonic?.toHDPrivateKey().toJSON().xpriv}
          />
          <QRGenerator
            id="wallet-coinkey-privatekey"
            value={wallet.mnemonic?.getCoinKey().privateKey}
          />
          <QRGenerator
            id="wallet-coinkey-publicaddress"
            value={wallet.mnemonic?.getCoinKey().publicAddress}
          />
          <QRGenerator
            id="wallet-coinkey-privatewif"
            value={wallet.mnemonic?.getCoinKey().privateWif}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>Scan your words to your phone or</div>
          <PDFDownloadLink
            className="inline-block p-2 text-center text-white rounded bg-brand-500"
            document={
              <WalletDocument
                passphrase={passphrase}
                wallet={wallet}
                network={network}
              />
            }
            fileName={`${blockchain}-${network}-${name}.pdf`}
          >
            {({ loading }) =>
              loading ? "Loading document..." : "Download Full PDF"
            }
          </PDFDownloadLink>
        </div>
      </div>
      <hr className="my-4" />
      <Button
        Tag={Link}
        href="/account/wallets"
        className="text-center"
        Width="full"
      >
        Back to Wallets
      </Button>
      <div className="text-sm text-center">
        (If you have not saved your wallet data, we cannot recover it!)
      </div>
    </>
  );
}
