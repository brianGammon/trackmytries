(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:FirebaseRef
   *
   * @description
   *
   */
  angular
    .module('common')
    .factory('FirebaseRef', FirebaseRef);

  function FirebaseRef(FirebaseRoot, Auth) {
    return {
      getUserProfilesRef: function () {
        return FirebaseRoot.child('userProfiles').child(Auth.$getAuth().uid);
      },
      getUserItemsRef: function () {
        return FirebaseRoot.child('userItems').child(Auth.$getAuth().uid);
      },
      getCategoriesRef: function () {
        return FirebaseRoot.child('categories');
      },
      getAgeRangeRef: function () {
        return FirebaseRoot.child('ageRange');
      },
      getPrtStandardsRef: function () {
        return FirebaseRoot.child('prtStandards');
      }
    };
  }
}());
