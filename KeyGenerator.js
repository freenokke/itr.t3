import {
  randomBytes,
  createHmac
}  from 'node:crypto';

export default class KeyGenerator {
  #key;

  constructor() {
    this.#key = randomBytes(256).toString('hex');
  }

  get key() {
    return this.#key;
  }

  generateHMAC(move) {
    const hmac = createHmac('sha256', this.key);
    hmac.update(move);
    return hmac.digest('hex');
  }
}