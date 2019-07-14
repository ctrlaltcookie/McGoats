const dispatch = {
  clearance
};

const clearance = (message) => {
  const text = ``
  return message.channel.send('');
};

const dispatcher = (message) => {
  const command = grabCommand(message);
  
};

const grabCommand = (message) => {
  const command = message.content.split(' ');
  command.shift();
  return command;
};

module.exports = {
  dispatcher
};
