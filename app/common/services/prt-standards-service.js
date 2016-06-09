(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:PrtStandards
   *
   * @description
   *
   */
  angular
    .module('common')
    .factory('PrtStandards', PrtStandards);

  function PrtStandards(FirebaseRef, $firebaseObject) {
    var PrtStandardsBase = {},
        ageRangeRef = FirebaseRef.getAgeRangeRef(),
        prtStandardsRef = FirebaseRef.getPrtStandardsRef();

    PrtStandardsBase.getPrtStandards = function () {
      return $firebaseObject(prtStandardsRef);
    };

    PrtStandardsBase.getPrtStandardsByCategory = function (gender, ageRange, categoryId) {
      return $firebaseObject(prtStandardsRef.child(gender).child(ageRange).child(categoryId));
    };

    PrtStandardsBase.getAgeRanges = function () {
      return $firebaseObject(ageRangeRef);
    };

    return PrtStandardsBase;
  }
}());
