const Discord = require('discord.js');
const Fs = require('fs');

const { token } = require('./token');
const { Bleetify } = require('./bleetify');

const Hangman = require('./games/hangman');
const Routes = require('./routes');

let hangmanState = {
  playing: false,
  word: null,
  guessedLetters: {},
  turn: 0,
  mask: null
};

let savestate = {
  goodgoat: 0,
  badgoat: 0
};

// Create an instance of a Discord client
const client = new Discord.Client();

Fs.readFile('./data/savestate.json', 'utf8', (err, data) => {
  if (err) {
    console.log('this was caused by file systems read');
    console.log(JSON.stringify(err));
    process.exit(1);
  }
  savestate = Object.assign(savestate, JSON.parse(data));
  console.log('state set');
});

const halfAnHour = 15 * 60 * 1000;

const resetVotes = function () {
  goodVoteHistory = [];
  badVoteHistory = [];
  Fs.writeFile('./data/savestate.json', JSON.stringify(savestate), 'utf8', (err) => {
    if (err) {
      console.log('this was caused by file systems write');
      console.log(JSON.stringify(err));
      process.exit(1);
    }
    setTimeout(resetVotes, halfAnHour);
  });
};

/**
 * Setups up the ready event letting you know it's up
 */
client.on('ready', () => {
  console.log('I am ready!');
  setTimeout(resetVotes, halfAnHour);
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
      Hangman.win(hangmanState, message);
    }

    if (Routes[command]) {
      Routes[command].execute(message, username);
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
  const logStream = Fs.createWriteStream('./data/log.txt', { flags: 'a' });
  logStream.write(`
  Last seen: ${new Date().toISOString()}
  Unknown client error`);
  logStream.end();
});

const extractCommand = function(userInput) {
  const bangSplit = userInput.trim().split('!');
  if (bangSplit[1]) {
    return bangSplit[1].split(' ')[0];
  }
  return false;
};

client.login(token);
