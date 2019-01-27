const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');

const Dice = require('../../api/dice');
const Util = require('../../api/util');

// Test shortcuts

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const it = lab.it;
const describe = lab.describe;
const afterEach = lab.afterEach;
const beforeEach = lab.beforeEach;

describe('Dice tests', () => {

  describe('with errors', () => {

    it('should not roll with too many dice', () => {
      const result = Dice.roll(10000000001, 1, null, null);
      expect(result).to.equal('nothing, roll less than a 10000000000 sided dice or less than 450 iterations.');
    });

    it('should not roll with too many iterations', () => {
      const result = Dice.roll(10, 451, null, null);
      expect(result).to.equal('nothing, roll less than a 10000000000 sided dice or less than 450 iterations.');
    });

    it('should not return empty results when invalid inputs supplied', () => {
      const result = Dice.roll('potato', 'and', 'leak', 'soup');
      expect(result).to.equal('Please supply a valid format dice roll such as !roll 1d6+2>7');
    });

  });

  describe('modifiers', () => {

    it('should compare vs a positive modifier', () => {
      const result = Dice.roll(1, 1, '+2', null);
      expect(result).to.equal('3');
    });

    it('should compare vs a negative modifier', () => {
      const result = Dice.roll(1, 1, '-10', null);
      expect(result).to.equal('-9');
    });

  });

  describe('challenege', () => {

    describe('successes', () => {

      it('should return 1 success for a successful challenge', () => {
        const result = Dice.roll(1, 1, null, '<2');
        expect(result).to.equal('1, for 1 successes');
      });

      it('should return 1 success when challenged vs 0', () => {
        const result = Dice.roll(1, 1, null, '>0');
        expect(result).to.equal('1, for 1 successes');
      });

    });

    describe('failures', () => {

      it('should return 0 successes vs an impossibly high challenge', () => {
        const result = Dice.roll(1, 1, null, '>2');
        expect(result).to.equal('1, for 0 successes');
      });

      it('should return 0 successes vs an impossibly low challenge', () => {
        const result = Dice.roll(1, 1, null, '<-1');
        expect(result).to.equal('1, for 0 successes');
      });

    });

  });

  describe('sort order', () => {

    beforeEach(() => {
      let num = 10;
      Sinon.stub(Util, 'getRand').callsFake(() => num--);
    });

    afterEach(() => {
      Util.getRand.restore();
    });

    it('should sort lowest to highest', () => {
      const result = Dice.roll(10, 10, null, null);
      expect(result).to.equal('1, 2, 3, 4, 5, 6, 7, 8, 9, 10');
    });

  });

});
