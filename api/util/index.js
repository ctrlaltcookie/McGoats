/**
 * Returns a random number between 1 and max;
 */
function getRand(max) {
  return Math.floor(Math.random() * (max - 1) + 1);
}

/**
 * Converts miliseconds to time
 * @param {*} s number of miliseconds
 */
const msToTime = function (s) {

  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + 'h:' + pad(mins) + 'm:' + pad(secs) + 's';
}

module.exports = {
  getRand,
  msToTime
}