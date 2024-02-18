export default class Validation {
  constructor(args) {
    this.args = args;
  }

  check() {
    return this.#checkCount() && this.#checkOddness() && this.#checkDuplicates();
  }

  #checkCount() {
    if (this.args.length < 3) {
      console.log('To start you have to provide at least 3 arguments');
      return false;
    } else {
      return true;
    }
  }

  #checkOddness() {
    if (this.args.length % 2 === 0) {
      console.log('To start you have to provide odd count of arguments')
      return false;
    } else {
      return true;
    }
  }

  #checkDuplicates() {
    const uniqueArgs = new Set()

    this.args.forEach(arg => {
      uniqueArgs.add(arg);
    });

    if (this.args.length !== uniqueArgs.size) {
      console.log('There should be no duplicates in arguments')
      return false;
    } else {
      return true;
    }
  }
}