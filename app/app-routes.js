(function () {
  'use strict';

  angular
    .module('trackmytries')
    .config(config)
    .run(function ($rootScope, $mdSidenav, $state) {
      var onStateChange,
          onStateChangeError;

      onStateChange = $rootScope.$on('$stateChangeSuccess',
        function () {
          // Make sure the sidenav is closed after navigating somewhere
          $mdSidenav('left').close();
        });
      $rootScope.$on('$destroy', onStateChange);

      onStateChangeError = $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
          event.preventDefault();
          if (error === 'AUTH_REQUIRED') {
            $state.go('login');
          }
        });
      $rootScope.$on('$destroy', onStateChangeError);
    });

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());
