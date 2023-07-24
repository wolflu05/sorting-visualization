/**
 * Generate random integer in given range
 * From: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 */
export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * generate list from start to end [start; end)
 */
export const range = (start: number, end: number) =>
  [...Array(end - start).keys()].map((i) => i + start);

/**
 * Normalize value to 0-100 range
 * From: https://material-ui.com/components/progress/#non-standard-ranges
 */
export const normalize = (value: number, min: number, max: number) =>
  ((value - min) * 100) / (max - min);

/**
 * Generate random array
 */
export const generateRandomArray = (length: number, min: number, max: number) =>
  [...Array(length).keys()].map(() => randomInt(min, max));

/* Scale a value from one range to another
 * Example of use:
 *
 * // Convert 33 from a 0-100 range to a 0-65535 range
 * var n = scaleValue(33, [0,100], [0,65535]);
 *
 * // Ranges don't have to be positive
 * var n = scaleValue(0, [-50,+50], [0,65535]);
 *
 * Ranges are defined as arrays of two values, inclusive
 *
 * The ~~ trick on return value does the equivalent of Math.floor, just faster.
 *
 * See: https://gist.github.com/fpillet/993002
 */
export const scaleValue = (
  value: number,
  from: [number, number],
  to: [number, number]
) => {
  var scale = (to[1] - to[0]) / (from[1] - from[0]);
  var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return ~~(capped * scale + to[0]);
};

/**
 * Swap two elements at index a and b in an array in place
 */
export const swap = <T>(array: Array<T>, a: number, b: number) =>
  ([array[a], array[b]] = [array[b], array[a]]);

/**
 * Insert an item after a specific index
 */
export const insertAt = <T>(array: Array<T>, index: number, item: T) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];
