const {token} = require('./token');
const Discord = require('discord.js');

const hangman = {
  playing: false,
  word: null,
  turn: 1
}

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
    message.channel.send('Baa, pong!');
  }

  if (content === '!pong') {
    if (message.author.username.toLowerCase() == 'absynthe') {
      message.react(message.client.emojis.find(emoji => emoji.name === 'rooAww').id);
    }
    message.channel.send('Baa, ping!');
  }

  if (content === '!marco') {
    if (message.author.username.toLowerCase() == '🤖lightscamerazaction🤖') {
      message.react(message.client.emojis.find(emoji => emoji.name === 'tpride').id);
    }
    message.channel.send('Baa, polo!');
  }

  if (content === '!polo') {
    message.react(message.client.emojis.find(emoji => emoji.name === 'happy').id);
    message.channel.send('Baa, marco!');
  }

  if (content.startsWith('!colour')) {
    const hex = message.content.split(' ')[1];
    console.log(hex);
    let role = message.member.highestRole;
    role.setColor(hex)
      .then(updated => {
        message.channel.send(`Baa, your colour is now ${hex}`);
      })
      .catch(console.error);
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
