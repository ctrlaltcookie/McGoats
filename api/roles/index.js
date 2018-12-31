const { Bleetify } = require('../bleetify');

const roles = {
  rpgPlayers: 'rpg-players',
  rpgDM: 'rpg-dm',
  overWatch: 'overwatch',
  streamViewer: 'stream-viewer'
}

const handleRoles = function (message) {
  const content = message.content.toLowerCase();
  const guildRoles = message.guild.roles;
  const member = message.member;

  if (content === '!roles' || content === '!role') {
    return message.channel.send(Bleetify(` \`\`\`css
To set your role use !role rolename such as !role ${roles.rpgDM}

Available roles:
  * ${roles.rpgDM}
  * ${roles.rpgPlayers}
  * ${roles.overWatch}
  * ${roles.streamViewer}

Then use \@role to alert all players with this role assigned!
    \`\`\``));
  }

  Object.keys(roles).forEach(key => {
    const roleName = roles[key];
    if (content.includes(roleName)) {
      let role = guildRoles.find(r => r.name === roleName);
      member.addRole(role).catch(console.error);
      return bleetRole(message, roleName);
    }
  });
}

const bleetRole = function (message, roleName) {
  return message.channel.send(Bleetify(`Set your role to ${roleName}`));
}

module.exports = {
  handleRoles
}