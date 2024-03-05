import { chains } from "@hyperbitjs/chains";

export async function GET(
  _: Request,
  { params }: { params: { blockchain: string; address: string } }
): Promise<any> {
  if (!params.blockchain || !params.address) {
    return Response.json({ message: "Missing required params" });
  }

  let url = "";

  switch (params.blockchain.toLowerCase()) {
    case "rvn":
    case "ravencoin":
    case chains.rvn.mainnet.id.toLowerCase():
      url = `https://api.ravencoin.org/api/addr/${params.address}/?noTxList=1`;
    default:
      break;
  }

  if (!url) {
    return Response.json({ message: "Invalid blockchain" });
  }

  try {
    const data = await fetch(url).then((res) => res.json());
    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
