import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../_lib/session";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.setHeader("location", "/login");
  res.statusCode = 302;
  res.end();
}

export default withIronSessionApiRoute(handler, sessionOptions);
