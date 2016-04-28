/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('FirebaseRootRef', function () {
  var service;

  beforeEach(module('common'));

  beforeEach(inject(function (FirebaseRootRef) {
    service = FirebaseRootRef;
  }));

  it('should equal FirebaseRootRef', function () {
    expect(service.get()).to.equal('FirebaseRootRef');
  });
});
