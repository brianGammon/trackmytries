/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ItemDialogCtrl', function () {
  var ctrl;

  beforeEach(module('category'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ItemDialogCtrl');
  }));

  it('should have ctrlName as ItemDialogCtrl', function () {
    expect(ctrl.ctrlName).to.equal('ItemDialogCtrl');
  });
});
