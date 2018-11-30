const Code = require('code');
const Lab = require('lab');

const Dice = require('../api/dice');

// Test shortcuts

const lab = exports.lab = Lab.script();
const before = lab.before;
const after = lab.after;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Dice tests', () => {

  describe('modifiers', () => {

    it('should compare vs a positive modifier', () => {
      const result = Dice.roll(1, 1, '+2', null);
      expect(result).to.be.equal('3');
    });
  
    it('should compare vs a negative modifier', () => {
      const result = Dice.roll(1, 1, '-10', null);
      expect(result).to.be.equal('-9');
    });

  });

  describe('challenege', () => {

    it('should compare vs a positive modifier', () => {
      const result = Dice.roll(1, 1, null, '>2');
      expect(result).to.be.equal('0 successes');
    });

    it('should compare vs a positive modifier', () => {
      const result = Dice.roll(1, 1, null, '<2');
      expect(result).to.be.equal('1 successes');
    });

  })

});
