(function () {
  'use strict';

  angular
    .module('user')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'user/views/login.tpl.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        resolve: {
          currentUser: ['User', function (User) {
            return User.getUser();
          }]
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'user/views/signup.tpl.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        resolve: {
          currentUser: ['User', function (User) {
            return User.getUser();
          }]
        }
      })
      .state('change-password', {
        url: '/change-password',
        templateUrl: 'user/views/change-password.tpl.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
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
