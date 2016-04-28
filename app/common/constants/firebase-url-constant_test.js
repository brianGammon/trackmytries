/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('firebaseUrl', function () {
  var constant;

  beforeEach(module('common'));

  beforeEach(inject(function (firebaseUrl) {
    constant = firebaseUrl;
  }));

  it('should equal 0', function () {
    expect(constant).to.equal(0);
  });
});
