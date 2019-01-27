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

  const validation = validateInputs(sides, diceToRoll, modifier, challenge);

  if (validation) {
    return validation;
  }

  const rolls = [];

  for (let i = 0; i < diceToRoll; i++) {
    let result = Util.getRand(sides);
    if (modifier) {
      if (modifier[0] === '-') {
        result -= parseInt(modifier.split('-').pop(), 10);
      } else {
        result += parseInt(modifier.split('+').pop(), 10);
      }
    }
    rolls.push(result);
  }

  let results = rolls.sort((a,b) => a - b).join(', ');

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

  return results;
};

const validateInputs = function (sides, diceToRoll, modifier, challenge) {
  const sidesParsed = parseInt(sides, 10);
  const diceParsed = parseInt(diceToRoll, 10);
  let modifierParsed = null;
  let challengeParsed = null;
  if (modifier) {
    modifierParsed = (modifier[0] === '-') ? parseInt(modifier.split('-').pop(), 10) : parseInt(modifier.split('+').pop(), 10);
  }
  if (challenge) {
    challengeParsed = (challenge[0] === '>') ? parseInt(challenge.split('>').pop(), 10) : parseInt(challenge.split('<').pop(), 10);
  }
  if (isNaN(sidesParsed + diceParsed + modifierParsed + challengeParsed)) {
    return 'Please supply a valid format dice roll such as !roll 1d6+2>7';
  }
};


const _stripBang = function (content) {
  const command = content.split(' ');
  command.shift();
  return command.join('');
};

const _getChallenge = function (command) {
  if (command.includes('>')) {
    return '>' + command.split('>').pop();
  }
  if (command.includes('<')) {
    return '<' + command.split('<').pop();
  }
};

const _getNumSides = function (command) {
  let dice = command.split('d').pop();
  if (dice.includes('-')) {
    dice = dice.split('-').shift();
  }
  if (dice.includes('+')) {
    dice = dice.split('+').shift();
  }
  if (dice.includes('>')) {
    dice = dice.split('>').shift();
  }
  if (dice.includes('<')) {
    dice = dice.split('<').shift();
  }
  return dice;
};

const _getIterations = function (command) {
  let iterations = command.split('d').shift();
  if (iterations.includes('-')) {
    iterations = iterations.split('-').shift();
  }
  if (iterations.includes('+')) {
    iterations = iterations.split('+').shift();
  }
  if (iterations.includes('>')) {
    iterations = iterations.split('>').shift();
  }
  if (iterations.includes('<')) {
    iterations = iterations.split('<').shift();
  }
  return iterations;
};

const _getModifier = function (command) {
  let modifier = command.split('d').pop();
  if (modifier.includes('-')) {
    modifier = '-' + modifier.split('-').pop();
  } else if (modifier.includes('+')) {
    modifier = '+' + modifier.split('+').pop();
  } else {
    modifier = null;
  }
  if (modifier && modifier.includes('>')) {
    modifier = modifier.split('>').shift();
  }
  if (modifier && modifier.includes('<')) {
    modifier = modifier.split('<').shift();
  }
  return modifier;
};

const getDiceOptions = function (content) {
  const command = _stripBang(content);
  const numSides = _getNumSides(command);
  const challenge = _getChallenge(command);
  const diceToRoll = _getIterations(command);
  const modifier = _getModifier(command);
  return { command, numSides, challenge, diceToRoll, modifier };
};

module.exports = {
  getDiceOptions,
  roll
};
