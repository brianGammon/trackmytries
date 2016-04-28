/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('categoryStats', function () {
  var scope
    , element;

  beforeEach(module('category', 'category/category-stats-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<category-stats></category-stats>'))(scope);
  }));

  it('should have correct text you know', function () {
    scope.$apply();
    expect(element.isolateScope().categoryStats.name).to.equal('categoryStats');
  });
});
