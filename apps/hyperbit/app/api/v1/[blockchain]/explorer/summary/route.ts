import { NextResponse } from "next/server";
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";

export async function GET(
  _req: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<NextResponse<any | ResponseError>> {
  try {
    const statPromises = [];
    statPromises.push(rpcClients[blockchain].request("getblockchaininfo"));
    statPromises.push(rpcClients[blockchain].request("getmininginfo"));
    statPromises.push(rpcClients[blockchain].request("getchaintxstats"));

    const stats: any[] = await Promise.all(statPromises);

    let blockHeaders: any[] = [];

    if (stats[2]?.code === 500) {
      stats[2] = {
        time: 0,
        txcount: 0,
        window_block_count: 0,
        window_tx_count: 0,
        window_interval: 0,
        txrate: 0,
      };
    }

    switch (blockchain) {
      case "pgn":
      case "tpgn":
        const blockStats = await rpcClients[blockchain].request(
          "getblockstats",
          [stats[0].headers === 0 ? stats[0].headers : stats[0].headers - 9]
        );
        const res = await rpcClients[blockchain].request("getblockheaders", [
          blockStats.blockhash,
          10,
        ]);
        blockHeaders = res.reverse();
        break;
      default:
        blockHeaders = await getBlockHeaders(
          blockchain,
          stats[0].bestblockhash
        );
        break;
    }

    const promises: any[] = [];
    blockHeaders.forEach(async (blockHeader: any) => {
      promises.push(getBlockStats(blockchain, blockHeader));
    });

    const blocks: any[] = await Promise.all(promises);
    // if (blockHeaders.status === 500) {
    //   throw new Error(blockHeaders?.message);
    // }
    return NextResponse.json(
      {
        blocks,
        blockchainInfo: stats[0],
        miningInfo: stats[1],
        blockchainTxStats: stats[2],
      },
      { status: 200 }
    );
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}

async function getBlockHeaders(blockchain: string, hash: any): Promise<any> {
  const blockHeaders: any[] = [];
  let blockhash = hash;
  for (let i = 0; i < 10; i++) {
    const blockHeader = await rpcClients[blockchain].request("getblockheader", [
      blockhash,
    ]);
    blockHeaders.push(blockHeader);
    blockhash = blockHeader.previousblockhash;
  }
  return blockHeaders;
}

function getBlockStats(blockchain: string, blockHeader: any) {
  switch (blockchain) {
    case "pgn":
    case "tpgn":
      return rpcClients[blockchain]
        .request("getblockstats", [blockHeader.height])
        .then((stats) => ({
          blockHeader,
          blockStats: stats,
        }));
    default:
      return rpcClients[blockchain]
        .request("getblock", [blockHeader.hash, 2])
        .then((stats) => ({
          blockHeader,
          blockStats: stats,
        }));
  }
}
