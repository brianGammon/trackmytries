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
          currentUser: ['User', function (User) {
            return User.signInRequired().then(function () {
              return User.getUser();
            });
          }],
          activeCategory: ['Category', '$stateParams', function (Category, $stateParams) {
            return Category.getCategories().then(function (categories) {
              var activeCategory;
              angular.forEach(categories, function (category) {
                if (category.$id === $stateParams.id) {
                  activeCategory = category;
                }
              });
              return activeCategory;
            });
          }],
          $title: ['activeCategory', function (activeCategory) {
            var name = 'Category History';

            if (activeCategory) {
              name = activeCategory.name;
            }

            return name + ' History';
          }]
        }
      });
  }
}());
