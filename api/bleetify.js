/**
 * Bleet will either prefix or suffix a bleet to your word based on percent chance if specified.
 * @param {*} word Required 
 * @param {*} threshold 
 */
const bleet = function (word, threshold = 20) {
  if (threshold < 1) {
    return word;
  }
  let bleet = word;
  const gonnaBleet = getChance() < threshold;
  if (gonnaBleet || threshold === 100) {
    const heads = flipCoin();
    if (heads) {
      return 'Baa, ' + bleet[0].toLowerCase() + bleet.substr(1);
    }
    return bleet.trim() + ', baa.';
  }

  return bleet;
}

/**
 * Returns a random number between 1 - 100;
 */
function getChance() {
  return Math.random() * (100 - 1) + 1;
}

/**
 * Returns true or false randomly
 */
const flipCoin = function () {
  return Math.random() > 0.5;
}

module.exports = {
  Bleetify: bleet
}