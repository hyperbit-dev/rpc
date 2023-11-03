import {
  Cell,
  ClipboardButton,
  Container,
  NextLink,
  PageHeader,
} from "@/components";
import { getBlock, getBlockHeight } from "@/lib/api/blocks";
import { SectionCard } from "@/components/SectionCard";
import { Content } from "./_components/Content";
import clsx from "clsx";
import { Header } from "@/components/Header";

export default async function Page({
  params,
}: {
  params: { blockhash: string; blockchain: string };
}) {
  let blockhash;
  try {
    const res = await getBlockHeight(params.blockhash, params.blockchain);
    if (res?.message) {
      blockhash = params.blockhash;
    } else {
      blockhash = res;
    }
  } catch {
    blockhash = params.blockhash;
  }
  const block = await getBlock(blockhash as string, params.blockchain);

  if (block?.message) {
    return (
      <Container>
        <PageHeader>{block.message}</PageHeader>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between">
        <PageHeader>Block: #{block.height}</PageHeader>
        <div className="flex space-x-2 text-sm">
          {block.previousblockhash && (
            <NextLink
              href={`/explorers/${params.blockchain}/blocks/${block.height - 1}`}
              className="inline-block p-1"
            >
              <span className="text-lg text-cerulean-500">‹</span> Previous
            </NextLink>
          )}
          {block.nextblockhash && (
            <NextLink
              href={`/explorers/${params.blockchain}/blocks/${block.height + 1}`}
              className="inline-block p-1"
            >
              Next <span className="text-lg text-cerulean-500">›</span>
            </NextLink>
          )}
        </div>
      </div>
      <Content block={block} />
      <section className="my-4">
        <h2 className="mb-4 text-lg">Transactions</h2>
        <SectionCard className="overflow-x-auto">
          <div
            className={clsx(
              "grid",
              `grid-cols-[50px_minmax(175px,auto)_175px_100px_100px_250px]`
            )}
          >
            <Header></Header>
            <Header>ID</Header>
            {/* <Header>Hash</Header> */}
            <Header>Size</Header>
            <Header>VINs</Header>
            <Header>VOUTs</Header>
            <Header className="text-right">Output</Header>
          </div>
          {block.tx.map((tx) => {
            const output = tx.vout.reduce((a, c) => (a += c.value), 0);
            return (
              <div
                key={tx.txid}
                className={clsx(
                  "grid",
                  `grid-cols-[50px_minmax(175px,auto)_175px_100px_100px_250px]`
                )}
              >
                <Cell>
                  <ClipboardButton value={tx.txid} />
                </Cell>
                <Cell>
                  <NextLink
                    href={`/explorers/${params.blockchain}/transactions/${tx.txid}`}
                    className="text-cerulean-500 hover:text-cerulean-600 active:text-cerulean-600 focus:text-cerulean-600"
                  >
                    {tx.txid.slice(0, 8)}...
                    {tx.txid.slice(tx.txid.length - 8, tx.txid.length)}
                  </NextLink>
                </Cell>
                {/* <Cell>
                  {tx.hash.slice(0, 8)}...
                  {tx.hash.slice(tx.hash.length - 8, tx.hash.length)}
                </Cell> */}
                <Cell>{tx.size} bytes</Cell>
                <Cell>{tx.vin.length}</Cell>
                <Cell>{tx.vout.length}</Cell>
                <Cell className="text-right">{output}</Cell>
              </div>
            );
          })}
        </SectionCard>
      </section>
    </Container>
  );
}
