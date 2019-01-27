/**
 * Bleet will either prefix or suffix a bleet to your word based on percent chance if specified.
 * @param {*} word Required
 * @param {*} threshold Likelihood of the bleet, defaults to 20% chance of a bleet
 */
const bleet = function (word, chance = 20) {
  if (chance < 1) {
    return word;
  }
  const bleet = word;
  const gonnaBleet = getChance() < chance;
  if (gonnaBleet || chance === 100) {
    const heads = flipCoin();
    if (heads) {
      return 'Baa, ' + bleet[0].toLowerCase() + bleet.substr(1);
    }
    return bleet.trim() + ', baa.';
  }
  return bleet;
};

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
};

module.exports = {
  Bleetify: bleet
};
