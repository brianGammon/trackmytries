(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name category.directive:categoryStats
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="category">
       <file name="index.html">
        <category-stats></category-stats>
       </file>
     </example>
   *
   */
  angular
    .module('category')
    .directive('categoryStats', categoryStats);

  function categoryStats() {
    return {
      restrict: 'E',
      templateUrl: 'category/directives/category-stats-directive.tpl.html',
      replace: true,
      scope: {
        category: '=',
        viewAll: '=',
        addFn: '&'
      }
    };
  }
}());
