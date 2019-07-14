const Code = require('code');
const Lab = require('lab');

const Paranoia = require('../../api/games/paranoia');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Paranoia', () => {

  describe('Dispatcher', () => {

    it.only('should return a positive integer', () => {
      const message = {
        content: '!paranoia clearance'
      };
      Paranoia.dispatcher(message);
    });

    it('should return 0 when the max is 0', () => {

    });

  });

});
