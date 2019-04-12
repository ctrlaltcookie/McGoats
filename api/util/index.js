const Moment = require('moment');

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

const halfAnHour = 15 * 60 * 1000;

module.exports = {
  getRand,
  halfAnHour,
  msToTime
};
