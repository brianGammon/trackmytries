(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:DashboardCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('DashboardCtrl', DashboardCtrl);

  function DashboardCtrl(currentUser, Category, $mdDialog, $mdToast) {
    var vm = this;

    vm.stats = {};
    vm.currentUser = currentUser;

    Category.getCategories().then(function (categories) {
      vm.categories = categories;

      angular.forEach(categories, function (category) {
        vm.stats[category.$id] = Category.getStats(category);
      });
    });

    vm.addNew = function (event, category) {
      var priorBest = 0,
          firstItemLogged = true;
      if (vm.stats[category.$id].items.length > 0) {
        priorBest = vm.stats[category.$id].best[0].$id;
        firstItemLogged = false;
      }

      // var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        controller: 'ItemDialogCtrl',
        controllerAs: 'dialog',
        templateUrl: 'category/views/item-dialog.tpl.html',
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: false,
        resolve: {
          category: function () {
            return category;
          },
          item: function () {
            return null;
          },
          lastValue: function () {
            if (vm.stats[category.$id].items.length > 0) {
              return vm.stats[category.$id].items[vm.stats[category.$id].items.length - 1].valueNumber;
            }
            return 0;
          }
        }
      })
      .then(function () {
        if (vm.stats[category.$id].best[0].$id !== priorBest && !firstItemLogged) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Congrats, that is a new PR!')
              .position('top left')
              .hideDelay(3000)
              .theme('success-toast')
          );
        }
      }, function () {
        console.log('Item dialog cancelled');
      });
    };
  }
}());
