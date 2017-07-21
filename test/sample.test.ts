import { expect } from 'chai';

import { add } from '../src/util/sample';

describe('Sample', function() {
  it('should add numbers', function() {
    expect(add(2, 3)).to.equal(5);
  });
});
