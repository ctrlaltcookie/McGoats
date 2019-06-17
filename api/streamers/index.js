const fs = require('fs');

const Util = require('../util');

const streaming = function (message, username) {
  fs.readFile('./data/streamers.json', 'utf8', (err, data) => {
    if (err) {
      Util.logErr(err, 'this was caused by file systems read');
    }
    const streamers = JSON.parse(data);
    const role = message.guild.roles.find(r => r.name === 'stream-viewer');

    if (streamers[username]) {
      const content = message.content.split(' ');
      content.shift();
      const alertStart = `${role} ${username} is streaming`;
      const alertEnd = `over on https://twitch.tv/${streamers[username]}`;
      const alert = (content) ? `${alertStart} \`${content}\` ${alertEnd}` : `${alertStart} ${alertEnd}`;
      return message.channel.send(`${alert}`);
    } else {
      return message
        .channel
        .send('Use `!streamer` to tell us your streaming username first!');
    }
  });
};

const streamer = function (message, username) {
  fs.readFile('./data/streamers.json', 'utf8', (err, data) => {
    if (err) {
      Util.logErr(err, 'this was caused by file systems read');
    }
    const streamers = JSON.parse(data);
    const content = message.content.split(' ')[1];
    streamers[username] = (content) ? content : username;
    fs.writeFile('./data/streamers.json', JSON.stringify(streamers), (err) => {
      if (err) {
        Util.logErr(err, 'this was caused by file systems read');
      }
      return message.reply('You\'ve been added as a streamer!');
    });
  });
};

const streamingRoute = {
  name: 'streaming',
  description: 'use !streaming to alert stream viewers that you are streaming',
  command: '!streaming',
  example: '!streaming to alert or !streaming a-game-here to alert the game you\'re playing',
  execute: streaming
};

const streamerRoute = {
  name: 'streamer',
  description: 'teach the goat your twitch username so she can let everyone know when you\'re streaming',
  command: '!streamer',
  example: '!streamer your-twitch-username or blank if you want to use your discord username',
  execute: streamer
};

module.exports = {
  streamingRoute,
  streamerRoute
};
