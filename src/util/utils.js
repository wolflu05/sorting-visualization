/**
 * Generate random integer in given range
 * From: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * generate list from start to end [start; end)
 * @param {Number} start
 * @param {Number} end
 * @returns {List}
 */
export const range = (start, end) =>
  [...Array(end - start).keys()].map((i) => i + start);

/**
 * Normalize value to 0-100 range
 * From: https://material-ui.com/components/progress/#non-standard-ranges
 * @param {Number} value value to normalize
 * @param {Number} min values min range
 * @param {Number} max values max range
 * @returns
 */
export const normalize = (value, min, max) =>
  ((value - min) * 100) / (max - min);

/**
 * Generate random array
 * @param {Number} length arrays length
 * @param {Number} min minimum value for entries
 * @param {Number} max maximum value for entries
 * @returns {Array} array with random numbers
 */
export const generateRandomArray = (length, min, max) =>
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
export const scaleValue = (value, from, to) => {
  var scale = (to[1] - to[0]) / (from[1] - from[0]);
  var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return ~~(capped * scale + to[0]);
};

/**
 * Swap two elements in an array
 * @param {Array} array
 * @param {Number} a index of a
 * @param {Number} b index of b
 * @returns {Array} swapped elements
 */
export const swap = (array, a, b) =>
  ([array[a], array[b]] = [array[b], array[a]]);
