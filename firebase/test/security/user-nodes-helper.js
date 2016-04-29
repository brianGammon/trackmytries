/* global describe, it, before, after */
'use strict';
var asserts = require('./ref-helpers');

module.exports = function (rootRef, refUnderTest) {
  describe(refUnderTest + ' node: ', function () {
    var otherUserId,
        validCategory,
        obj = {valueNumber: 2, itemDateTime: '2014-04-05T02:00:00'};

    before(function (done) {
      // Login and store the uid of the 'other' user for the tests in this suite
      // This uid will change everytime the seed-data tasks are run
      rootRef.authWithPassword({
        email: 'r@trackmytries.com',
        password: 'Password1!'
      }, function (err, authData) {
        if (err) {
          done(err);
        } else {
          otherUserId = authData.uid;
          rootRef.unauth();
          rootRef.root().child('categories').limitToFirst(1).once('value', function (snap) {
            validCategory = Object.keys(snap.val())[0];
            done();
          }, function (error) {
            done(error);
          });
        }
      });
    });

    describe('signed in: ', function () {
      var uid = 'defaultUserId';

      before(function (done) {
        rootRef.authWithPassword({
          email: 'b@trackmytries.com',
          password: 'Password1!'
        }, function (err, authData) {
          if (err) {
            done(err);
          } else {
            uid = authData.uid;
            done();
          }
        });
      });

      after(function () {
        rootRef.unauth();
      });

      describe(refUnderTest + 'root tests: ', function () {
        var ref = rootRef.child(refUnderTest);
        it('should not allow read', function (done) {
          asserts.shouldNotReadFromRef(ref, done);
        });

        it('should not allow write', function (done) {
          asserts.shouldNotWriteToRef(ref, done);
        });
      });

      describe('own data tests: ', function () {
        var ref;

        before(function () {
          ref = rootRef.child(refUnderTest)
            .child(uid)
            .child(validCategory)
            .child('someitemkey');
        });

        it('should allow read', function (done) {
          asserts.shouldReadFromRef(ref, done);
        });

        it('should allow write', function (done) {
          asserts.shouldWriteToRef(ref, done, obj);
        });
      });

      describe('another users data tests: ', function () {
        var ref;

        before(function () {
          ref = rootRef.child(refUnderTest)
            .child(otherUserId)
            .child(validCategory)
            .child('someitemkey');
        });

        it('should not allow read', function (done) {
          asserts.shouldNotReadFromRef(ref, done);
        });
        it('should not allow write', function (done) {
          asserts.shouldNotWriteToRef(ref, done);
        });
      });
    });

    describe('signed out: ', function () {
      var ref;

      before(function () {
        ref = rootRef.child(refUnderTest);
      });

      it('should not allow read from' + refUnderTest + 'root', function (done) {
        asserts.shouldNotReadFromRef(ref, done);
      });

      it('should not allow write to' + refUnderTest + 'root', function (done) {
        asserts.shouldNotWriteToRef(ref, done);
      });

      it('should not allow read', function (done) {
        asserts.shouldNotReadFromRef(ref.child(otherUserId).child(validCategory).child('someitemkey'), done);
      });

      it('should not allow write', function (done) {
        asserts.shouldNotWriteToRef(ref.child(otherUserId).child(validCategory).child('someitemkey'), done, obj);
      });
    });
  });
};
