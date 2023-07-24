import Trace, { SortItem } from "../util/Trace";
import { swap } from "../util/utils";

const quickSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  const _quickSort = (low: number, high: number) => {
    if (low < high) {
      const pivot = divide(low, high);
      _quickSort(low, pivot - 1);
      _quickSort(pivot + 1, high);
    }
  };

  const divide = (low: number, high: number) => {
    let _low = low;
    let pivot = high;
    let _high = high - 1;

    while (_low < _high) {
      trace.add(numbers, {
        b: [numbers[_low]],
        c: [numbers[_high]],
        d: [numbers[pivot]],
        groups: [[low, high]],
      });

      while (_low < high && numbers[_low].value < numbers[pivot].value) {
        _low++;
        trace.add(numbers, {
          b: [numbers[_low]],
          c: [numbers[_high]],
          d: [numbers[pivot]],
          groups: [[low, high]],
        });
      }

      while (_high > low && numbers[_high].value >= numbers[pivot].value) {
        _high--;
        trace.add(numbers, {
          b: [numbers[_low]],
          c: [numbers[_high]],
          d: [numbers[pivot]],
          groups: [[low, high]],
        });
      }

      if (_low < _high) {
        trace.add(numbers, {
          a: [numbers[_low], numbers[_high]],
          b: [numbers[_low]],
          c: [numbers[_high]],
          d: [numbers[pivot]],
          groups: [[low, high]],
        });
        swap(numbers, _low, _high);
        trace.add(numbers, {
          a: [numbers[_low], numbers[_high]],
          b: [numbers[_low]],
          c: [numbers[_high]],
          d: [numbers[pivot]],
          groups: [[low, high]],
        });
      }
    }

    if (numbers[_low].value > numbers[pivot].value) {
      trace.add(numbers, {
        a: [numbers[_low], numbers[pivot]],
        b: [numbers[_low]],
        c: [numbers[_high]],
        d: [numbers[pivot]],
        groups: [[low, high]],
      });
      swap(numbers, _low, pivot);
      trace.add(numbers, {
        a: [numbers[_low], numbers[pivot]],
        b: [numbers[_low]],
        c: [numbers[_high]],
        d: [numbers[pivot]],
        groups: [[low, high]],
      });
    }

    return _low;
  };

  _quickSort(0, numbers.length - 1);

  trace.add(numbers, { sorted: [...numbers] });

  return trace.export();
};

export default quickSort;

export const name = "Quick Sort";

export const colors = {
  a: "swapping",
  b: "low",
  c: "high",
  d: "pivot",
};

export const description = `Den „Quick-Sort“ kann man wie „Merge-Sort“ zu den fortgeschrittenen Sortierverfahren
 zählen. Dieser ist jedoch um einiges komplexer, da man nicht direkt versteht, wie sich am Ende daraus eine sortierte
 Liste ergibt. Der „Quick-Sort“ arbeitet auch wieder Rekursiv. Als erstes legt er drei Positionen in der Liste, mit der
 er aufgerufen wird, fest. Den Start, der das erste Element darstellt. Das Ende, dass sich nicht wie vermutlich gedacht
 am Ende, sondern ein Element vorher befindet. Und ein sogenanntes Pivot Element, das im weiteren Verlauf für den
 Algorithmus wichtig wird. Als nächstes werden die zu sortierenden Elemente mit dem Pivot Element verglichen und einen
 Bereich am Anfang, der kleiner ist als das Pivot Element und einen der größer ist, als das Pivot Element am Ende
 gebildet. Als nächstes wird mit einem rekursiven Aufruf auf die beiden nun entstandenen Teillisten erneut Start, Ende
 und Pivot Element festgelegt und wieder in zwei Teillisten aufgeteilt. Dies wird solange wiederholt, bis die Listen
 nur noch aus zwei Elementen bestehen.`;

export const complexity = `Das „Quick-Sort“ Verfahren ist, wie der Name sagt, extrem schnell und effizient. Hängt aber
 auch von der Wahl des Pivot Elements ab, da ein zu großes oder kleines Pivot Element den Nachteil hat, dass der
 Algorithmus öfters aufgerufen werden muss, was eine „worst-case“ Laufzeit von  O(n^2) zur Folge hat. Statistisch
 gesehen, ist aber das letzte Element in den meisten Fällen eines aus der mittleren Spanne. Dies kann man mithilfe des
 „Median-of-medians-Algorithmus“ umgehen und mit einer Laufzeit von O(n)  den Median bestimmen und als Pivot Element
 nutzen. Dann lässt sich auch eine maximale Laufzeit von  O(n log(n)) garantieren.`;
