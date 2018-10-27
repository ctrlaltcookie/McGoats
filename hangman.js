const Bleetify = require('./bleetify');
const Template = require('./hangmanTemplate');
const Words = require('./words_dictionary');

const game = function (message, gamestate) {
  const guess = message.content.toLowerCase()[1];
  if (gamestate[guess]) {
    return message.channel.send(Bleetify(`You already guesed ${guess}`, 20));
  }
  if (gamestate.word.includes(guess)) {
    unmask(gamestate, guess);
    gamestate[guess] = true;
    if (gamestate.word === gamestate.mask) {
      const word = gamestate.word;
      reset(gamestate);
      return message.channel.send(Bleetify(`${word}, ooooh! You got it!`, 20));
    }
    return message.channel.send(Bleetify(`\`\`\`${gamestate.mask}\`\`\``, 20));
  }
  gamestate.turn++;
  if (gamestate.turn === 9) {
    const word = gamestate.word;
    reset(gamestate);
    return message.channel.send(Template[gamestate].join('\n') +
    `\n You lost, the word was ${word}`);
  }
  return message.channel.send(Template[gamestate].join('\n'));
}

const setup = function () {
  const maxLength = Object.keys(Words).length;
  const word = Words[getRand(maxLength)];
  return { word, mask: '_'.repeat(word.length) };
}

const unmask = function (gamestate, guess) {
  let edit = gamestate.word;
  while(edit.indexOf(guess) > -1) {
    const index = edit.indexOf(guess);
    if (index) {
      gamestate.mask = gamestate.mask.substr(0, index) + guess + gamestate.mask.substr(index + 1);
      edit = edit.substr(0, index) + ' ' + edit.substr(index + 1);;
    }
  }
}

/**
 * Returns a random number between 1 and max;
 */
function getRand(max) {
  return Math.random() * (max - 1) + 1;
}

const reset = function (gamestate) {
  gamestate = {
    playing: false,
    word: null,
    guessedLetters: {},
    turn: 0,
    mask: null
  };
}

module.exports = {
  game,
  reset,
  setup
}
