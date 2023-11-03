import { verifyAuthenticationResponse } from "@simplewebauthn/server";
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

    let authenticators = storage.getSync("authenticators");
    if (!Array.isArray(authenticators)) {
      authenticators = [];
    }

    const index = authenticators.findIndex(
      (x) => x.credentialID === req?.body?.id
    );

    if (index < 0) {
      throw new Error(
        `Could not find authenticator ${req?.body?.id} for user ${user.id}`
      );
    }

    const authenticator = authenticators[index];
    authenticator.credentialID = new Uint8Array(
      Buffer.from(authenticator.credentialID, "base64url")
    );
    authenticator.credentialPublicKey = new Uint8Array(
      Buffer.from(authenticator.credentialPublicKey, "base64url")
    );

    const verification = await verifyAuthenticationResponse({
      response: req.body,
      expectedChallenge: user.currentChallenge,
      expectedOrigin: webAuthnConfig.origin,
      expectedRPID: webAuthnConfig.rpID,
      authenticator,
    });

    const { authenticationInfo } = verification;
    const { newCounter } = authenticationInfo;

    authenticator.counter = newCounter;
    authenticators[index] = authenticator;

    storage.set("authenticator", authenticators, function (error) {
      if (error) throw error;
    });

    return res.status(200).json({ verified: verification.verified });
  } catch (error) {
    console.error("error", error);
    return res.status(400).send({ error: error.message });
  }
}
