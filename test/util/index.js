const Code = require('code');
const Lab = require('lab');

const Util = require('../../api/util');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Util', () => {

  describe('getRand', () => {

    it('should return a positive integer', () => {
      const result = Util.getRand(10);
      expect(result).to.be.greaterThan(0);
      expect(result).to.be.lessThan(11);
    });

  });

  describe('msToTime', () => {

    it('should return one second', () => {
      const result = Util.msToTime(1000);
      expect(result).to.equal('a few seconds');
    });

    it('should return one minute', () => {
      const result = Util.msToTime(60000);
      expect(result).to.equal('a minute');
    });

    it('should return one hour', () => {
      const result = Util.msToTime(3600000);
      expect(result).to.equal('an hour');
    });

    it('should return one day', () => {
      const result = Util.msToTime(86400000);
      expect(result).to.equal('a day');
    });

  });

});
