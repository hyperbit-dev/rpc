import { generateRegistrationOptions } from "@simplewebauthn/server";
import storage from "electron-json-storage";
import type { NextApiRequest, NextApiResponse } from "next";
import os from "os";
import { webAuthnConfig } from "../../../../config/webauthn";
import { UserModel } from "../../../../models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const user: UserModel = {
      id: req.body.id,
      username: req.body.username,
    };
    const options = await generateRegistrationOptions({
      rpName: webAuthnConfig.rpName,
      rpID: webAuthnConfig.rpID,
      userID: user.id,
      userName: user.username,
      // Don't prompt user for additional information about the authenticator
      // (Recommended for smoother UX)
      attestationType: "none",
      // Prevent user from re-registering existing authenticators
      //   excludeCredentials: userAuthenticators.map(authenticator => ({
      //     id: authenticator.credentialID,
      //     type: 'public-key',
      //     // Optional
      //     transports: authenticator.transports,
      //   })),
      // See "Guiding use of authenticators via authenticatorSelection" below
      authenticatorSelection: {
        // Defaults
        residentKey: "preferred",
        userVerification: "preferred",
        // Optional
        authenticatorAttachment: "platform",
      },
    });

    storage.setDataPath(os.tmpdir());

    const newUser = { ...user, currentChallenge: options.challenge };

    storage.set("user", newUser, function (error) {
      if (error) throw error;
    });

    res.status(200).json(options);
  } catch (error) {
    console.error("error", error);
    return res.status(400).send({ error: error.message });
  }
}
