(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name common.directive:menuNav
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="common">
       <file name="index.html">
        <menu></menu>
       </file>
     </example>
   *
   */
  angular
    .module('common')
    .directive('menuNav', menuNav);

  function menuNav() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'common/directives/menu-nav-directive.tpl.html',
      replace: false,
      controllerAs: 'menu',
      controller: function ($mdSidenav) {
        var vm = this;
        vm.toggleNav = function () {
          $mdSidenav('left').toggle();
        };
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
