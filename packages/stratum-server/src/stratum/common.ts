import { packInt64LE } from '@hyperbit-private/utils';

export class SubscriptionCounter {
  count: number = 0;
  padding: string = 'deadbeefcafebabe';

  next(): string {
    this.count++;
    if (Number.MAX_VALUE === this.count) {
      this.count = 0;
    }
    return this.padding + packInt64LE(this.count).toString('hex');
  }
}
