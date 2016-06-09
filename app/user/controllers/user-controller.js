(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.controller:UserCtrl
   *
   * @description
   *
   */
  angular
    .module('user')
    .controller('UserCtrl', UserCtrl);

  function UserCtrl(currentUser, User, PrtStandards, $scope, $state, $mdToast) {
    var vm = this;

    vm.currentUser = currentUser;
    vm.ageRanges = PrtStandards.getAgeRanges();

    vm.login = function () {
      if (vm.loginForm.$valid) {
        User.login(vm.credentials)
          .then(onSuccess)
          .catch(onError);
      }
    };

    vm.signUp = function () {
      if (vm.loginForm.$valid) {
        User.signUp(vm.credentials)
          .then(onSuccess)
          .catch(onError);
      }
    };

    vm.changePassword = function () {
      if (vm.loginForm.$valid) {
        vm.credentials.email = currentUser.email;
        User.changePassword(vm.credentials)
          .then(onSuccess)
          .catch(onError);
      }
    };

    vm.socialLogin = function (provider) {
      User.socialLogin(provider)
        .then(onSuccess)
        .catch(onError);
    };

    vm.logout = function () {
      User.logout();
    };

    vm.saveProfile = function () {
      User.saveProfile(currentUser)
        .then(onSuccess)
        .catch(onError);
    };

    function onSuccess() {
      $state.go('dashboard');
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
