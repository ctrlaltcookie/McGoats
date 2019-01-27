const Moment = require('moment');

/**
 * Returns a random number between 0 and max;
 */
function getRand(max) {
  if (max === '0') {
    return 0;
  }
  return Math.floor(Math.random() * (max) + 1);
}

/**
 * Converts miliseconds to time
 * @param {*} ms number of miliseconds
 */
const msToTime = function (ms) {
  const uptime = Moment.duration(ms);
  return uptime.humanize();
};

module.exports = {
  getRand,
  msToTime
};
