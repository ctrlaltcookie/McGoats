const Bleetify = require('bleetify');
const Template = require('./hangmanTemplate');
const { words } = require('./words');
const Util = require('../../util');
const tick = '`';

const play = function (message, gamestate) {
  const guess = message.content.toLowerCase()[1];
  if (gamestate.guessedLetters[guess]) {
    return message.channel.send(Bleetify.bleet(`You already guessed ${guess}`, 20));
  }
  gamestate.guessedLetters[guess] = true;
  if (gamestate.word.includes(guess)) {
    unmask(gamestate, guess);
    if (gamestate.word === gamestate.mask) {
      return win(gamestate, message);
    }
    const ticks = '```';
    return message.channel.send(Bleetify.bleet(guessedLetters(gamestate) + '\n' + ticks + `${gamestate.mask}` + ticks, 20));
  }
  gamestate.turn++;
  if (gamestate.turn === 9) {
    const word = gamestate.word;
    gamestate.playing = false;
    return message.channel.send(Template[9].join('\n') +
    `\n You lost, the word was ${word}`);
  }
  return message.channel.send(`Current word: ${tick}${gamestate.mask}${tick} \n` +
  guessedLetters(gamestate) +
    Template[gamestate.turn].join('\n'));
};

const guessedLetters = function (gamestate) {
  return `Guessed letters ${tick}${Object.keys(gamestate.guessedLetters).join(', ')}${tick} \n`;
};

const setup = function () {
  const maxLength = words.length;
  const index = Util.getRand(maxLength);
  const word = words[index];
  return { word: word.toLowerCase(), mask: '_'.repeat(word.length) };
};

const unmask = function (gamestate, guess) {
  let edit = gamestate.word;
  while (edit.indexOf(guess) > -1) {
    const index = edit.indexOf(guess);
    if (index > -1) {
      gamestate.mask = gamestate.mask.substr(0, index) + guess + gamestate.mask.substr(index + 1);
      edit = edit.substr(0, index) + ' ' + edit.substr(index + 1);
    }
  }
};

const win = function (gamestate, message) {
  const word = gamestate.word;
  gamestate.playing = false;
  return message.channel.send(Bleetify.bleet(`${tick}${word}${tick}, ooooh! You got it!`, 20));
};

const reset = function () {
  return {
    playing: false,
    word: null,
    guessedLetters: {},
    turn: 0,
    mask: null
  };
};

const currentState = function(message, gamestate) {
  return message.channel.send(`Current word: ${tick}${gamestate.mask}${tick} \n` +
  guessedLetters(gamestate));
};

module.exports = {
  currentState,
  play,
  reset,
  setup,
  win
};
