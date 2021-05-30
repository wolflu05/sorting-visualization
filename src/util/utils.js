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
