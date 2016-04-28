(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name common.directive:sidenav
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="common">
       <file name="index.html">
        <sidenav></sidenav>
       </file>
     </example>
   *
   */
  angular
    .module('common')
    .directive('sidenav', sidenav);

  function sidenav() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'common/directives/sidenav-directive.tpl.html',
      replace: false,
      controllerAs: 'nav',
      controller: 'SidenavCtrl',
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
