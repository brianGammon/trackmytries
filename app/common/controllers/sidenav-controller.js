(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name common.controller:SidenavCtrl
   *
   * @description
   *
   */
  angular
    .module('common')
    .controller('SidenavCtrl', SidenavCtrl);

  function SidenavCtrl($timeout, $state, $mdToast, User, Category) {
    var vm = this,
        signoutClicked = false;

    vm.categories = Category.getCategories();

    // User.getUser().then(function (user) {
    //   // Grab our current user and start listening for sign in changes
    //   vm.currentUser = user;
    //   User.onSignInChange(updateUser);
    // });

    User.onSignInChange(updateUser);

    vm.logout = function () {
      signoutClicked = true;
      User.logout();
    };

    // Internal function for handling login state change
    function updateUser() {
      $timeout(function () {
        // Before asking for the current user, see if we had one before
        var userBefore = !!vm.currentUser;

        User.getUser().then(function (user) {
          vm.currentUser = user;
          if (!vm.currentUser && userBefore) {
            // No user now, but there was before
            if (!signoutClicked) {
              // If logout wasn't clicked, then the firebase session has ended
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Your session has ended, please login again.')
                  .position('top left')
                  .hideDelay(5000)
              );
            }

            // Send user back to home page
            $state.go('home', {}, {reload: true});
          } else {
            // Reset click flag for next time
            signoutClicked = false;
          }
        });
      });
    }
  }
}());
