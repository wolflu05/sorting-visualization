import Trace from '../util/Trace';
import { range, swap } from '../util/utils';

const selectionSort = (numbers) => {
  const trace = new Trace(numbers);

  for (let sortedIndex = 0; sortedIndex < numbers.length; sortedIndex++) {
    let smallestIndex = sortedIndex;

    for (let e = sortedIndex; e < numbers.length; e++) {
      trace.add(numbers, {
        a: [e, smallestIndex],
        sorted: range(0, sortedIndex),
      });

      if (numbers[e] < numbers[smallestIndex]) {
        smallestIndex = e;
      }
    }

    trace.add(numbers, {
      b: [sortedIndex, smallestIndex],
      sorted: range(0, sortedIndex),
    });
    swap(numbers, sortedIndex, smallestIndex);
    trace.add(numbers, {
      b: [sortedIndex, smallestIndex],
      sorted: range(0, sortedIndex),
    });
  }

  trace.add(numbers, { sorted: numbers.keys() });

  return trace.export();
};

export default selectionSort;

export const name = 'Selection Sort';

export const colors = {
  a: 'comparing values',
  b: 'swapping values',
};

export const description = 'Selection Sort.';
