import { connect, redisClient } from "@/_lib/redis";
import { rpcClients } from "~/_api/rpcClient";

class ExplorerService {
  public async getSummary(blockchain: string) {
    try {
      await connect();

      let blockchainInfo, miningInfo, blockchainTxStats, info, mempoolInfo;
      try {
        blockchainInfo = await this.getBlockchainInfo(blockchain);
      } catch {}
      try {
        miningInfo = await this.getMiningInfo(blockchain);
      } catch {}
      try {
        blockchainTxStats = await this.getChainTxStats(blockchain);
      } catch {}
      try {
        info = await this.getInfo(blockchain);
      } catch {}
      try {
        mempoolInfo = await this.getMempoolInfo(blockchain);
      } catch {}
      return {
        blockchainInfo,
        miningInfo,
        blockchainTxStats,
        version: info?.version,
        mempoolInfo,
      };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  private async getBlockchainInfo(blockchain: string) {
    try {
      const redisRef = `rpc:${blockchain}:getblockchaininfo`;
      let blockchainInfo = await redisClient.json.get(redisRef);
      if (!blockchainInfo || blockchainInfo?.status === 500) {
        const response =
          await rpcClients[blockchain].request("getblockchainInfo");
        if (!response.error && response?.status !== 500) {
          blockchainInfo = response;
          redisClient.json.set(redisRef, "$", blockchainInfo);
          redisClient.EXPIRE(redisRef, 60 * 5 * 1000);
          return response;
        } else {
          throw new Error(response.error);
        }
      }
      return blockchainInfo;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  private async getMiningInfo(blockchain: string) {
    try {
      const redisRef = `rpc:${blockchain}:getmininginfo`;
      let miningInfo = await redisClient.json.get(redisRef);
      if (!miningInfo || miningInfo?.status === 500) {
        const response = await rpcClients[blockchain].request("getmininginfo");
        if (!response.error && response?.status !== 500) {
          miningInfo = response;
          redisClient.json.set(redisRef, "$", miningInfo);
          redisClient.EXPIRE(redisRef, 60 * 5 * 1000);
          return response;
        } else {
          throw new Error(response.error);
        }
      }
      return miningInfo;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  private async getChainTxStats(blockchain: string) {
    try {
      const redisRef = `rpc:${blockchain}:getchaintxstats`;
      let chaintxstats = await redisClient.json.get(redisRef);
      if (!chaintxstats || chaintxstats?.status === 500) {
        const response =
          await rpcClients[blockchain].request("getchaintxstats");
        if (!response.error && response?.status !== 500) {
          chaintxstats = response;
          redisClient.json.set(redisRef, "$", chaintxstats);
          redisClient.EXPIRE(redisRef, 60 * 5 * 1000);
        } else {
          return {
            time: 0,
            txcount: 0,
            window_block_count: 0,
            window_tx_count: 0,
            window_interval: 0,
            txrate: 0,
          };
        }
      }
      return chaintxstats;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  private async getInfo(blockchain: string) {
    try {
      const redisRef = `rpc:${blockchain}:getinfo`;
      let info = await redisClient.json.get(redisRef);
      if (!info || info?.status === 500) {
        const response = await rpcClients[blockchain].request("getinfo");
        if (!response.error && response?.status !== 500) {
          info = response;
          redisClient.json.set(redisRef, "$", info);
          redisClient.EXPIRE(redisRef, 60 * 5 * 1000);
          return response;
        } else {
          throw new Error(response.error);
        }
      }
      return info;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  private async getMempoolInfo(blockchain: string) {
    try {
      const redisRef = `rpc:${blockchain}:getmempoolinfo`;
      let mempoolinfo = await redisClient.json.get(redisRef);
      if (!mempoolinfo || mempoolinfo?.status === 500) {
        const response = await rpcClients[blockchain].request("getmempoolinfo");
        if (!response.error && response?.status !== 500) {
          mempoolinfo = response;
          redisClient.json.set(redisRef, "$", mempoolinfo);
          redisClient.EXPIRE(redisRef, 60 * 5 * 1000);
          return response;
        } else {
          throw new Error(response.error);
        }
      }
      return mempoolinfo;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ExplorerService();
