const vocab = new Map([
  [-1, "Win"],
  [0, "Draw"],
  [1, "Lose"],
]);

export default class Rule {
  #n;
  #p;

  constructor(movesCount) {
    this.#n = movesCount
    this.#p = Math.floor(movesCount / 2);
  }

  determineWinner(a, b) {
    const result = Math.sign((a - b + this.#p + this.#n) % this.#n - this.#p);
    return vocab.get(result);
  };
}