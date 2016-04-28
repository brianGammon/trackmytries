(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name user.factory:Auth
   *
   * @description
   *
   */
  angular
    .module('user')
    .factory('Auth', Auth);

  function Auth($firebaseAuth, FirebaseRoot) {
    return $firebaseAuth(FirebaseRoot);
  }
}());
