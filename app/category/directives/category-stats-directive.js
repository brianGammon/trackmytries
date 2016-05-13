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
        stats: '=',
        goal: '=',
        viewAll: '=',
        addFn: '&'
      },
      controller: CategoryStatsCtrl,
      controllerAs: 'vm',
      bindToController: true
    };

    function CategoryStatsCtrl($mdDialog) {
      var vm = this;

      vm.editGoal = function (event) {
        $mdDialog.show({
          controller: GoalDialogCtrl,
          controllerAs: 'dialog',
          templateUrl: 'category/views/goal-dialog.tpl.html',
          targetEvent: event,
          clickOutsideToClose: true,
          resolve: {
            category: function () {
              return vm.category;
            },
            goal: function () {
              return vm.goal;
            }
          }
        })
        .then(function () {
          // Done
        }, function () {
          console.log('Item dialog cancelled');
        });
      };
    }

    function GoalDialogCtrl(category, goal, $mdDialog, User) {
      var vm = this;
      vm.category = category;
      vm.goal = goal;

      if (category.valueType === 'duration') {
        // convert seconds elapsed into HH:MM:SS, for duration categories
        vm.hours = Math.floor(goal / 3600);
        vm.mins = Math.floor(goal % 3600 / 60);
        vm.secs = Math.floor(goal % 3600 % 60);
      }

      vm.getNumberList = function (num) {
        return new Array(num);
      };

      vm.save = function () {
        if (category.valueType === 'duration') {
          vm.goal = parseInt(vm.hours, 10) * 3600 + parseInt(vm.mins, 10) * 60 + parseInt(vm.secs, 10);
        }

        if (vm.form.$valid) {
          User.setGoal(category.$id, vm.goal).then(function () {
            console.log('saved');
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        $mdDialog.hide();
      };

      vm.cancel = function () {
        $mdDialog.hide();
      };
    }
  }
}());
