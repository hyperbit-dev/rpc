import rpcClients from "~/_api/rpcClient";
import { getFaucet } from "~/_lib/faucet";
import { v4 as uuidv4 } from "uuid";

const MIN = 100;
const MAX = 10000;

export async function POST(req: Request) {
  const { blockchain, address, asset, captcha } = await req.json();
  const amount = 500;

  if (!blockchain || !address || !amount || !captcha) {
    return Response.json(
      {
        message: "Unproccesable request, please provide the required fields",
      },
      { status: 422 }
    );
  }

  if (amount < MIN || amount > MAX) {
    return Response.json(
      {
        message: "Invalid amount value. Please req between 100 and MAX.",
      },
      { status: 400 }
    );
  }

  // @ts-ignore
  const ipAddress = req.ip ?? uuidv4();
  const redisUser = await getFaucet({
    ipAddress: ipAddress!,
    blockchain,
    amount,
  });

  if (redisUser && (Number(redisUser.amount) ?? 0) >= MAX) {
    const totalMinutes = 24 * 60 * 1000;
    const currentMinutes = totalMinutes - (redisUser.time as number);
    const currentHours = currentMinutes / 60 / 1000;
    return Response.json(
      {
        message: `Limit reached. Please come back in ${Math.floor(
          currentHours
        )} hours.`,
      },
      { status: 400 }
    );
  }

  try {
    // Ping the google recaptcha verify API to verify the captcha code you received
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        method: "POST",
      }
    );

    const captchaValidation = await recaptchaResponse.json();
    if (captchaValidation.success) {
      const redisAmount = redisUser?.amount ? Number(redisUser.amount) : amount;
      const reqAmount =
        amount + redisAmount <= MAX ? amount : MAX - redisAmount;

      let assetTransfers: string[] = [];
      if (asset) {
        const addresses = await rpcClients[blockchain].request(
          "listaddressesbyasset",
          {
            asset_name: asset,
          }
        );

        const accountAddress = await rpcClients[blockchain].request(
          "getaccountaddress",
          {
            account: "",
          }
        );

        if (
          !asset.endsWith("!") &&
          !asset.startsWith("$") &&
          !asset.startsWith("#")
        ) {
          assetTransfers = await rpcClients[blockchain].request(
            "transferfromaddresses",
            [
              asset,
              Object.keys(addresses),
              1,
              address,
              "",
              "",
              accountAddress,
              accountAddress,
            ]
          );
        }
      }

      const response: any = await rpcClients[blockchain].request(
        "sendtoaddress",
        {
          address,
          amount: reqAmount,
        }
      );

      if (response?.code === 500) {
        return Response.json({ message: response.message }, { status: 500 });
      }

      return Response.json(
        {
          blockchain,
          txid: response,
          amount: Number(amount),
          total: redisUser?.amount ?? amount,
          // @ts-ignore
          assetTransfers: !assetTransfers.code ? assetTransfers : [],
        },
        { status: 200 }
      );
    }

    return Response.json(
      { message: "Unproccesable request, Invalid captcha code" },
      { status: 422 }
    );
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
