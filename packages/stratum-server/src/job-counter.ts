import { Buffer } from "node:buffer";

export class JobCounter {
  counter: number = 0x0000cccc;

  next(): string {
    this.counter++;
    if (this.counter % 0xffffffffff === 0) {
      this.counter = 1;
    }
    return this.cur();
  }

  cur(): string {
    const counter_buf = Buffer.alloc(32);
    counter_buf.writeUIntBE(parseInt("000000000000000000000000"), 0, 6);
    counter_buf.writeUIntBE(this.counter, 26, 6);
    return counter_buf.toString("hex");
  }
}
