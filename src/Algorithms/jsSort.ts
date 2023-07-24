import Trace from "../util/Trace";
import { swap } from "../util/utils";

const jsSort = (numbers: number[]) => {
  const trace = new Trace(numbers);

  const indexed = numbers.map((num, i) => ({
    id: i,
    num,
  }));

  const swapped = [...indexed];

  const sorted = indexed
    .sort((a, b) => {
      const s = a.num - b.num;

      const _a = swapped.findIndex((e) => e.id === a.id);
      const _b = swapped.findIndex((e) => e.id === b.id);

      trace.add(
        swapped.map((n) => n.num),
        { a: [_a, _b] }
      );

      if (s <= 0) {
        swap(swapped, _a, _b);
      }

      trace.add(
        swapped.map((n) => n.num),
        { b: [_a, _b] }
      );

      return s;
    })
    .map(({ num }) => num);

  trace.add(sorted, { sorted: [...numbers.keys()] });

  return trace.export();
};

export default jsSort;

export const name = "JavaScript Sort";

export const description =
  "Just for fun :D - Visualization does not work properly.";
