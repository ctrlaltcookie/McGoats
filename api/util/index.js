const Moment = require('moment');
const Fs = require('fs');

/**
 * Returns a random number between 0 and max;
 */
function getRand(max) {
  const parsedMax = parseInt(max);
  if (parsedMax === 0) {
    return 0;
  }
  return Math.floor(Math.random() * (parsedMax) + 1);
}

/**
 * Converts miliseconds to time
 * @param {*} ms number of miliseconds
 */
const msToTime = function (ms) {
  const uptime = Moment.duration(ms);
  return uptime.humanize();
};

/**
 * Logs error messages appropriatly
 * @param {object} err stack to log
 * @param {string} message message to log to console
 */
const logErr = function (err, message) {
  const logStream = Fs.createWriteStream('./data/log.txt', { flags: 'a' });
  logStream.write(`

  Last seen: ${new Date().toISOString()}
  message: ${message}
  stack: ${JSON.stringify(err)}`);
  logStream.end();

  console.log(message);
  console.log(JSON.stringify(err));
};

const halfAnHour = 15 * 60 * 1000;

module.exports = {
  getRand,
  halfAnHour,
  logErr,
  msToTime
};
