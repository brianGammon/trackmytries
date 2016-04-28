/* global describe, beforeEach, it, browser */
'use strict';

var chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect = chai.expect
  , CategoryPagePo = require('./category.po');

chai.use(chaiAsPromised);

describe('Category page', function () {
  var categoryPage;

  beforeEach(function () {
    categoryPage = new CategoryPagePo();
    browser.get('/#/category');
  });

  it('should say CategoryCtrl', function () {
    expect(categoryPage.heading.getText()).to.eventually.equal('category');
    expect(categoryPage.text.getText()).to.eventually.equal('CategoryCtrl');
  });
});
