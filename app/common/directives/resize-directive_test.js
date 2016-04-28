/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe.skip('resize', function () {
  var scope
    , element;

  beforeEach(module('common', 'common/resize-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<resize></resize>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().resize.name).to.equal('resize');
  });
});
