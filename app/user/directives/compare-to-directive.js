(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name user.directive:compareTo
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="user">
       <file name="index.html">
        <compare-to></compare-to>
       </file>
     </example>
   *
   */
  angular
    .module('user')
    .directive('compareTo', compareTo);

  function compareTo() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=compareTo'
      },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue === scope.otherModelValue;
        };

        scope.$watch('otherModelValue', function () {
          ngModel.$validate();
        });
      }
    };
  }
}());
