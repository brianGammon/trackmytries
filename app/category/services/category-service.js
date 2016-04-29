(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name category.factory:Category
   *
   * @description
   *
   */
  angular
    .module('category')
    .factory('Category', Category);

  function Category($q, $firebaseArray, $firebaseObject, FirebaseRef) {
    var CategoryBase = {};

    CategoryBase.getCategories = function () {
      return $firebaseArray(FirebaseRef.getCategoriesRef());
    };

    CategoryBase.getItems = function (categoryId) {
      return $firebaseArray(FirebaseRef.getUserItemsRef().child(categoryId));
    };

    CategoryBase.updateItem = function (categoryId, item) {
      return FirebaseRef.getUserItemsRef().child(categoryId).child(item.$id).update({
        '.priority': item.itemDateTime.toJSON(),
        itemDateTime: item.itemDateTime.toJSON(),
        valueNumber: item.valueNumber,
        notes: item.notes ? item.notes : null
      });
    };

    CategoryBase.addItem = function (categoryId, item) {
      return FirebaseRef.getUserItemsRef().child(categoryId).push({
        '.priority': item.itemDateTime.toJSON(),
        itemDateTime: item.itemDateTime.toJSON(),
        valueNumber: item.valueNumber,
        notes: item.notes ? item.notes : null
      });
    };

    CategoryBase.deleteItem = function (categoryId, itemId) {
      return FirebaseRef.getUserItemsRef().child(categoryId).child(itemId).set(null);
    };

    CategoryBase.getStats = function (categoryId) {
      // Get a list of category keys
      var deferred = $q.defer(),
          userItemsRef = FirebaseRef.getUserItemsRef(),
          query = FirebaseRef.getCategoriesRef();

      if (categoryId) {
        // If a specific category is requested...
        query = query.orderByKey().startAt(categoryId).endAt(categoryId);
      } else {
        // Need all categories, so get by priority for ordering purposes
        query = query.orderByPriority();
      }

      $firebaseArray(query).$loaded().then(function (categories) {
        angular.forEach(categories, function (category) {
          if (category.goalType === 'most') {
            category.best = $firebaseArray(userItemsRef.child(category.$id).orderByChild('valueNumber')
              .limitToLast(1));
          } else {
            category.best = $firebaseArray(userItemsRef.child(category.$id).orderByChild('valueNumber')
              .limitToFirst(1));
          }

          category.items = $firebaseArray(userItemsRef.child(category.$id).orderByPriority());
        });

        // return only the first in array if specific category was requested
        deferred.resolve(categoryId ? categories[0] : categories);
      });

      return deferred.promise;
    };

    return CategoryBase;
  }
}());
