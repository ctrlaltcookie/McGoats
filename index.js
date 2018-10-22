const {token} = require('./token');
const Discord = require('discord.js');

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
      message.channel.send('No ron');
    } else {
      message.channel.send('pong!');
    }
  }

  if (content.startsWith('!colour')) {
    const hex = message.content.split(' ')[1];
    console.log(hex);
    let role = message.member.highestRole;
    role.setColor(hex)
      .then(updated => {
        message.channel.send(`Your colour is now ${role.color}`);
      })
      .catch(console.error);
  }

  if (content.startsWith('!help') || content.startsWith('!comands')) {
    message.channel.send('```Available commands are: ' +
      '\n!ping' +
      '\n!colour #97dbc8' +
      '\n!help' +
      '\n!commands ```');
  }
});

client.login(token);
