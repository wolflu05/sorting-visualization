import Trace from '../util/Trace';

const radixLSDSort = (numbers) => {
  const trace = new Trace(numbers);

  const getSortedList = (list, i) => {
    const table = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };

    for (const number of list) {
      const s = number.toString().padStart(i + 1, '0');
      table[Number(s[s.length - i - 1])].push(number);
    }

    const l = [];
    const groups = [];

    for (const nums of Object.values(table)) {
      const start = l.length;
      l.push(...nums);
      groups.push([start, l.length - 1]);
    }

    trace.add(l, { groups });

    return l;
  };

  const max = Math.max(...numbers).toString().length;

  let lastList = [...numbers];
  for (let i = 0; i < max; i++) {
    lastList = getSortedList(lastList, i);
  }

  trace.add(lastList, { sorted: lastList.keys() });

  return trace.export();
};

export default radixLSDSort;

export const name = 'radixLSD Sort';

export const colors = {};

export const description = 'radixLSD Sort. Does not visualize smoothly.';
