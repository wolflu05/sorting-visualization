export interface TraceEntry {
  numbers: number[];
  state: {
    a: number[];
    b: number[];
    c: number[];
    d: number[];
    groups: Array<[number, number]>;
    sorted: number[];
  };
}

export default class Trace {
  trace: TraceEntry[];

  constructor(numbers: number[]) {
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

  add(
    numbers: number[],
    {
      a = [],
      b = [],
      c = [],
      d = [],
      groups = [],
      sorted = [],
    }: {
      a?: number[];
      b?: number[];
      c?: number[];
      d?: number[];
      groups?: Array<[number, number]>;
      sorted?: number[];
    }
  ) {
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
