/* global describe, beforeEach, it, browser */
'use strict';

var chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect = chai.expect
  , UserPagePo = require('./user.po');

chai.use(chaiAsPromised);

describe('User page', function () {
  var userPage;

  beforeEach(function () {
    userPage = new UserPagePo();
    browser.get('/#/user');
  });

  it('should say UserCtrl', function () {
    expect(userPage.heading.getText()).to.eventually.equal('user');
    expect(userPage.text.getText()).to.eventually.equal('UserCtrl');
  });
});
