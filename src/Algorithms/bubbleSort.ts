import Trace, { SortItem } from "../util/Trace";
import { swap } from "../util/utils";

const bubbleSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  for (let sortedIndex = numbers.length; sortedIndex >= 0; sortedIndex--) {
    for (let e = 0; e < sortedIndex - 1; e++) {
      trace.add(numbers, {
        a: [numbers[e], numbers[e + 1]],
        groups: [[e, e + 1]],
        sorted: numbers.slice(sortedIndex, numbers.length),
      });

      if (numbers[e].value > numbers[e + 1].value) {
        trace.add(numbers, {
          b: [numbers[e], numbers[e + 1]],
          groups: [[e, e + 1]],
          sorted: numbers.slice(sortedIndex, numbers.length),
        });
        swap(numbers, e, e + 1);
        trace.add(numbers, {
          b: [numbers[e], numbers[e + 1]],
          groups: [[e, e + 1]],
          sorted: numbers.slice(sortedIndex, numbers.length),
        });
      }
    }
  }

  trace.add(numbers, { sorted: [...numbers] });

  return trace.export();
};

export default bubbleSort;

export const name = "Bubble Sort";

export const colors = {
  a: "comparing values",
  b: "swapping values",
};

export const description = `Das „Bubble-Sort“ Verfahren bildet, wie der Name sagt, immer eine „Bubble“, eine Blase.
 Hier findet man den unsortierten Bereich auf der linken und den sortierten Bereich auf der rechten Seite. Der
 Algorithmus vergleicht dabei immer die aktuelle Zahl und seinen rechten Nachbarn. Ist dieser größer, ist der Nachbar
 das nächste Element. Ist dieser aber kleiner, so werden die beiden vorher einfach vertauscht und wie bei einem
 größeren Nachbarn fortgefahren. Diese Folge wir nun so lange wiederholt, bis man am Ende der unsortierten Liste
 angekommen ist. Zu diesem Zeitpunkt hat man das größte Element aus dem linken Teil der Liste in den Rechten gebracht.
 Dies wird nun so lange durchgeführt, bis der erste Bereich keine Elemente mehr enthält.`;

export const complexity = `Ebenfalls wie die ersten beiden Algorithmen hat „Bubble-Sort“ eine Zeitkomplexität von
 O(n^2), da auch hier für jedes Element im schlechtesten Fall einmal durch die ganze Liste gegangen werden muss.
 Ebenfalls wie beim „Insertion-Sort“ ist die Laufzeit im besten Fall nur O(n), falls die Elemente sich schon sortiert
 in der Liste befinden.`;
