/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('CategoryCtrl', function () {
  var ctrl;

  beforeEach(module('category'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('CategoryCtrl');
  }));

  it('should have ctrlName as CategoryCtrl', function () {
    expect(ctrl.ctrlName).to.equal('CategoryCtrl');
  });
});
