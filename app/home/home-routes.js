(function () {
  'use strict';

  angular
    .module('home')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/views/home.tpl.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
        resolve: {
          currentUser: ['User', function (User) {
            return User.getUser();
          }]
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'home/views/dashboard.tpl.html',
        controller: 'DashboardCtrl',
        controllerAs: 'db',
        resolve: {
          currentUser: ['User', function (User) {
            return User.signInRequired().then(function () {
              return User.getUser();
            });
          }]
        }
      });
  }
}());
