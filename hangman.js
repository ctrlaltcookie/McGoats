const Bleetify = require('./bleetify');
const Template = require('./hangmanTemplate');

const game = function (message, gamestate) {
  const guess = message.content.toLowerCase()[1];
  if (gamestate[guess]) {
    return message.channel.send(Bleetify(`You already guesed ${guess}`, 20));
  }
  if (gamestate.word.includes(guess)) {
    gamestate.mask.replace(new RegExp(guess, 'g'));
    gamestate[guess] = true;
    if (gamestate.word === gamestate.mask) {
      const word = gamestate.word;
      resetGame(gamestate);
      return message.channel.send(Bleetify(`${word}, ooooh! You got it!`, 20));
    }
    return message.channel.send(Bleetify(`${gamestate.mask}`, 20));
  }
  gamestate.turn++;
  if (gamestate.turn === 9) {
    const word = gamestate.word;
    resetGame(gamestate);
    return message.channel.send(Template[gamestate].join('\n') +
    `\n You lost, the word was ${word}`);
  }
  return message.channel.send(Template[gamestate].join('\n'));
}

const resetGame = function (gamestate) {
  gamestate = {
    playing: false,
    word: null,
    guessedLetters: {},
    turn: 0,
    mask: null
  };
}

module.exports = {
  game: game
}
