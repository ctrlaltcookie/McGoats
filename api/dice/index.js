const Util = require('../util');

/**
 * Throws an x sided dice y times
 * @param {int} sides Number of sides on the dice
 * @param {int} diceToRoll Number of dice to roll
 * @param {int} modifier The modifier being added to the roll
 * @param {int} challenge The number to beat for a successful roll
 */
const roll = function (sides, diceToRoll, modifier, challenge) {

  if (sides > 10000000000 || diceToRoll > 450) {
    return `nothing, roll less than a 10000000000 sided dice or less than 450 iterations.`;
  }

  let rolls = [];

  for (let i = 0; i < diceToRoll; i++) {
    let result = Util.getRand(sides)
    if (modifier) {
      if (modifier[0] === '-') {
        result -= parseInt(modifier.split('-').pop(), 10);
      } else {
        result += parseInt(modifier.split('+').pop(), 10);
      }
    }
    rolls.push(result);
  }

  let results = rolls.sort().join(', ');

  if (challenge) {
    let successes = 0;
    if (challenge[0] === '>') {
      rolls.forEach(roll => {
        if (roll >= parseInt(challenge.split('>').pop(), 10)) {
          successes++;
        }
      });
    } else {
      rolls.forEach(roll => {
        if (roll <= parseInt(challenge.split('<').pop(), 10)) {
          successes++;
        }
      });
    }
    results += `, for ${successes} successes`;
  }

  if (results === undefined || results === '') {
    return 'nothing because you\'re being silly';
  }

  return results;
}

module.exports = {
  roll
}