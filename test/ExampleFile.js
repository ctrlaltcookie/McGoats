const Code = require('code');
const Lab = require('lab');

// Test shortcuts

const lab = exports.lab = Lab.script();
const before = lab.before;
const after = lab.after;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('BlankTest', () => {

  describe('Description', () => {

    it('should do a thing', () => {
      expect(true).to.equal(true);
    });

  })
});
