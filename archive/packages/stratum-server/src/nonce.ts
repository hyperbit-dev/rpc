import crypto from "node:crypto";

export class ExtraNonceCounter {
  next() {
    return crypto.randomBytes(2).toString("hex");
  }
}
