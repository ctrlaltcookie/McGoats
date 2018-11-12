const {Token} = require('./token');
const Discord = require('discord.js');
const Hangman = require('./hangman');
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

let goodVoteHistory = [];
let badVoteHistory = [];

let goodgoat = 0;
let badgoat = 0;

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * Setups up the ready event letting you know it's up
 */
client.on('ready', () => {
  console.log('I am ready!');
  const halfAnHour = 15 * 60 * 1000;
  setInterval(() => {
    goodVoteHistory = [];
    badVoteHistory = [];
  }, halfAnHour);
  console.log('votes reset');
});

// Create an event listener for messages
client.on('message', message => {
  try {
    const content = message.content.toLowerCase();
    const username = message.author.username.toLowerCase();

    if(content === `!${gameState.word}`) {
      Hangman.win(gameState, message);
    }

    if(content.startsWith('!roll')) {
      const command = content.split(' ').pop();
      const [iterations, dice] = command.split('d');
      const result = Dice.roll(dice, iterations);
      return message.channel.send(Bleetify(`You rolled ${iterations} ${dice} sided dice and got: ${result}`));
    }

    if (!gameState.playing && content.startsWith('!hangman')) {
      gameState = Hangman.reset();
      const setup = Hangman.setup();
      gameState.word = setup.word;
      gameState.mask = setup.mask;
      gameState.playing = true;
      return message.channel.send(Bleetify(`Lets play hangman, your word is ${gameState.mask.length} letters long, respond with !letter to play, like this: !a`, 20));
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
      return message.channel.send(Bleetify('Pong!', 20));
    }

    if (content === '!pong') {
      if (username == 'absynthe') {
        message.react(message.client.emojis.find(emoji => emoji.name === 'rooAww').id);
      }
      return message.channel.send(Bleetify('Ping!', 20));
    }

    if (content === '!marco') {
      if (username == '🤖lightscamerazaction🤖') {
        message.react(message.client.emojis.find(emoji => emoji.name === 'tpride').id);
      }
      return message.channel.send(Bleetify('Polo!', 20));
    }

    if (content === '!polo') {
      message.react(message.client.emojis.find(emoji => emoji.name === 'happy').id);
      return message.channel.send(Bleetify('Marco!', 20));
    }

    if (content.startsWith('!colour')) {
      const hex = message.content.split(' ')[1];
      console.log(hex);
      let role = message.member.highestRole;
      role.setColor(hex)
        .then(updated => {
          message.channel.send(Bleetify(`Your colour is now ${hex}`, 20));
        })
        .catch(console.error);
    }

    if (content.startsWith('!goodgoat')) {
      const consecutive = checkHistory([...goodVoteHistory], username, message);

      if (!consecutive) {
        goodVoteHistory.push(username);
        goodgoat++;
      }

      return message.react(message.client.emojis.find(emoji => emoji.name === 'cat1').id);
    }

    if (content.startsWith('!badgoat')) {
      const consecutive = checkHistory([...badVoteHistory], username, message);

      if (!consecutive) {
        badVoteHistory.push(username);
        badgoat++;
      }

      return message.react(message.client.emojis.find(emoji => emoji.name === 'eww').id);
    }

    if (content.startsWith('!count') || content.startsWith('!balance')) {
      let goatType;
      let emoteType;
      const balance = goodgoat - badgoat;
      if (balance > 10) {
        goatType = 'good goat';
        emoteType = 'happy';
      }
      if (balance < 10 && balance > -10) {
        goatType = 'morally grey goat';
        emoteType = 'confusedTravolta';
      }
      if (balance < -10) {
        goatType = 'bad goat';
        emoteType = 'eww';
      }
      return message.channel.send(Bleetify(`I've been a ${goatType} ${message.client.emojis.find(emoji => emoji.name === emoteType)}`, 20));
    }

    if (content.startsWith('!uptime')) {
      return message.channel.send(
        Bleetify(`We've been up for ${Util.msToTime(client.uptime)}`, 20));
    }

    if (content.startsWith('!needssomeworkgoat')) {
      message.react(message.client.emojis.find(emoji => emoji.name === 'skull1').id);
      return message.channel.send(Bleetify('I Came Out to Have a Good Time and I\'m Honestly Feeling So Attacked Right Now', 20));
    }

    if (content.startsWith('!sexygoat')) {
      return message.channel.send("``` You've really freaked the goat out :/ don't do that ```");
    }

    if (content.startsWith('!version')) {
      return message.channel.send(Bleetify(`We're using v${Pjson.version}`, 20));
    }

    if (content.startsWith('!help') || content.startsWith('!commands')) {
      return message.channel.send('```Available commands are: ' +
        '\n!goodgoat' +
        '\n!badgoat' +
        '\n!count' +
        '\n!hangman' +
        '\n!uptime' +
        '\n!ping' +
        '\n!marco' +
        '\n!colour #97dbc8' +
        '\n!help or !commands' +
        '\n!version```');
    }
  } catch (err) {
    return message.channel.send(`*Cough*, *splutter*, @The Remi ${err}`);
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

client.login(Token);
