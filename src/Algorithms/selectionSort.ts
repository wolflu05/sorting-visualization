import Trace from "../util/Trace";
import { range, swap } from "../util/utils";

const selectionSort = (numbers: number[]) => {
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

  trace.add(numbers, { sorted: [...numbers.keys()] });

  return trace.export();
};

export default selectionSort;

export const name = "Selection Sort";

export const colors = {
  a: "comparing values",
  b: "swapping values",
};

export const description = `Der „Selection-Sort“ Algorithmus ist eines der einfachsten Sortierverfahren. Dieser
 durchläuft eine Liste so oft, wie diese lang ist. Jeden Durchlauf selektiert (wie der Name sagt) er dabei im noch
  nicht sortieren Bereich (auf der rechten Seite) das kleinste Element und tauscht dieses mit dem ersten Element, das
   nach dem sortieren Bereich (auf der linken Seite) folgt, sodass die unsortierte Liste immer kleiner wird. Dieses 
   Verfahren arbeitet „in Place“ und kann so ohne mehr Speicherbedarf auch gigantisch große Listen sortieren.`;

export const complexity = `Der „Selection-Sort“ läuft in einer Komplexität von O(n^2), da dieser für jedes Element
 einmal die ganze Liste durchgehen muss. Wenn man dies nun gut verstanden hat, sollte einem aufgefallen sein, dass es
 jeden Durchlauf ein Element weniger wird. Dies lässt sich aber bei O(n^2) vernachlässigen.`;
