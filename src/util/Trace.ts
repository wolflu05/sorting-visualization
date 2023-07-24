import { generateRandomArray } from "./utils";

export const generateRandomNumbers = (
  size: number,
  range: [number, number]
): SortItem[] => {
  const preId = Math.random().toString(36).substring(2);
  return generateRandomArray(size, ...range).map((x, i) => ({
    id: `${preId}-${i}-${x}`,
    value: x,
  }));
};

export interface SortItem {
  id: string;
  value: number;
}

export interface TraceEntry {
  numbers: SortItem[];
  state: {
    a: string[];
    b: string[];
    c: string[];
    d: string[];
    groups: Array<[number, number]>;
    sorted: string[];
  };
}

export default class Trace {
  trace: TraceEntry[];

  constructor(numbers: SortItem[]) {
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
    numbers: SortItem[],
    {
      a = [],
      b = [],
      c = [],
      d = [],
      groups = [],
      sorted = [],
    }: {
      a?: SortItem[];
      b?: SortItem[];
      c?: SortItem[];
      d?: SortItem[];
      groups?: Array<[number, number]>;
      sorted?: SortItem[];
    }
  ) {
    try {
      this.trace.push({
        numbers: [...numbers],
        state: {
          a: [...a.map((x) => x.id)],
          b: [...b.map((x) => x.id)],
          c: [...c.map((x) => x.id)],
          d: [...d.map((x) => x.id)],
          groups: [...groups],
          sorted: [...sorted.map((x) => x.id)],
        },
      });
    } catch (e) {
      // useful for debugging to see call stack
      console.log(arguments, e);
      throw e;
    }
  }

  export() {
    return this.trace;
  }

  toJSON() {
    return JSON.stringify(this.export());
  }
}
