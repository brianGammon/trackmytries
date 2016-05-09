(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name user.factory:User
   *
   * @description
   *
   */
  angular
    .module('user')
    .factory('User', User);

  function User($q, Auth, FirebaseRef, $firebaseObject, Category) {
    var UserBase = {},
        callbacks = [],
        fbObjs = [];
        // auth = $firebaseAuth(ref);

    Auth.$onAuth(function (authData) {
      if (!authData) {
        Category.resetCache();
      }
      angular.forEach(callbacks, function (callback) {
        callback();
      });
    });

    UserBase.getUser = function () {
      var deferred = $q.defer(),
          authInfo = Auth.$getAuth(),
          userObj;

      if (!authInfo) {
        deferred.resolve(null);
        return deferred.promise;
      }
      userObj = $firebaseObject(FirebaseRef.getUserProfilesRef());
      fbObjs.push(userObj);
      return userObj.$loaded();
    };

    UserBase.login = function (credentials) {
      return Auth.$authWithPassword({
        email: credentials.email,
        password: credentials.password
      }).then(updateUserProfile);
    };

    UserBase.signUp = function (credentials) {
      // Create the firebase account
      return Auth.$createUser({
        email: credentials.email,
        password: credentials.password
      }).then(function () {
        // If that worked, sign in
        return Auth.$authWithPassword({
          email: credentials.email,
          password: credentials.password
        }).then(function (authInfo) {
          // If sign in was ok, then create a user profile
          authInfo.name = credentials.name;
          return updateUserProfile(authInfo);
        });
      });
    };

    UserBase.changePassword = function (credentials) {
      console.log(credentials);
      return Auth.$changePassword({
        email: credentials.email,
        oldPassword: credentials.password,
        newPassword: credentials.newPassword
      });
    };

    UserBase.facebookLogin = function () {
      return Auth.$authWithOAuthPopup('facebook')
        .then(updateUserProfile);
    };

    UserBase.logout = function () {
      angular.forEach(fbObjs, function (obj) {
        obj.$destroy();
      });
      Auth.$unauth();
    };

    UserBase.onSignInChange = function (callback) {
      callbacks.push(callback);
    };

    UserBase.signInRequired = function () {
      return Auth.$requireAuth();
    };

    return UserBase;

    function updateUserProfile(authInfo) {
      var usersRef = FirebaseRef.getUserProfilesRef(),
          userProfile = {
            provider: authInfo.provider
          };

      switch (authInfo.provider) {
        case 'password':
          if (authInfo.name) {
            userProfile.name = authInfo.name;
          }
          userProfile.email = authInfo.password.email;
          userProfile.providerData = {
            isTemporaryPassword: authInfo.password.isTemporaryPassword,
            profileImageUrl: authInfo.password.profileImageURL
          };
          break;
        case 'facebook':
          userProfile.name = authInfo.facebook.displayName;
          userProfile.providerData = {
            profileImageUrl: authInfo.facebook.profileImageURL,
            accessToken: authInfo.facebook.accessToken
          };
          break;
        default:
          throw new Error('Unsupported auth provider: ' + authInfo.provider);
      }
      return usersRef.update(userProfile);
    }
  }
}());
