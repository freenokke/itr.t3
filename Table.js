import AsciiTable from "ascii-table";

export default class Table {
  #rule;
  #table;

  constructor(ruleInstance) {
    this.#rule = ruleInstance;
  }

  init(args) {
    this.#generateTable(args);
  }

  drawTable() {
    console.log(this.#table.toString());
  }

  #generateTable(args) {
    this.#table = AsciiTable.factory({
      heading: ["↓ PC / User →", ...args],
      rows: this.#createRows(args),
    });
  }

  #createRows(args) {
    return args.map((arg) => {
      const row = [arg];
      for (let i = 0; i < args.length; i++) {
        row.push(this.#rule.determineWinner(args.indexOf(arg), i));
      }
      return row;
    });
  }
}
