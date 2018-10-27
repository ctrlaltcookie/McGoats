const {token} = require('./token');
const Discord = require('discord.js');
const Hangman = require('./hangman');
const {Bleetify} = require('./bleetify');

let gameState = {
  playing: false,
  word: null,
  guessedLetters: {},
  turn: 0,
  mask: null
}

let goodgoat = 0;
let badgoat = 0;

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * Setups up the ready event letting you know it's up
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  const content = message.content.toLowerCase();

  if(content === `!${gameState.word}`) {
    Hangman.win(gameState, message);
  }

  if (!gameState.playing && content.startsWith('!hangman')) {
    gameState = Hangman.reset();
    const setup = Hangman.setup();
    console.log(setup.word);
    gameState.word = setup.word;
    gameState.mask = setup.mask;
    gameState.playing = true;
    return message.channel.send(Bleetify(`Lets play hangman, your word is ${gameState.mask.length} letters long, respond with !letter to play, like this: !a`, 20));
  }

  if (gameState.playing && content.startsWith('!') && content.length < 3) return Hangman.play(message, gameState);

  if (content === '!ping') {
    if (message.author.username.toLowerCase() == 'pac') {
      message.react(message.client.emojis.find(emoji => emoji.name === 'spooderman2').id);
    }
    return message.channel.send(Bleetify('Pong!', 20));
  }

  if (content === '!pong') {
    if (message.author.username.toLowerCase() == 'absynthe') {
      message.react(message.client.emojis.find(emoji => emoji.name === 'rooAww').id);
    }
    return message.channel.send(Bleetify('Ping!', 20));
  }

  if (content === '!marco') {
    if (message.author.username.toLowerCase() == '🤖lightscamerazaction🤖') {
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
    goodgoat++;
    return message.react(message.client.emojis.find(emoji => emoji.name === 'cat1').id);
  }

  if (content.startsWith('!badgoat')) {
    badgoat++;
    return message.react(message.client.emojis.find(emoji => emoji.name === 'eww').id);
  }

  if (content.startsWith('!count')) {
    const goatType = (goodgoat - badgoat) ? 'good goat' : 'bad goat';
    const emoteType = (goodgoat - badgoat) ? 'cat1' : 'eww';
    return message.channel.send(Bleetify(`I've been a ${goatType} ${message.client.emojis.find(emoji => emoji.name === emoteType)}`, 20));
  }

  if (content.startsWith('!uptime')) {
    return message.channel.send(Bleetify(`We've been up for ${client.uptime / 1000}s`, 20));
  }

  if (content.startsWith('!needssomeworkgoat')) {
    message.react(message.client.emojis.find(emoji => emoji.name === 'skull1').id);
    return message.channel.send(Bleetify('I Came Out to Have a Good Time and I\'m Honestly Feeling So Attacked Right Now', 20));
  }

  if (content.startsWith('!sexygoat')) {
    return message.channel.send("``` You've really freaked the goat out :/ don't do that ```");
  }

  if (content.startsWith('!help') || content.startsWith('!comands')) {
    return message.channel.send('```Available commands are: ' +
      '\n!goodgoat' +
      '\n!badgoat' +
      '\n!count' +
      '\n!uptime' +
      '\n!ping' +
      '\n!marco' +
      '\n!colour #97dbc8' +
      '\n!help' +
      '\n!commands```');
  }
});

client.login(token);
