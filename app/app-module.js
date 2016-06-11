(function () {
  'use strict';

  /* @ngdoc object
   * @name trackmytries
   * @description
   *
   */
  angular
    .module('trackmytries', [
      'ngMaterial',
      'ui.router',
      'ui.router.title',
      'angular-cache',
      'ngMdIcons',
      'ngMessages',
      'firebase',
      'home',
      'common',
      'user',
      'category'
    ])
    .config(function ($mdThemingProvider) {
      $mdThemingProvider.theme('success-toast');
      $mdThemingProvider.theme('error-toast');
    })
    .run(function ($window) {
      // Initialize Firebase
      var config = {
        apiKey: 'AIzaSyCch4JEtLeR20wrno_6IZzyUXfU317x0dM',
        authDomain: 'trackmytries-dev.firebaseapp.com',
        databaseURL: 'https://trackmytries-dev.firebaseio.com'
      };

      $window.firebase.initializeApp(config);
    });
}());
