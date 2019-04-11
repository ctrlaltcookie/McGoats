const { Bleetify } = require('./bleetify');

const goodVoteHistory = [];
const badVoteHistory = [];

const goodGoat = function (message) {
  const consecutive = _checkHistory([...goodVoteHistory], username, message);
  goodVoteHistory.push(username);

  if (!consecutive) {
    savestate.goodgoat++;
  }

  if (Util.getRand(15) === 1) {
    message.reply(Bleetify('Good human :3 !'));
  }

  return message.react(message.client.emojis.find(emoji => emoji.name === 'cat1').id);
};

const badGoat = function (message) {
  const consecutive = _checkHistory([...badVoteHistory], username, message);
  badVoteHistory.push(username);

  if (!consecutive) {
    savestate.badgoat++;
  }

  if (Util.getRand(15) === 1) {
    message.reply(Bleetify('Bad human :< !'));
  }

  return message.react(message.client.emojis.find(emoji => emoji.name === 'eww').id);
};

const balance = function (message) {
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
    const emoji = message.client.emojis.find(emoji => emoji.name === emoteType);
    return message
      .channel
      .send(Bleetify(`I've been a ${goatType} ${emoji}`));
};

const _checkHistory = function (voteHistory, username, message) {
  const oneVotePrevious = voteHistory.pop();
  const twoVotesPrevious = voteHistory.pop();
  const consecutive = oneVotePrevious === username && twoVotesPrevious === username;

  if (consecutive) {
    message.reply("Please don't spam votes, baa!").then(msg => {
      msg.delete(5000);
    });
  }

  return consecutive;
};

module.exports = {
  badGoat,
  balance,
  goodGoat
};
