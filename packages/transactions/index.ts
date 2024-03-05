import {
  toBitcore,
  MainNet,
  TestNet,
  RegTest,
  SimNet,
} from "@hyperbitjs/chains";
import Mnemonic, { Address } from "@hyperbitjs/mnemonic";
import { Client } from "@hyperbitjs/rpc";
import bitcore from "bitcore-lib";

export type CreateTransactionParams = {
  mnemonic: string;
  passphrase?: string;
  network: MainNet | TestNet | RegTest | SimNet;
  addresses: Address[];
  changeAddress: string;
  recipientAddress: string;
  recipientAmount: number;
  rpcClient: Client;
  manualFee?: number;
};

export async function createTransaction({
  mnemonic,
  passphrase,
  network,
  addresses,
  changeAddress,
  recipientAddress,
  recipientAmount,
  rpcClient,
}: CreateTransactionParams) {
  setNetwork(network, network.network);
  const wallet = new Mnemonic({ network, mnemonic, passphrase });

  const utxos = await rpcClient.request("getaddressutxos", [{ addresses }]);
  utxos.sort((a: any, b: any) => (a.satoshi > b.satoshi ? -1 : 1));
  const inputs = getInputs({ utxos, recipientAmount });

  const transaction = new bitcore.Transaction();

  transaction
    .from(inputs)
    .to(recipientAddress, recipientAmount)
    .change(changeAddress);

  const fee = transaction.getFee();
  console.log("fee", fee);

  const estimatedsmartfee = await rpcClient.request("estimatesmartfee", [
    100,
    "CONSERVATIVE",
  ]);
  console.log("estimatedsmartfee", estimatedsmartfee);

  transaction.fee(fee * 10);
  console.log("fee", fee);

  signTransaction({
    transaction,
    addresses,
    inputs,
  });

  const hexstring = transaction.serialize();

  console.log("hexstring", hexstring);

  const response = await rpcClient.request("sendrawtransaction", [hexstring]);
  console.log("response", response);
}

// set transaction inputs
// set change address
// set transaction fee
// sign transaction
// serialize transaction

function setNetwork(
  network: MainNet | TestNet | RegTest | SimNet,
  name: "mainnet" | "testnet" | "regtest" | "simnet"
) {
  bitcore.Networks.add({
    ...toBitcore(network, name),
    name: network.name,
    alias: network.unit.toUpperCase(),
  });
  return bitcore.Networks.get("RVN");
}

function getInputs({
  utxos,
  recipientAmount,
}: {
  utxos: any;
  recipientAmount: number;
}) {
  let leftover = recipientAmount;
  let fromUtoxs = [];
  for (let i = 0; i < utxos.length; i++) {
    const utxo = utxos[i];
    if (utxo.satoshis < leftover) {
      fromUtoxs.push(utxo);
      leftover -= utxo.satoshis;
    } else if (utxo.satoshis > leftover) {
      fromUtoxs.push(utxo);
      break;
    }
  }
  return fromUtoxs;
}

function signTransaction({
  transaction,
  addresses,
  inputs,
}: {
  transaction: any;
  addresses: Address[];
  inputs: any[];
}) {
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const address = addresses.find((x) => x.address === input.address);
    if (address) {
      transaction.sign(address.privateKey);
    }
  }
}
