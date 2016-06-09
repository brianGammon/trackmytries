/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('PrtStandards', function () {
  var factory;

  beforeEach(module('common'));

  beforeEach(inject(function (PrtStandards) {
    factory = PrtStandards;
  }));

  it('should have someValue be PrtStandards', function () {
    expect(factory.someValue).to.equal('PrtStandards');
  });

  it('should have someMethod return PrtStandards', function () {
    expect(factory.someMethod()).to.equal('PrtStandards');
  });
});
