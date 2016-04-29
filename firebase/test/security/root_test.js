/* global describe, it, before, after */
'use strict';
var Firebase = require('firebase'),
    config = require('../../config'),
    fbUrl = config.fbUrl,
    rootRef = new Firebase(fbUrl),
    asserts = require('./ref-helpers');

describe('Root reference tests: ', function () {
  describe('signed in: ', function () {
    before(function (done) {
      rootRef.authWithPassword({
        email: 'b@trackmytries.com',
        password: 'Password1!'
      }, function (err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });

    after(function () {
      rootRef.unauth();
    });

    it('should not allow read from root node', function (done) {
      asserts.shouldNotReadFromRef(rootRef, done);
    });

    it('should not allow write to root node', function (done) {
      asserts.shouldNotWriteToRef(rootRef, done);
    });
  });

  describe('signed out: ', function () {
    it('should not allow read from root node', function (done) {
      asserts.shouldNotReadFromRef(rootRef, done);
    });

    it('should not allow write to root node', function (done) {
      asserts.shouldNotWriteToRef(rootRef, done);
    });
  });
});
