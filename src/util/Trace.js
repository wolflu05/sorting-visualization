export default class Trace {
  constructor(numbers) {
    this.trace = [
      {
        numbers: [...numbers],
        state: {
          a: [],
          b: [],
          c: [],
          d: [],
          groups: [],
          sorted: [],
        },
      },
    ];
  }

  add(numbers, { a = [], b = [], c = [], d = [], groups = [], sorted = [] }) {
    this.trace.push({
      numbers: [...numbers],
      state: {
        a: [...a],
        b: [...b],
        c: [...c],
        d: [...d],
        groups: [...groups],
        sorted: [...sorted],
      },
    });
  }

  export() {
    return this.trace;
  }

  toJSON() {
    return JSON.stringify(this.export());
  }
}
