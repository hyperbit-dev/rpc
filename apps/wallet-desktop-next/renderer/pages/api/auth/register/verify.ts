import { verifyRegistrationResponse } from "@simplewebauthn/server";
import storage from "electron-json-storage";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import os from "os";
import { webAuthnConfig } from "../../../../_config/webauthn";
import { AuthenticatorModel } from "../../../../_models/authenticator";
import { sessionOptions } from "../../../../_lib/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let verification;
  try {
    if (!req.session.userId) {
      return res.status(401).send({ error: "unauthorized" });
    }

    storage.setDataPath(os.tmpdir());
    const user = storage.getSync("user");
    let authenticators = storage.getSync("authenticators");
    if (!Array.isArray(authenticators)) {
      authenticators = [];
    }

    verification = await verifyRegistrationResponse({
      response: req.body,
      expectedChallenge: user.currentChallenge,
      expectedOrigin: webAuthnConfig.origin,
      expectedRPID: webAuthnConfig.rpID,
    });

    const { registrationInfo } = verification;
    const {
      credentialPublicKey,
      credentialID,
      counter,
      credentialDeviceType,
      credentialBackedUp,
      transports,
    } = registrationInfo;

    const newAuthenticatorModel: AuthenticatorModel = {
      userId: user.id,
      credentialID: Buffer.from(credentialID, "utf-8").toString("base64url"),
      credentialPublicKey: Buffer.from(credentialPublicKey, "utf-8").toString(
        "base64url"
      ),
      counter,
      credentialDeviceType,
      credentialBackedUp,
      transports,
    };

    storage.set(
      "authenticators",
      [...authenticators, newAuthenticatorModel],
      function (error) {
        if (error) throw error;
      }
    );

    req.session.userId = user.id;
    await req.session.save();

    res.status(200).json({ verified: verification.verified });
  } catch (error) {
    console.error("error", error);
    req.session.destroy();
    return res.status(400).send({ error: error.message });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
