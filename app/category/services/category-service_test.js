/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Category', function () {
  var factory;

  beforeEach(module('category'));

  beforeEach(inject(function (Category) {
    factory = Category;
  }));

  it('should have someValue be Category', function () {
    expect(factory.someValue).to.equal('Category');
  });

  it('should have someMethod return Category', function () {
    expect(factory.someMethod()).to.equal('Category');
  });
});
