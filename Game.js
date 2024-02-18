import Table from './Table.js';
import Rule from './Rule.js';
import KeyGenerator from './keyGenerator.js';
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const messages = {
  'Win': 'You win!',
  'Lose': 'You lose!',
  'Draw': 'Draw'
}

export default class Game {
  #rl = readline.createInterface({ input, output });
  #keyGenerator = new KeyGenerator();
  #table;
  #rule;
  #computerMove;

  constructor(args) {
    this.moves = args
    this.#rule = new Rule(args.length);
    this.#table = new Table(this.#rule);
    this.#table.init(args);

    this.#launch()
  }

  get #randomMove() {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    this.#computerMove = this.moves[randomIndex];
    return this.#computerMove;
  }

  #launch() {
    console.log('Добро пожаловать в игру')
    this.#showHmac();
    this.#renderMoves();
    this.#askForMove();
  }

  #showComputerStep() {
    console.log(`Computer move: ${this.#computerMove}`)
  }

  #showResult(userMove) {
    const result = this.#rule.determineWinner(
      this.moves.indexOf(this.#computerMove),
      this.moves.indexOf(userMove)
    );
    console.log(messages[result])
    console.log(`HMAC key: ${this.#keyGenerator.key}`)
  }

  #askForMove() {
    this.#rl.question('Enter your move: ', (answer) => {
      if (answer === '0') {
        console.log('Game is over');
        this.#rl.close();
        return
      }

      if (answer === '?') {
        this.#table.drawTable();
        this.#askForMove()
        return
      }

      if (!this.moves[answer - 1]) {
        console.log('Wrong move')
        this.#askForMove()
        return;
      }

      console.log(`Your move: ${this.moves[answer - 1]}`);
      this.#showComputerStep()
      this.#showResult(this.moves[answer - 1])
      this.#rl.close()
    });
  }

  #showHmac() {
    const hmac = this.#keyGenerator.generateHMAC(this.#randomMove)
    console.log(`HMAC: ${hmac}`)
  }

  #renderMoves() {
    console.log('Available moves:')
    for (let i = 1; i <= this.moves.length; i++) {
      console.log(`${i} - ${this.moves[i - 1]}`)
    }
    console.log('0 - exit')
    console.log('? - help')
  }
}