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

    CategoryBase.getCategory = function (categoryId) {
      return $firebaseObject(FirebaseRef.getCategoriesRef().child(categoryId));
    };

    CategoryBase.getCategories = function () {
      return $firebaseArray(FirebaseRef.getCategoriesRef());
    };

    CategoryBase.getItems = function (categoryId) {
      return $firebaseArray(FirebaseRef.getUserItemsRef().child(categoryId));
    };

    CategoryBase.updateItem = function (categoryId, item) {
      console.log(item);
      return FirebaseRef.getUserItemsRef().child(categoryId).child(item.$id).update({
        itemDateTime: item.itemDateTime.toJSON(),
        valueNumber: item.valueNumber,
        notes: item.notes ? item.notes : null
      });
    };

    CategoryBase.addItem = function (categoryId, item) {
      return FirebaseRef.getUserItemsRef().child(categoryId).push({
        itemDateTime: item.itemDateTime.toJSON(),
        valueNumber: item.valueNumber,
        notes: item.notes ? item.notes : null
      });
    };

    CategoryBase.deleteItem = function (categoryId, itemId) {
      return FirebaseRef.getUserItemsRef().child(categoryId).child(itemId).set(null);
    };

    CategoryBase.getStatsByCategory = function (category) {
      var stats = {},
          userItemsRef = FirebaseRef.getUserItemsRef();

      if (category.goalType === 'least') {
        stats.best = $firebaseArray(userItemsRef.child(category.$id)
          .orderByChild('valueNumber').limitToFirst(1));
      } else {
        stats.best = $firebaseArray(userItemsRef.child(category.$id)
          .orderByChild('valueNumber').limitToLast(1));
      }

      stats.latest = $firebaseArray(userItemsRef.child(category.$id)
        .orderByChild('itemDateTime').limitToLast(1));
      stats.first = $firebaseArray(userItemsRef.child(category.$id)
        .orderByChild('itemDateTime').limitToFirst(1));
      return stats;
    };

    CategoryBase.getStats = function () {
      // Get a list of category keys
      var deferred = $q.defer(),
          userItemsRef = FirebaseRef.getUserItemsRef();

      $firebaseArray(FirebaseRef.getCategoriesRef()).$loaded().then(function (categories) {
        angular.forEach(categories, function (category) {
          category.stats = {};

          if (category.goalType === 'most') {
            category.stats.best = $firebaseArray(userItemsRef.child(category.$id).orderByChild('valueNumber')
              .limitToLast(1));
          } else {
            category.stats.best = $firebaseArray(userItemsRef.child(category.$id).orderByChild('valueNumber')
              .limitToFirst(1));
          }

          category.stats.latest = $firebaseArray(userItemsRef.child(category.$id).orderByChild('itemDateTime')
            .limitToLast(1));
          category.stats.first = $firebaseArray(userItemsRef.child(category.$id).orderByChild('itemDateTime')
            .limitToFirst(1));
        });

        deferred.resolve(categories);
      });

      return deferred.promise;
    };

    return CategoryBase;
  }
}());
