/* global describe, it, before, after */
'use strict';
var Firebase = require('firebase'),
    config = require('../../config'),
    fbUrl = config.fbUrl,
    rootRef = new Firebase(fbUrl),
    asserts = require('./ref-helpers');

describe('categories tests: ', function () {
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

    it('should allow read', function (done) {
      asserts.shouldReadFromRef(rootRef.child('categories'), done);
    });

    it('should not allow write', function (done) {
      asserts.shouldNotWriteToRef(rootRef.child('categories'), done);
    });
  });

  describe('signed out: ', function () {
    it('should allow read', function (done) {
      asserts.shouldReadFromRef(rootRef.child('categories'), done);
    });

    it('should not allow write', function (done) {
      asserts.shouldNotWriteToRef(rootRef.child('categories'), done);
    });
  });
});
