const Util = require('../util');

/**
 * Throws an x sided dice y times
 * @param {*} dice Number of sides on the dice
 * @param {*} iterations Number of times to throw
 */
const roll = function (dice, iterations) {
  if (dice >= 100000000 || iterations >= 10000) {
    return ` - nothing, cos you were being a dick, dice don't need 100000000 sides nor do you need to roll them 10k times, be sensible.`;
  }
  let rolls = [];
  for(let i = 0; i < iterations; i++) {
    rolls.push(Util.getRand(dice));
  }
  return rolls.join(', ');
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