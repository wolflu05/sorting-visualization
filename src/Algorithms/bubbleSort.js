import Trace from '../util/Trace';
import { range, swap } from '../util/utils';

const bubbleSort = (numbers) => {
  const trace = new Trace(numbers);

  for (let sortedIndex = numbers.length; sortedIndex >= 0; sortedIndex--) {
    for (let e = 0; e < sortedIndex - 1; e++) {
      trace.add(numbers, {
        a: [e, e + 1],
        sorted: range(sortedIndex, numbers.length),
      });

      if (numbers[e] > numbers[e + 1]) {
        trace.add(numbers, {
          b: [e, e + 1],
          sorted: range(sortedIndex, numbers.length),
        });
        swap(numbers, e, e + 1);
        trace.add(numbers, {
          b: [e, e + 1],
          sorted: range(sortedIndex, numbers.length),
        });
      }
    }
  }

  trace.add(numbers, { sorted: numbers.keys() });

  return trace.export();
};

export default bubbleSort;

export const name = 'Bubble Sort';

export const colors = {
  a: 'comparing values',
  b: 'swapping values',
};

export const description = 'Bubble Sort.';
