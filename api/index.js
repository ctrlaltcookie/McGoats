const Discord = require('discord.js');
const Fs = require('fs');

const {token} = require('./token');
const Hangman = require('./games/hangman');
const {Bleetify} = require('./bleetify');
const Pjson = require('../package.json');
const Util = require('./util');
const Dice = require('./dice');

let gameState = {
  playing: false,
  word: null,
  guessedLetters: {},
  turn: 0,
  mask: null
}

let savestate = {
  goodgoat: 0,
  badgoat: 0
}

let goodVoteHistory = [];
let badVoteHistory = [];

// Create an instance of a Discord client
const client = new Discord.Client();

Fs.readFile('./data/savestate.json', 'utf8', (err, data) => {
  savestate = JSON.parse(data);
  console.log('state set')
});

/**
 * Setups up the ready event letting you know it's up
 */
client.on('ready', () => {
  console.log('I am ready!');
  const halfAnHour = 15 * 60 * 1000;
  setInterval(() => {
    goodVoteHistory = [];
    badVoteHistory = [];
    Fs.writeFile('./data/savestate.json', JSON.stringify(savestate), 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log('votes reset');
  }, halfAnHour);
});

// Create an event listener for messages
client.on('message', message => {
  try {
    const content = message.content.toLowerCase();
    const username = message.author.username.toLowerCase();

    if (gameState.playing && content === `!${gameState.word}`) {
      Hangman.win(gameState, message);
    }

    if (content.startsWith('!roll')) {
      const command = stripBang(content);
      const dice = getDice(command);
      const challenge = getChallenge(command);
      const iterations = getIterations(command);
      const modifier = getModifier(command);
      const result = Dice.roll(dice, iterations, modifier, challenge);
      return message.channel.send(Bleetify(`You rolled ${command} and got; ${result}`));
    }

    if (!gameState.playing && content.startsWith('!hangman')) {
      gameState = Hangman.reset();
      const setup = Hangman.setup();
      gameState.word = setup.word;
      gameState.mask = setup.mask;
      gameState.playing = true;
      return message.channel.send(Bleetify(`Lets play hangman, your word is ${gameState.mask.length} letters long, respond with !letter to play, like this: !a`));
    }

    if (gameState.playing && content.startsWith('!hangman')) {
      return Hangman.currentState(message, gameState);
    }

    if (gameState.playing && content.startsWith('!') && content.length < 3) {
      return Hangman.play(message, gameState);
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
      let role = message.member.highestRole;
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

    if (content.startsWith('!workingon')) {
      return message.channel.send(Bleetify(`We're currently working on: a new game :o!`));
    }

    if (content.startsWith('!help') || content.startsWith('!commands')) {
      return message.channel.send('```Available commands are: ' +
        '\n!badgoat' +
        '\n!goodgoat' +
        '\n!colour #97dbc8' +
        '\n!count or !balance' +
        '\n!hangman' +
        '\n!help or !commands' +
        '\n!marco' +
        '\n!polo' +
        '\n!ping' +
        '\n!pong' +
        '\n!roll 5d10+2 >8' +
        '\n!uptime' +
        '\n!workingon' +
        '\n!version```');
    }
  } catch (err) {
    return message.channel.send(Bleetify(`*Cough*, *splutter*, @CtrlAltCookie#5716 ${err}`));
  }
});

const checkHistory = function (voteHistory, username, message) {
  const oneVotePrevious = voteHistory.pop();
  const twoVotesPrevious = voteHistory.pop();
  const consecutive = oneVotePrevious === username && twoVotesPrevious === username

  if (consecutive) {
    message.reply("Please don't spam votes, baa!").then(msg => {
      msg.delete(5000);
    });
  }

  return consecutive;
}

const stripBang = function (content) {
  const command = content.split(' ');
  command.shift();
  return command.join('');
}

const getChallenge = function (command) {
  if (command.includes('>')) {
    return '>' + command.split('>').pop();
  }
  if (command.includes('<')) {
    return '<' + command.split('<').pop();
  }
}

const getDice = function (command) {
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
}

const getIterations = function (command) {
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
}

const getModifier = function (command) {
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
}

client.login(token);
