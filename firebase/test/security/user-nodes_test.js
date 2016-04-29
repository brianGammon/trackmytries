/* global describe */
'use strict';
var Firebase = require('firebase'),
    config = require('../../config'),
    fbUrl = config.fbUrl,
    rootRef = new Firebase(fbUrl),
    refHelper = require('./user-nodes-helper.js');

describe('userProfiles tests', function () {
  refHelper(rootRef, 'userProfiles');
});

describe('userItems tests', function () {
  refHelper(rootRef, 'userItems');
});
