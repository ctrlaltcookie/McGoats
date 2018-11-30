const Util = require('../util');

/**
 * Throws an x sided dice y times
 * @param {int} dice Number of sides on the dice
 * @param {int} iterations Number of times to throw
 * @param {int} modifier 
 */
const roll = function (dice, iterations, modifier, challenge) {
  if (dice > 10000000000 || iterations > 450) {
    return `nothing, roll less than a 10000000000 sided dice or less than 450 iterations.`;
  }
  let rolls = [];
  for (let i = 0; i < iterations; i++) {
    let result = Util.getRand(dice)
    if (modifier) {
      if (modifier[0] === '-') {
        result -= parseInt(modifier.split('-').pop(), 10);
      } else {
        result += parseInt(modifier.split('+').pop(), 10);
      }
    }
    rolls.push(result);
  }

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

    return `${successes} successes`;
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