(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name category.controller:ItemDialogCtrl
   *
   * @description
   *
   */
  angular
    .module('category')
    .controller('ItemDialogCtrl', ItemDialogCtrl);

  function ItemDialogCtrl(category, item, Category, $mdDialog, $mdToast) {
    var vm = this,
        defaultValue = 0;

    vm.category = category;
    vm.hours = 0;
    vm.mins = 0;
    vm.secs = 0;

    if (!item) {
      // Default new item to the value of the last one, if supplied
      if (category.stats.latest.length > 0) {
        defaultValue = category.stats.latest[0].valueNumber;
      }
      vm.item = {};
      vm.item.itemDateTime = new Date(Date.now());
      vm.item.valueNumber = defaultValue;
    } else {
      vm.item = item;
      vm.item.itemDateTime = new Date(item.itemDateTime);
    }

    if (category.valueType === 'duration') {
      // convert seconds elapsed into HH:MM:SS, for duration categories
      vm.hours = Math.floor(vm.item.valueNumber / 3600);
      vm.mins = Math.floor(vm.item.valueNumber % 3600 / 60);
      vm.secs = Math.floor(vm.item.valueNumber % 3600 % 60);
    }

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.save = function () {
      if (category.valueType === 'duration') {
        vm.item.valueNumber = vm.hours * 3600 + vm.mins * 60 + vm.secs;
      }

      if (vm.form.$valid) {
        if (item) {
          // An item was passed in, so this is an update
          Category.updateItem(category.$id, vm.item)
            .then(onSuccess)
            .catch(onError);
        } else {
          Category.addItem(category.$id, vm.item)
            .then(onSuccess)
            .catch(onError);
        }
      }
    };

    function onSuccess(result) {
      if (result) {
        $mdDialog.hide(result);
      } else {
        // If no result, then authorization probably failed
        $mdDialog.hide();
      }
    }

    function onError(err) {
      console.log(err);
      $mdToast.show(
        $mdToast.simple()
          .textContent(err.message ? err.message : 'An unknown error has occurred')
          .action('OK')
          .position('top left')
          .hideDelay(4000)
          .theme('error-toast')
      );
    }
  }
}());
