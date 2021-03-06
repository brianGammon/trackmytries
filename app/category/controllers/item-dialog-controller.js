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

  function ItemDialogCtrl(category, item, lastValue, Category, $mdDialog, $mdToast) {
    var vm = this;

    vm.category = category;
    vm.hours = 0;
    vm.mins = 0;
    vm.secs = 0;

    if (!item) {
      vm.item = {};
      vm.item.itemDateTime = new Date(Date.now());
      vm.item.valueNumber = lastValue ? lastValue : 0;
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

    vm.getNumberList = function (num) {
      return new Array(num);
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.save = function () {
      if (category.valueType === 'duration') {
        vm.item.valueNumber = parseInt(vm.hours, 10) * 3600 + parseInt(vm.mins, 10) * 60 + parseInt(vm.secs, 10);
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
