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
          }],
          $title: function () {
            return 'Login';
          }
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
          }],
          $title: function () {
            return 'Sign Up';
          }
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
          }],
          $title: function () {
            return 'Change Password';
          }
        }
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'user/views/profile.tpl.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        resolve: {
          currentUser: ['User', function (User) {
            return User.signInRequired().then(function () {
              return User.getUser();
            });
          }],
          $title: function () {
            return 'Profile';
          }
        }
      });
  }
}());
