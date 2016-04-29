/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('padDigits', function () {
  beforeEach(module('common'));

  it('should filter our numbers not greater than 3', inject(function ($filter) {
    expect($filter('padDigits')([1, 2, 3, 4])).to.include.members([4]);
  }));
});
