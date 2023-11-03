import { generateAuthenticationOptions } from "@simplewebauthn/server";
import storage from "electron-json-storage";
import type { NextApiRequest, NextApiResponse } from "next";
import os from "os";
import { webAuthnConfig } from "../../../../config/webauthn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    storage.setDataPath(os.tmpdir());

    const user = storage.getSync("user");
    if (!user) {
      return res
        .status(400)
        .send({
          error: "No user account. Please register a new user account.",
        });
    }

    const authenticators = storage
      .getSync("authenticators")
      .filter((x) => x.userId === user.id);

    const options = await generateAuthenticationOptions({
      rpID: webAuthnConfig.rpID,
      allowCredentials: authenticators.map((x) => ({
        id: new Uint8Array(Buffer.from(x.credentialID, "base64url")),
        type: "public-key",
        transports: x.transports,
      })),
      userVerification: "preferred",
    });

    storage.set(
      "user",
      { ...user, currentChallenge: options.challenge },
      function (error) {
        if (error) throw error;
      }
    );

    return res.status(200).json(options);
  } catch (error) {
    console.error("error", error);
    return res.status(400).send({ error: error.message });
  }
}
