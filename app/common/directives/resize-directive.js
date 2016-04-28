(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name common.directive:resize
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="common">
       <file name="index.html">
        <resize></resize>
       </file>
     </example>
   *
   */
  angular
    .module('common')
    .directive('resize', resize);

  function resize($window) {
    return function (scope, element) {
      var w = angular.element($window);

      w.bind('resize', function () {
        // when window size gets changed
        changeHeight();
      });

      // when page loads
      changeHeight();

      function changeHeight() {
        element.css('height', $window.innerHeight + 'px');
      }
    };
  }
}());
