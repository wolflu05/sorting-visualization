import Trace from '../util/Trace';
import { range } from '../util/utils';

const mergeSort = (numbers) => {
  const trace = new Trace(numbers);

  const _mergeSort = (numbers, start, end) => {
    const length = end - start;

    if (length <= 1) {
      return numbers;
    } else {
      const middle = Math.floor((start + end) / 2);

      trace.add(numbers, { a: range(start, middle) });
      _mergeSort(numbers, start, middle);

      trace.add(numbers, { a: range(middle, end) });
      _mergeSort(numbers, middle, end);

      return merge(numbers, start, middle, end);
    }
  };

  const merge = (numbers, start, middle, end) => {
    const left = numbers.slice(start, middle);
    const right = numbers.slice(middle, end);

    let leftStart = 0;
    let rightStart = 0;
    let i = 0;

    while (leftStart < left.length && rightStart < right.length) {
      let sorted = [];
      if (start === 0 && end === numbers.length) {
        sorted = range(0, i);
      }

      if (left[leftStart] <= right[rightStart]) {
        trace.add(numbers, { b: [start + i], sorted });
        numbers[start + i] = left[leftStart];
        leftStart++;
        trace.add(numbers, { b: [start + i], sorted });
      } else {
        trace.add(numbers, { b: [start + i], sorted });
        numbers[start + i] = right[rightStart];
        rightStart++;
        trace.add(numbers, { b: [start + i], sorted });
      }
      i++;
    }

    while (leftStart < left.length) {
      let sorted = [];
      if (start === 0 && end === numbers.length) {
        sorted = range(0, i);
      }

      trace.add(numbers, { b: [start + i], sorted });
      numbers[start + i] = left[leftStart];
      leftStart++;
      i++;
      trace.add(numbers, { b: [start + i], sorted });
    }

    while (rightStart < right.length) {
      let sorted = [];
      if (start === 0 && end === numbers.length) {
        sorted = range(0, i);
      }

      trace.add(numbers, { b: [start + i], sorted });
      numbers[start + i] = right[rightStart];
      rightStart++;
      i++;
      trace.add(numbers, { b: [start + i], sorted });
    }

    return numbers;
  };

  _mergeSort(numbers, 0, numbers.length);

  trace.add(numbers, { sorted: numbers.keys() });

  return trace.export();
};

export default mergeSort;

export const name = 'Merge Sort';

export const description = 'Simple merge sort';
