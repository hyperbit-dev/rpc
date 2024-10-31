import { Container } from "@/_components/Container";
import { Button } from "@hyperbit-private/react";
import { search } from "@/app/(public)/explorers/actions";
import { Explorers } from "./components/explorers";

export default async function ExplorerContainer() {
  return (
    <Container className="mb-4">
      <div className="py-12 text-center">
        <h1 className="mb-1 text-4xl font-bold">Blockchain Explorers</h1>
        <p className="text-lg leading-tight">
          Your compass in navigating the blockchain data terrain
        </p>
      </div>
      <form
        action={search}
        className="grid md:grid-cols-[175px_175px_auto_150px] gap-2 my-3"
      >
        <select
          className="p-3 pr-6 text-sm duration-300 rounded-md"
          name="blockchain"
          defaultValue="trvn"
        >
          <option value="trvn">Ravencoin (Testnet)</option>
          <option value="evr">Evrmore</option>
          <option value="tevr">Evrmore (Testnet)</option>
          <option value="mewc">Meowcoin</option>
        </select>
        <select
          className="p-3 pr-6 text-sm duration-300 rounded-md"
          name="type"
        >
          <option value="address">Address</option>
          <option value="height">Block Height</option>
          <option value="hash">Block Hash</option>
          <option value="transaction">Transaction Hash</option>
          <option value="asset">Asset Name</option>
        </select>
        <input
          type="text"
          className="w-full p-3 rounded-md"
          placeholder="Search for blocks, transactions, addresses, and assets..."
          name="query"
        />
        <Button type="submit" className="px-8 select-none">
          Search
        </Button>
      </form>
      <Explorers />
    </Container>
  );
}
