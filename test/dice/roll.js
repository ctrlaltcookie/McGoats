const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');

const Dice = require('../../api/dice');

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

  describe('with errors', () => {

    it('should not roll with too many dice', () => {
      const result = Dice.roll(10000000001, 1, null, null);
      expect(result).to.be.equal('nothing, roll less than a 10000000000 sided dice or less than 450 iterations.');
    });

    it('should not roll with too many iterations', () => {
      const result = Dice.roll(10, 451, null, null);
      expect(result).to.be.equal('nothing, roll less than a 10000000000 sided dice or less than 450 iterations.');
    });

  });

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

    before(() => {
    });

    it('should compare vs a positive modifier', () => {
      const result = Dice.roll(1, 1, null, '>2');
      expect(result).to.be.equal('1, for 0 successes');
    });

    it('should compare vs a positive modifier', () => {
      const result = Dice.roll(1, 1, null, '<2');
      expect(result).to.be.equal('1, for 1 successes');
    });

  })

});
