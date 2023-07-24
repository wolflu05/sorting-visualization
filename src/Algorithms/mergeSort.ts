import Trace from "../util/Trace";
import { range } from "../util/utils";

const mergeSort = (numbers: number[]) => {
  const trace = new Trace(numbers);

  const _mergeSort = (numbers: number[], start: number, end: number) => {
    const length = end - start;

    if (length <= 1) {
      return numbers;
    } else {
      const middle = Math.floor((start + end) / 2);

      trace.add(numbers, {
        a: range(start, middle),
        groups: [[start, middle - 1]],
      });
      _mergeSort(numbers, start, middle);

      trace.add(numbers, {
        a: range(middle, end),
        groups: [[middle, end - 1]],
      });
      _mergeSort(numbers, middle, end);

      return merge(numbers, start, middle, end);
    }
  };

  const merge = (
    numbers: number[],
    start: number,
    middle: number,
    end: number
  ) => {
    const left = numbers.slice(start, middle);
    const right = numbers.slice(middle, end);

    let leftStart = 0;
    let rightStart = 0;
    let i = 0;

    while (leftStart < left.length && rightStart < right.length) {
      let sorted: number[] = [];
      if (start === 0 && end === numbers.length) {
        sorted = range(0, i);
      }

      if (left[leftStart] <= right[rightStart]) {
        trace.add(numbers, {
          b: [start + i],
          sorted,
          groups: [[start, end - 1]],
        });
        numbers[start + i] = left[leftStart];
        leftStart++;
        trace.add(numbers, {
          b: [start + i],
          sorted,
          groups: [[start, end - 1]],
        });
      } else {
        trace.add(numbers, {
          b: [start + i],
          sorted,
          groups: [[start, end - 1]],
        });
        numbers[start + i] = right[rightStart];
        rightStart++;
        trace.add(numbers, {
          b: [start + i],
          sorted,
          groups: [[start, end - 1]],
        });
      }
      i++;
    }

    while (leftStart < left.length) {
      let sorted: number[] = [];
      if (start === 0 && end === numbers.length) {
        sorted = range(0, i);
      }

      trace.add(numbers, {
        b: [start + i],
        sorted,
        groups: [[start, end - 1]],
      });
      numbers[start + i] = left[leftStart];
      leftStart++;
      i++;
      trace.add(numbers, {
        b: [start + i],
        sorted,
        groups: [[start, end - 1]],
      });
    }

    while (rightStart < right.length) {
      let sorted: number[] = [];
      if (start === 0 && end === numbers.length) {
        sorted = range(0, i);
      }

      trace.add(numbers, {
        b: [start + i],
        sorted,
        groups: [[start, end - 1]],
      });
      numbers[start + i] = right[rightStart];
      rightStart++;
      i++;
      trace.add(numbers, {
        b: [start + i],
        sorted,
        groups: [[start, end - 1]],
      });
    }

    return numbers;
  };

  _mergeSort(numbers, 0, numbers.length);

  trace.add(numbers, { sorted: [...numbers.keys()] });

  return trace.export();
};

export default mergeSort;

export const name = "Merge Sort";

export const colors = {
  a: "call merge sort",
  b: "override from memory",
};

export const description = `Der „Merge-Sort“ zählt zu den fortgeschrittenen Algorithmen. Dieser macht sich das
 sogenannte „divide and conquer“ zu Deutsch „teilen und herrschen“ Verfahren zu nutze. Hierbei teilt er die Liste so
 lange in der Hälfte, bis sie nur noch aus einem Element besteht. Als nächstes werden die Listen für sich sortiert und
 folgend wieder zusammengesetzt. Das passiert wie bei den meisten Algorithmen rekursiv. Dieser läuft in der Regel aber
 nicht „in Place“, kann aber mit ein paar Tricks optimiert werden.`;

export const complexity = `„Merge-Sort“ hat im schlechtesten Fall eine Laufzeit von O(n log(n)). Das liegt an der
 Zerlegung der einzelnen Listen, da hier nicht wie zuvor für jedes Element die ganze Liste verarbeitet werden muss,
 sondern nur die Elemente im Reisverschlussprinzip in der richtigen Reihenfolge zusammengesetzt werden müssen.`;
