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

    vm.loading = true;
    vm.currentUser = currentUser;
    if (vm.currentUser) {
      Category.getStats().then(function (categories) {
        vm.dashData = categories;
      })
      .finally(function () {
        vm.loading = false;
      });
    }

    vm.addNew = function (event, category) {
      var priorBest = 0,
          firstItemLogged = true;
      if (category.items.length > 0) {
        priorBest = category.best[0].$id;
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
          }
        }
      })
      .then(function () {
        if (category.best[0].$id !== priorBest && !firstItemLogged) {
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
