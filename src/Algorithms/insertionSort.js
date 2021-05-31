import Trace from '../util/Trace';
import { range } from '../util/utils';

const insertionSort = (numbers) => {
  const trace = new Trace(numbers);

  for (const i of range(0, numbers.length)) {
    const value = numbers[i];
    let hole = i;

    trace.add(numbers, { a: [i], c: range(0, i) });

    while (hole > 0 && numbers[hole - 1] > value) {
      numbers[hole] = numbers[hole - 1];
      trace.add(numbers, { b: [hole - 1], c: range(0, i + 1) });
      hole--;
    }

    numbers[hole] = value;

    trace.add(numbers, {
      a: [hole],
      c: range(0, i + 1),
    });
  }

  trace.add(numbers, { sorted: numbers.keys() });

  return trace.export();
};

export default insertionSort;

export const name = 'Insertion Sort';

export const description = 'Insertion sort.';
