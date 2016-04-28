/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe.skip('menu', function () {
  var scope
    , element;

  beforeEach(module('common', 'common/menu-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<menu></menu>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().menu.name).to.equal('menu');
  });
});
