(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:FirebaseRoot
   *
   * @description
   *
   */
  angular
    .module('common')
    .factory('FirebaseRoot', firebaseRoot);

  function firebaseRoot(FIREBASEURL, $window) {
    return new $window.Firebase(FIREBASEURL);
  }
}());
