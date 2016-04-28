/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('compareTo', function () {
  var scope
    , element;

  beforeEach(module('user', 'user/directives/compare-to-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<compare-to></compare-to>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().compareTo.name).to.equal('compareTo');
  });
});
