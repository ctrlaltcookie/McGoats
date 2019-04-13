const Discord = require('discord.js');
const Fs = require('fs');

const { Bleetify } = require('./bleetify');

const Hangman = require('./games/hangman');
const Routes = require('./routes');
const token = require('./token');
const Util = require('./util');
const Vote = require('./vote');

let hangmanState = {
  playing: false,
  word: null,
  guessedLetters: {},
  turn: 0,
  mask: null
};

// Create an instance of a Discord client
const client = new Discord.Client();

const extractCommand = function(userInput) {
  if (!userInput.startsWith('!')) {
    return false;
  }
  const bangSplit = userInput.trim().split('!');
  if (bangSplit[1]) {
    return bangSplit[1].split(' ')[0];
  }
  return false;
};

/**
 * Sets up the ready event and vote state
 */
client.on('ready', () => {
  console.log('I am ready!');
  Vote.setupVote();
  setTimeout(Vote.resetVotes, Util.halfAnHour);
});

// Create an event listener for messages
client.on('message', message => {
  try {
    const command = extractCommand(message.content.toLowerCase());

    if (command === false) return;

    const username = message.author.username.toLowerCase();

    if (!hangmanState.playing && command.length < 3) {
      return Hangman.play(message, hangmanState);
    }

    if (!hangmanState.playing && command === 'hangman') {
      hangmanState = Hangman.reset();
      const setup = Hangman.setup();
      hangmanState.word = setup.word;
      hangmanState.mask = setup.mask;
      hangmanState.playing = true;
      return message.channel.send(Bleetify(`Lets play hangman, your word is ${hangmanState.mask.length} letters long, respond with !letter to play, like this: !a`));
    }

    if (hangmanState.playing && command === hangman) {
      return Hangman.currentState(message, hangmanState);
    }

    if (hangmanState.playing && command === `!${hangmanState.word}`) {
      return Hangman.win(hangmanState, message);
    }

    if (Routes[command]) {
      return Routes[command].execute(message, username, client);
    } else {
      const commandStream = Fs.createWriteStream('./data/newCommands.txt', { flags: 'a' });
      commandStream.write(`
      Last seen: ${new Date().toISOString()}
      Command: ${command}`);
      commandStream.end();
    }

  } catch (err) {
    console.log(JSON.stringify(err));
    message.channel.send(Bleetify(`*Cough*, *splutter*, @CtrlAltCookie#5716 ${err}`)).then(() => {
      console.log('this was caused by user error');
      console.log(JSON.stringify(err));
    });
  }
});

client.on('error', () => {
  Util.logErr('Unknown client error', 'No stack sorry :(');
});

client.login(token);
