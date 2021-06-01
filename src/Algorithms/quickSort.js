import Trace from '../util/Trace';
import { swap } from '../util/utils';

const quickSort = (numbers) => {
  const trace = new Trace(numbers);

  const _quickSort = (low, high) => {
    if (low < high) {
      const pivot = divide(low, high);
      _quickSort(low, pivot - 1);
      _quickSort(pivot + 1, high);
    }
  };

  const divide = (low, high) => {
    let _low = low;
    let pivot = high;
    let _high = high - 1;

    while (_low < _high) {
      trace.add(numbers, { b: [_low], c: [_high], d: [pivot] });

      while (_low < high && numbers[_low] < numbers[pivot]) {
        _low++;
        trace.add(numbers, { b: [_low], c: [_high], d: [pivot] });
      }

      while (_high > low && numbers[_high] >= numbers[pivot]) {
        _high--;
        trace.add(numbers, { b: [_low], c: [_high], d: [pivot] });
      }

      if (_low < _high) {
        trace.add(numbers, {
          a: [_low, _high],
          b: [_low],
          c: [_high],
          d: [pivot],
        });
        swap(numbers, _low, _high);
        trace.add(numbers, {
          a: [_low, _high],
          b: [_low],
          c: [_high],
          d: [pivot],
        });
      }
    }

    if (numbers[_low] > numbers[pivot]) {
      trace.add(numbers, {
        a: [_low, pivot],
        b: [_low],
        c: [_high],
        d: [pivot],
      });
      swap(numbers, _low, pivot);
      trace.add(numbers, {
        a: [_low, pivot],
        b: [_low],
        c: [_high],
        d: [pivot],
      });
    }

    return _low;
  };

  _quickSort(0, numbers.length - 1);

  trace.add(numbers, { sorted: numbers.keys() });

  return trace.export();
};

export default quickSort;

export const name = 'Quick Sort';

export const colors = {
  a: 'swapping',
  b: 'low',
  c: 'high',
  d: 'pivot',
};

export const description = 'Quick sort';
