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
    });
}());
