import Game from './Game.js';
import Validation from './Validation.js';

const args = process.argv.slice(2);
const validation = new Validation(args);


init();

function init() {
  if (!validation.check()) return
  new Game(args);
}