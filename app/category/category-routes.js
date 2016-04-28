(function () {
  'use strict';

  angular
    .module('category')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('category', {
        url: '/category/:id',
        templateUrl: 'category/views/category.tpl.html',
        controller: 'CategoryCtrl',
        controllerAs: 'category',
        resolve: {
          loggedIn: ['User', function (User) {
            return User.signInRequired();
          }]
        }
      });
  }
}());
