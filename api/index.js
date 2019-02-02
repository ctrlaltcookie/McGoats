const Discord = require('discord.js');
const Fs = require('fs');

const { token } = require('./token');
const { Bleetify } = require('./bleetify');
const { handleRoles } = require('./roles');

const Dice = require('./dice');
const Hangman = require('./games/hangman');
const Pjson = require('../package.json');
const Util = require('./util');

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

const routes = {
  badgoat: {
    name: 'badgoat',
    description: 'downvote the goat :(',
    command: '!badgoat',
    example: '!badgoat'
  },
  balance: {
    name: 'balance',
    description: 'the goats status, how good or bad it\'s has been, synonymous with !count',
    command: '!balance',
    example: '!balance or !count'
  },
  colour: {
    name: 'colour',
    description: 'change your name colour',
    command: '!colour',
    example: '!colour #97dbc8'
  },
  commands: {
    name: 'commands',
    description: 'lists the available commands synonymous with !help without ',
    command: '!commands',
    example: '!commands'
  },
  count: {
    name: 'count',
    description: 'the goats status, how good or bad it\'s has been, synonymous with !balance',
    command: '!count',
    example: '!count or !balance'
  },
  goodgoat: {
    name: 'goodgoat',
    description: 'upvote the goat! :3',
    command: '!goodgoat',
    example: '!goodgoat'
  },
  hangman: {
    name: 'hangman',
    description: 'start a game of hangman or find out about the status of a game',
    command: '!hangman',
    example: '!hangman or a letter like !a !p !u'
  },
  help: {
    name: 'help',
    description: 'lists all available commands or if you specify a command the help for that command',
    command: '!help',
    example: '!help or !help goodgoat'
  },
  ping: {
    name: 'ping',
    description: 'responds with pong',
    command: '!ping',
    example: '!ping'
  },
  pong: {
    name: 'pong',
    description: 'responds with ping',
    command: '!pong',
    example: '!pong'
  },
  role: {
    name: 'role',
    description: 'Set your role to one of the available non-admin roles',
    command: '!role',
    example: '!role overwatch'
  },
  roll: {
    name: 'roll',
    description: 'roll a number of dice, with specific size, targets to get above or below and modifiers you can add',
    command: '!roll',
    example: '!roll 2d10>8+2 you\'re rolling 2 dice that have 10 sides, aiming for 8 or higher and +2 to each of your rolls'
  },
  uptime: {
    name: 'uptime',
    description: 'how long the server has been up, how long the goat has been awake',
    command: '!uptime',
    example: '!uptime - Baa, we\'ve been up for 2 days'
  },
  version: {
    name: 'version',
    description: 'what version we are running, this is important for debugging',
    command: '!version',
    example: '!version - v3.0.2'
  },
  workingon: {
    name: 'working on',
    description: 'what we are currently working on, upcoming features or fixes',
    command: '!workingon',
    example: '!workingon - We\'re currently working on: maintainability! This grew really fast and needs fixing!'
  }
};

let goodVoteHistory = [];
let badVoteHistory = [];

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
    const content = message.content.toLowerCase();
    const username = message.author.username.toLowerCase();

    if (hangmanState.playing && content === `!${hangmanState.word}`) {
      Hangman.win(hangmanState, message);
    }

    if (content.startsWith('!role')) {
      handleRoles(message);
    }

    if (content.startsWith('!roll')) {
      const { numSides, diceToRoll, modifier, challenge, command } = Dice.getDiceOptions(content);
      const result = Dice.roll(numSides, diceToRoll, modifier, challenge);
      return message.channel.send(Bleetify(`You rolled ${command} and got; ${result}`));
    }

    if (!hangmanState.playing && content.startsWith('!hangman')) {
      hangmanState = Hangman.reset();
      const setup = Hangman.setup();
      hangmanState.word = setup.word;
      hangmanState.mask = setup.mask;
      hangmanState.playing = true;
      return message.channel.send(Bleetify(`Lets play hangman, your word is ${hangmanState.mask.length} letters long, respond with !letter to play, like this: !a`));
    }

    if (hangmanState.playing && content.startsWith('!hangman')) {
      return Hangman.currentState(message, hangmanState);
    }

    if (hangmanState.playing && content.startsWith('!') && content.length < 3) {
      return Hangman.play(message, hangmanState);
    }

    if (content === '!ping') {
      if (username == 'pac') {
        message.react(message.client.emojis.find(emoji => emoji.name === 'spooderman2').id);
      }
      return message.channel.send(Bleetify('Pong!'));
    }

    if (content === '!pong') {
      if (username == 'absynthe') {
        message.react(message.client.emojis.find(emoji => emoji.name === 'rooAww').id);
      }
      return message.channel.send(Bleetify('Ping!'));
    }

    if (content === '!marco') {
      if (username == '🤖lightscamerazaction🤖') {
        message.react(message.client.emojis.find(emoji => emoji.name === 'tpride').id);
      }
      return message.channel.send(Bleetify('Polo!'));
    }

    if (content === '!polo') {
      message.react(message.client.emojis.find(emoji => emoji.name === 'happy').id);
      return message.channel.send(Bleetify('Marco!'));
    }

    if (content.startsWith('!colour')) {
      const hex = message.content.split(' ')[1];
      const role = message.member.highestRole;
      role.setColor(hex)
        .then(updated => {
          message.channel.send(Bleetify(`Your colour is now ${hex}`));
        })
        .catch(console.error);
    }

    if (content.startsWith('!goodgoat')) {
      const consecutive = checkHistory([...goodVoteHistory], username, message);
      goodVoteHistory.push(username);

      if (!consecutive) {
        savestate.goodgoat++;
      }

      if (Util.getRand(213) === 1) {
        message.author.reply(Bleetify('Good human!'));
      }

      return message.react(message.client.emojis.find(emoji => emoji.name === 'cat1').id);
    }

    if (content.startsWith('!badgoat')) {
      const consecutive = checkHistory([...badVoteHistory], username, message);
      badVoteHistory.push(username);

      if (!consecutive) {
        savestate.badgoat++;
      }

      if (Util.getRand(213) === 1) {
        message.author.reply(Bleetify('Bad human!'));
      }

      return message.react(message.client.emojis.find(emoji => emoji.name === 'eww').id);
    }

    if (content.startsWith('!badDev') || content.startsWith('!badctrlaltcookie')) {
      message.author.reply('Look here you little shit...');
    }

    if (content.startsWith('!count') || content.startsWith('!balance')) {
      let goatType;
      let emoteType;
      const balance = savestate.goodgoat - savestate.badgoat;
      if (balance > 10) {
        goatType = 'good goat';
        emoteType = 'happy';
      }
      if (balance < 10) {
        goatType = 'morally grey goat';
        emoteType = 'confusedTravolta';
      }
      if (balance < -10) {
        goatType = 'bad goat';
        emoteType = 'eww';
      }
      return message.channel.send(Bleetify(`I've been a ${goatType} ${message.client.emojis.find(emoji => emoji.name === emoteType)}`));
    }

    if (content.startsWith('!uptime')) {
      return message.channel.send(
        Bleetify(`We've been up for ${Util.msToTime(client.uptime)}`));
    }

    if (content.startsWith('!needssomeworkgoat')) {
      message.react(message.client.emojis.find(emoji => emoji.name === 'skull1').id);
      return message.channel.send(Bleetify('I Came Out to Have a Good Time and I\'m Honestly Feeling So Attacked Right Now'));
    }

    if (content.startsWith('!sexygoat')) {
      return message.channel.send("``` You've really freaked the goat out :/ don't do that ```");
    }

    if (content.startsWith('!version')) {
      return message.channel.send(Bleetify(`We're using v${Pjson.version}`));
    }

    if (content.startsWith('!workingon') || content.startsWith('!upcoming')) {
      return message.channel.send(Bleetify(`We're currently working on: maintainability! This grew really fast and needs fixing!`));
    }

    if (content.startsWith('!help') || content.startsWith('!commands')) {
      return message.channel.send('```Available commands are: ```');
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    message.channel.send(Bleetify(`*Cough*, *splutter*, @CtrlAltCookie#5716 ${err}`)).then(() => {
      console.log('this was caused by user error');
      console.log(JSON.stringify(err));
    });
  }
});

client.on('error', (err) => {
  const logStream = Fs.createWriteStream('./data/log.txt', { flags: 'a' });
  logStream.write(`
  Last seen: ${new Date().toISOString()}
  Unknown client error`);
  logStream.end();
});

const checkHistory = function (voteHistory, username, message) {
  const oneVotePrevious = voteHistory.pop();
  const twoVotesPrevious = voteHistory.pop();
  const consecutive = oneVotePrevious === username && twoVotesPrevious === username;

  if (consecutive) {
    message.reply("Please don't spam votes, baa!").then(msg => {
      msg.delete(5000);
    });
  }

  return consecutive;
};

client.login(token);
