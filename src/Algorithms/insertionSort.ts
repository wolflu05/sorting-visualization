import Trace from "../util/Trace";
import { range } from "../util/utils";

const insertionSort = (numbers: number[]) => {
  const trace = new Trace(numbers);

  for (const i of range(0, numbers.length)) {
    const value = numbers[i];
    let hole = i;

    trace.add(numbers, { a: [i], c: range(0, i) });

    while (hole > 0 && numbers[hole - 1] > value) {
      numbers[hole] = numbers[hole - 1];

      const copy = [...numbers];
      copy[hole - 1] = value;
      trace.add(copy, { a: [hole - 1], c: range(0, i + 1) });

      hole--;
    }

    numbers[hole] = value;

    trace.add(numbers, {
      b: [hole],
      c: range(0, i + 1),
    });
  }

  trace.add(numbers, { sorted: [...numbers.keys()] });

  return trace.export();
};

export default insertionSort;

export const name = "Insertion Sort";

export const colors = {
  a: "selected value",
  b: "write selected value",
  c: "sorted area",
};

export const description = `Der „Insertion-Sort“ Algorithmus arbeitet fast genauso trivial wie der „Selection-Sort“.
 Allerdings fügt dieser, wie der Name sagt, das jeweilige Element ein. Dabei hat dieser auch wieder einen sortierten
 Teil links, und unsortierten rechts neben dem aktuellen Element in der Liste. Bei jedem Durchlauf zieht er dabei sein
 aktuelles Element in den Zwischenspeicher und schiebt die Elemente des sortierten Bereiches so lange um eins nach 
 rechts, bis das Element aus dem Zwischenspeicher dazwischen passt. Dieser Algorithmus arbeitet demzufolge ebenso „in
 Place“.`;

export const complexity = `Der „Insertion-Sort“ erzielt auch wie der „Selection-Sort“ eine Komplexität von ungefähr
  O(n^2). Anders als beim „Selection-Sort“, kann der „Insertion-Sort“ im besten Fall auch eine Komplexität von O(n)
  erzielen, falls die Liste schon sortiert ist, da dann jedes Element nur einmal angefasst und mit dem Vordermann 
  verglichen werden muss.`;
