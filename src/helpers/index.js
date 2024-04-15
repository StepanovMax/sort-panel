/**
 * A sorting default function.
 * @param {array} Array to sort.
 * @returns {array} Objects array.
 */
function defaultSorting(array) {
  return array.sort((a, b) => b.rating.rate - a.rating.rate);
};


export {
  defaultSorting,
}