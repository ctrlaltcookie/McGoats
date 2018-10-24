const {token} = require('./token');
const Discord = require('discord.js');
const Hangman = require('./hangman');
const {bleetify} = require('./bleetify');

const gameState = {
  playing: false,
  word: null,
  turn: 1
}

let goodgoat = 0;

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

  if (content === '!ping') {
    if (message.author.username.toLowerCase() == 'pac') {
      message.react(message.client.emojis.find(emoji => emoji.name === 'spooderman2').id);
    }
    message.channel.send(bleetify('Pong!', 20));
  }

  if (content === '!pong') {
    if (message.author.username.toLowerCase() == 'absynthe') {
      message.react(message.client.emojis.find(emoji => emoji.name === 'rooAww').id);
    }
    message.channel.send(bleetify('Ping!', 20));
  }

  if (content === '!marco') {
    if (message.author.username.toLowerCase() == '🤖lightscamerazaction🤖') {
      message.react(message.client.emojis.find(emoji => emoji.name === 'tpride').id);
    }
    message.channel.send(bleetify('Polo!', 20));
  }

  if (content === '!polo') {
    message.react(message.client.emojis.find(emoji => emoji.name === 'happy').id);
    message.channel.send(bleetify('Marco!', 20));
  }

  if (content.startsWith('!colour')) {
    const hex = message.content.split(' ')[1];
    console.log(hex);
    let role = message.member.highestRole;
    role.setColor(hex)
      .then(updated => {
        message.channel.send(bleetify(`Your colour is now ${hex}`, 20));
      })
      .catch(console.error);
  }

  if (content.startsWith('!goodgoat')) {
    message.react(message.client.emojis.find(emoji => emoji.name === 'cat1').id);
    goodgoat++;
  }

  if (content.startsWith('!count')) {
    message.channel.send(bleetify(`I've been a good goat ${goodgoat} times ${message.client.emojis.find(emoji => emoji.name === 'cat1')}`));
  }

  if (content.startsWith('!needssomeworkgoat')) {
    message.react(message.client.emojis.find(emoji => emoji.name === 'skull1').id);
    message.channel.send(bleetify('I Came Out to Have a Good Time and I\'m Honestly Feeling So Attacked Right Now', 20));
  }

  if (content.startsWith('!help') || content.startsWith('!comands')) {
    message.channel.send('```Available commands are: ' +
      '\n!ping' +
      '\n!marco' +
      '\n!colour #97dbc8' +
      '\n!help' +
      '\n!commands```');
  }
});

client.login(token);
