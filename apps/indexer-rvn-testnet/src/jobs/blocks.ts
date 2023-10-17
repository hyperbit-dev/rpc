import cron from "node-cron";
import rpcClient from "../utils/rpc";

export const blocksJob = cron.schedule(
  " */2 * * * * *",
  () => {
    console.log("A cron job that runs every 2 seconds");
  },
  {
    scheduled: false,
  }
);
