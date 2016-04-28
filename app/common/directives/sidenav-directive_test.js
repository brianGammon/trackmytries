/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe.skip('sidenav', function () {
  var scope
    , element;

  beforeEach(module('common', 'common/sidenav-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<sidenav></sidenav>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().sidenav.name).to.equal('sidenav');
  });
});
