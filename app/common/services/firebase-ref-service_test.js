/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('FirebaseRef', function () {
  var factory;

  beforeEach(module('common'));

  beforeEach(inject(function (FirebaseRef) {
    factory = FirebaseRef;
  }));

  it('should have someValue be FirebaseRef', function () {
    expect(factory.someValue).to.equal('FirebaseRef');
  });

  it('should have someMethod return FirebaseRef', function () {
    expect(factory.someMethod()).to.equal('FirebaseRef');
  });
});
