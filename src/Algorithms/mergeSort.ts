import Trace, { SortItem } from "../util/Trace";

const mergeSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  const _mergeSort = (numbers: SortItem[], start: number, end: number) => {
    const length = end - start;

    if (length <= 1) {
      return numbers;
    } else {
      const middle = Math.floor((start + end) / 2);

      trace.add(numbers, {
        a: numbers.slice(start, middle),
        groups: [[start, middle - 1]],
      });
      _mergeSort(numbers, start, middle);

      trace.add(numbers, {
        a: numbers.slice(middle, end),
        groups: [[middle, end - 1]],
      });
      _mergeSort(numbers, middle, end);

      return merge(numbers, start, middle, end);
    }
  };

  const merge = (
    numbers: SortItem[],
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
      let sorted = 0;
      if (start === 0 && end === numbers.length) {
        sorted = i;
      }

      if (left[leftStart].value <= right[rightStart].value) {
        trace.add(numbers, {
          b: [numbers[start + i]],
          sorted: numbers.slice(0, sorted),
          groups: [[start, end - 1]],
        });
        numbers[start + i] = left[leftStart];
        leftStart++;
        trace.add(numbers, {
          b: [numbers[start + i]],
          sorted: numbers.slice(0, sorted),
          groups: [[start, end - 1]],
        });
      } else {
        trace.add(numbers, {
          b: [numbers[start + i]],
          sorted: numbers.slice(0, sorted),
          groups: [[start, end - 1]],
        });
        numbers[start + i] = right[rightStart];
        rightStart++;
        trace.add(numbers, {
          b: [numbers[start + i]],
          sorted: numbers.slice(0, sorted),
          groups: [[start, end - 1]],
        });
      }
      i++;
    }

    while (leftStart < left.length) {
      let sorted = 0;
      if (start === 0 && end === numbers.length) {
        sorted = i;
      }

      trace.add(numbers, {
        b: [numbers[start + i]],
        sorted: numbers.slice(0, sorted),
        groups: [[start, end - 1]],
      });
      numbers[start + i] = left[leftStart];
      trace.add(numbers, {
        b: [numbers[start + i]],
        sorted: numbers.slice(0, sorted),
        groups: [[start, end - 1]],
      });
      leftStart++;
      i++;
    }

    while (rightStart < right.length) {
      let sorted = 0;
      if (start === 0 && end === numbers.length) {
        sorted = i;
      }

      trace.add(numbers, {
        b: [numbers[start + i]],
        sorted: numbers.slice(0, sorted),
        groups: [[start, end - 1]],
      });
      numbers[start + i] = right[rightStart];
      trace.add(numbers, {
        b: [numbers[start + i]],
        sorted: numbers.slice(0, sorted),
        groups: [[start, end - 1]],
      });
      rightStart++;
      i++;
    }

    return numbers;
  };

  _mergeSort(numbers, 0, numbers.length);

  trace.add(numbers, { sorted: [...numbers] });

  return trace.export();
};

export default mergeSort;

export const name = "Merge Sort";

export const colors = {
  a: "call merge sort",
  b: "override from memory",
};

export const animateMovements = false;

export const description = `Der „Merge-Sort“ zählt zu den fortgeschrittenen Algorithmen. Dieser macht sich das
 sogenannte „divide and conquer“ zu Deutsch „teilen und herrschen“ Verfahren zu nutze. Hierbei teilt er die Liste so
 lange in der Hälfte, bis sie nur noch aus einem Element besteht. Als nächstes werden die Listen für sich sortiert und
 folgend wieder zusammengesetzt. Das passiert wie bei den meisten Algorithmen rekursiv. Dieser läuft in der Regel aber
 nicht „in Place“, kann aber mit ein paar Tricks optimiert werden.`;

export const complexity = `„Merge-Sort“ hat im schlechtesten Fall eine Laufzeit von O(n log(n)). Das liegt an der
 Zerlegung der einzelnen Listen, da hier nicht wie zuvor für jedes Element die ganze Liste verarbeitet werden muss,
 sondern nur die Elemente im Reisverschlussprinzip in der richtigen Reihenfolge zusammengesetzt werden müssen.`;
