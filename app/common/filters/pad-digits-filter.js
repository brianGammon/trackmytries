(function () {
  'use strict';

  /**
   * @ngdoc filter
   * @name common.filter:padDigits
   *
   * @description
   *
   * @param {Array} input The array to filter
   * @returns {Array} The filtered array
   *
   */
  angular
    .module('common')
    .filter('padDigits', padDigits);

  function padDigits() {
    return function (index) {
      if (index < 10) {
        return '0' + index.toString();
      }
      return index.toString();
    };
  }
}());
