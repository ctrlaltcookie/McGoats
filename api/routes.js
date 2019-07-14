const { Bleetify } = require('./bleetify');
const { handleRoles } = require('./roles');

const Dice = require('./dice');
const Paranoia = require('./games/paranoia');
const Pjson = require('../package.json');
const Util = require('./util');
const Vote = require('./vote');
const Streamers = require('./streamers');

const workingon = `I'm having a look at setting up custom bot based anouncements, so that administrators can use the bot to talk`;

const routes = {
  badgoat: {
    name: 'badgoat',
    description: 'downvote the goat :(',
    command: '!badgoat',
    example: '!badgoat',
    execute: Vote.badGoat
  },
  balance: {
    name: 'balance',
    description: 'the goats status, how good or bad it\'s has been, synonymous with !count',
    command: '!balance',
    example: '!balance or !count',
    execute: Vote.balance
  },
  colour: {
    name: 'colour',
    description: 'change your name colour',
    command: '!colour',
    example: '!colour #97dbc8',
    execute: message => {
      const hex = message.content.split(' ')[1];
      const role = message.member.highestRole;
      role.setColor(hex)
        .then(() => {
          message.channel.send(Bleetify(`Your colour is now ${hex}`));
        })
        .catch(console.error);
    }
  },
  commands: {
    name: 'commands',
    description: 'lists the available commands synonymous with !help without ',
    command: '!commands',
    example: '!commands or !help',
    execute: message => help(message)
  },
  count: {
    name: 'count',
    description: 'the goats status, how good or bad it\'s has been, synonymous with !balance',
    command: '!count',
    example: '!count or !balance',
    execute: Vote.balance
  },
  goodgoat: {
    name: 'goodgoat',
    description: 'upvote the goat! :3',
    command: '!goodgoat',
    example: '!goodgoat',
    execute: Vote.goodGoat
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
    example: '!help or !commands',
    execute: message => help(message)
  },
  kinkshamed: {
    name: 'kinkshamed',
    description: 'returns a video about kinkshaming being your kink',
    command: '!kinkshamed',
    example: '!kinkshamed',
    execute: message => message.channel.send('https://www.youtube.com/watch?v=zW1uN0SjKPY')
  },
  noron: {
    name: 'noron',
    description: 'returns a video saying, no ron',
    command: '!noron',
    example: '!noron',
    execute: message => message.channel.send('https://www.youtube.com/watch?v=0NfTVytat_E')
  },
  paranoia: {
    name: 'paranoia',
    description: 'contains paranoia related subcommands!',
    command: '!paranoia',
    example: '!paranoia clearance',
    execute: message => Paranoia.dispatcher(message)

  },
  ping: {
    name: 'ping',
    description: 'responds with pong',
    command: '!ping',
    example: '!ping',
    execute: message => message.channel.send(Bleetify('Pong!'))
  },
  pong: {
    name: 'pong',
    description: 'responds with ping',
    command: '!pong',
    example: '!pong',
    execute: message => message.channel.send(Bleetify('Ping!'))
  },
  role: {
    name: 'role',
    description: 'Set your role to one of the available non-admin roles',
    command: '!role',
    example: '!role overwatch',
    execute: handleRoles
  },
  roll: {
    name: 'roll',
    description: 'roll a number of dice, with specific size, targets to get above or below and modifiers you can add',
    command: '!roll',
    example: '!roll 2d10>8+2 you\'re rolling 2 dice that have 10 sides, aiming for 8 or higher and +2 to each of your rolls',
    execute: (message) => {
      const { numSides, diceToRoll, modifier, challenge, command } = Dice.getDiceOptions(message.content);
      const result = Dice.roll(numSides, diceToRoll, modifier, challenge);
      return message.channel.send(Bleetify(`You rolled ${command} and got; ${result}`));
    }
  },
  sexygoat: {
    name: 'sexygoat',
    description: 'people being weird to th egoat is not cool man',
    command: '!sexygoat',
    example: '!sexygoat - dont',
    execute: message => message.channel.send("``` You've really freaked the goat out :/ don't do that ```")
  },
  sneezy: {
    name: 'sneezy',
    description: 'returns the sneezy xl sketch from rick and morty',
    command: '!sneezy',
    example: '!sneezy',
    execute: message => message.channel.send('https://www.youtube.com/watch?v=_FwVYeeY1Ew')
  },
  streamer: Streamers.streamerRoute,
  streaming: Streamers.streamingRoute,
  upcoming: {
    name: 'upcoming',
    description: 'what we are currently working on, features to come',
    command: '!upcoming',
    example: '!upcoming - Building some sandcastles :o',
    execute: message => message.channel.send(Bleetify(workingon))
  },
  uptime: {
    name: 'uptime',
    description: 'how long the server has been up, how long the goat has been awake',
    command: '!uptime',
    example: '!uptime - Baa, we\'ve been up for 2 days',
    execute: (message, notUsed, client) => {
      return message
        .channel
        .send(
          Bleetify(
            `We've been up for ${Util.msToTime(client.uptime)}. For more information on uptime visit: https://stats.uptimerobot.com/koARltxYO`
          )
        );
    }
  },
  version: {
    name: 'version',
    description: 'what version we are running, this is important for debugging',
    command: '!version',
    example: '!version - v3.0.2',
    execute: message => message.channel.send(Bleetify(`We're using v${Pjson.version}`))
  },
  workingon: {
    name: 'working on',
    description: 'what we are currently working on, upcoming features or fixes',
    command: '!workingon',
    example: '!workingon - We\'re currently working on: maintainability! This grew really fast and needs fixing!',
    execute: message => message.channel.send(Bleetify(workingon))
  }
};

function help (message) {
  const commandsList = [];
  Object.keys(routes).forEach(key => {
    commandsList.push(`  * ${routes[key].example}\n`);
  });
  const constructedString = `\`\`\` Available commands are:
${commandsList.join('')}
  \`\`\``;
  return message.channel.send(constructedString);
};

module.exports = routes;
