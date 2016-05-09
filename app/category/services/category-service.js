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

  function Category($firebaseArray, $firebaseObject, FirebaseRef, CacheFactory) {
    var CategoryBase = {},
        categoryCache,
        itemsCache;

    if (!CacheFactory.get('category')) {
      CacheFactory.createCache('category');
    }

    if (!CacheFactory.get('items')) {
      CacheFactory.createCache('items');
    }

    categoryCache = CacheFactory.get('category');
    itemsCache = CacheFactory.get('items');

    CategoryBase.getCategories = function () {
      var firebaseArray = $firebaseArray(FirebaseRef.getCategoriesRef());

      if (!categoryCache.get('categories')) {
        console.log('calling fb for categories');
        categoryCache.put('categories', firebaseArray.$loaded());
      } else {
        console.log('serving categories from cache');
      }

      return categoryCache.get('categories');
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

    CategoryBase.getStats = function (category) {
      var userItemsRef = FirebaseRef.getUserItemsRef(),
          stats = {};

      if (!itemsCache.get(category.$id)) {
        if (category.goalType === 'most') {
          stats.best = $firebaseArray(userItemsRef.child(category.$id).orderByChild('valueNumber')
            .limitToLast(1));
        } else {
          stats.best = $firebaseArray(userItemsRef.child(category.$id).orderByChild('valueNumber')
            .limitToFirst(1));
        }
        stats.items = $firebaseArray(userItemsRef.child(category.$id).orderByPriority());

        console.log('calling fb for items: ' + category.name);
        itemsCache.put(category.$id, stats);
      } else {
        console.log('serving items from cache for: ' + category.name);
      }

      return itemsCache.get(category.$id);
    };

    return CategoryBase;
  }
}());
