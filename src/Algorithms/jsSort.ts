import Trace, { SortItem } from "../util/Trace";

const jsSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  const sorted = numbers.sort((a, b) => {
    const s = a.value - b.value;

    trace.add(numbers, { a: [a], b: [b] });

    return s;
  });

  trace.add(sorted, { sorted: [...numbers] });

  return trace.export();
};

export default jsSort;

export const colors = {
  a: "A pointer",
  b: "B pointer",
};

export const name = "JavaScript Sort";

export const description =
  "Just for fun :D - Visualization does not work properly.";
