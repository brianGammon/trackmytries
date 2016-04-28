/* global describe, beforeEach, it, browser */
'use strict';

var chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect = chai.expect
  , CommonPagePo = require('./common.po');

chai.use(chaiAsPromised);

describe('Common page', function () {
  var commonPage;

  beforeEach(function () {
    commonPage = new CommonPagePo();
    browser.get('/#/common');
  });

  it('should say CommonCtrl', function () {
    expect(commonPage.heading.getText()).to.eventually.equal('common');
    expect(commonPage.text.getText()).to.eventually.equal('CommonCtrl');
  });
});
