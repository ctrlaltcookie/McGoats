const Util = require('../util');

/**
 * Throws an x sided dice y times
 * @param {*} dice Number of sides on the dice
 * @param {*} iterations Number of times to throw
 */
const roll = function (dice, iterations) {
  if (dice > 10000000000 || iterations > 450) {
    return `nothing, roll less than a 10000000000 sided dice or less than 450 iterations.`;
  }
  let rolls = [];
  for(let i = 0; i < iterations; i++) {
    rolls.push(Util.getRand(dice));
  }
  return rolls.sort().join(', ');
}

rollHidden = function (dice, iterations, threshold) {
  let success = false;
  for(let i = 0; i < iterations; i++) {
    if(Util.getRand(dice) >= threshold) {
      success = true;
    }
  }
  return success;
}

module.exports = {
  roll,
  rollHidden
}