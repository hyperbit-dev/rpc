import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { rpcClients } from "@/lib/rpc";
import { getUser } from "@/services/faucet";

const MIN = 100;
const MAX = 10000;

export async function POST(
  request: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
) {
  const { address, amount: bodyAmount, captcha } = await request.json();
  const amount = Number(bodyAmount);

  if (!blockchain || !address || !amount || !captcha) {
    return NextResponse.json(
      {
        message: "Unproccesable request, please provide the required fields",
      },
      { status: 422 }
    );
  }

  if (amount < MIN || amount > MAX) {
    return NextResponse.json(
      {
        message: "Invalid amount value. Please request between 100 and MAX.",
      },
      { status: 400 }
    );
  }

  const ipAddress = request.ip ?? uuidv4();
  const redisUser = await getUser({
    ipAddress: ipAddress!,
    blockchain,
    amount,
  });
  if (redisUser && (Number(redisUser.amount) ?? 0) >= MAX) {
    const totalMinutes = 24 * 60 * 1000;
    const currentMinutes = totalMinutes - (redisUser.time as number);
    const currentHours = currentMinutes / 60 / 1000;
    return NextResponse.json(
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
      const requestAmount =
        amount + redisAmount <= MAX ? amount : MAX - redisAmount;
      const response: any = await rpcClients[blockchain].request(
        "sendtoaddress",
        {
          address,
          amount: requestAmount,
        }
      );

      if (response?.code === 500) {
        return NextResponse.json(
          { message: response.message },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          transactionId: response,
          amount: Number(amount),
          total: redisUser?.amount ?? amount,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Unproccesable request, Invalid captcha code" },
      { status: 422 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 500 }
    );
  }
}
