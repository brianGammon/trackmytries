/* global describe, it, before, beforeEach, after */
'use strict';
var Firebase = require('firebase'),
    config = require('../../config.js'),
    fbUrl = config.fbUrl + '/userItems',
    ref = new Firebase(fbUrl);

describe('userItems validation tests', function () {
  var uid,
      validCategory,
      sampleItem;

  before(function (done) {
    ref.authWithPassword({
      email: 'b@trackmytries.com',
      password: 'Password1!'
    }, function (err, authData) {
      if (err) {
        done(err);
      } else {
        uid = authData.uid;
        ref.root().child('categories').limitToFirst(1).once('value', function (snap) {
          validCategory = Object.keys(snap.val())[0];
          done();
        }, function (error) {
          done(error);
        });
      }
    });
  });

  after(function () {
    ref.unauth();
  });

  beforeEach(function () {
    sampleItem = {
      itemDateTime: '2012-08-06T05:00:00Z',
      valueNumber: 22
    };
  });

  it('should not allow an invalid category', function (done) {
    ref.child(uid).child('invalidcategory').push(sampleItem, function (error) {
      if (!error) {
        done(new Error('Invalid category should not be allowed'));
      } else {
        done();
      }
    });
  });

  it('should allow a valid category', function (done) {
    ref.child(uid).child(validCategory).push(sampleItem, function (error) {
      if (error) {
        done(error);
      } else {
        done();
      }
    });
  });

  it('should only allow itemDateTime, valueNumber, and notes fields', function (done) {
    sampleItem.somethingElse = 'A';
    ref.child(uid).child(validCategory).push(sampleItem, function (error) {
      if (!error) {
        done(new Error('Extra fields should not be allowed'));
      } else {
        done();
      }
    });
  });

  describe('valueNumber: ', function () {
    it('should not allow strings', function (done) {
      sampleItem.valueNumber = 'A';
      ref.child(uid).child(validCategory).push(sampleItem, function (error) {
        if (!error) {
          done(new Error('String for valueNumber should not be allowed'));
        } else {
          done();
        }
      });
    });

    it('should be required', function (done) {
      sampleItem.valueNumber = null;
      ref.child(uid).child(validCategory).push(sampleItem, function (error) {
        if (!error) {
          done(new Error('Null for valueNumber should not be allowed'));
        } else {
          done();
        }
      });
    });
  });

  describe('itemDateTime: ', function () {
    it('should not allow strings that are not valid JSON dates', function (done) {
      sampleItem.itemDateTime = 2;
      ref.child(uid).child(validCategory).push(sampleItem, function (error) {
        if (!error) {
          done(new Error('Bad datetime string should not be allowed'));
        } else {
          done();
        }
      });
    });

    it('should allow strings that are valid JSON dates', function (done) {
      ref.child(uid).child(validCategory).push(sampleItem, function (error) {
        if (!error) {
          done();
        } else {
          done(new Error('Valid datetime string should be allowed'));
        }
      });
    });

    it('should be required', function (done) {
      delete sampleItem.itemDateTime;
      ref.child(uid).child(validCategory).push(sampleItem, function (error) {
        if (!error) {
          done(new Error('Null itemDateTime should not be allowed'));
        } else {
          done();
        }
      });
    });
  });

  describe('notes: ', function () {
    it('should only allow strings', function (done) {
      sampleItem.notes = 2;
      ref.child(uid).child(validCategory).push(sampleItem, function (error) {
        if (!error) {
          done(new Error('Notes should only allow strings'));
        } else {
          done();
        }
      });
    });
    it('should not allow more than 100 characters', function (done) {
      sampleItem.notes =
        'This is an excessively long note, there should be no reason to have a note longer than this in the app.';
      ref.child(uid).child(validCategory).push(sampleItem, function (error) {
        if (!error) {
          done(new Error('Notes should only allow strings longer than 100 characters'));
        } else {
          done();
        }
      });
    });
  });
});
