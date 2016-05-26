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

  function User($q, Auth, FirebaseRef, $firebaseObject, CacheFactory) {
    var UserBase = {},
        callbacks = [],
        userCache;

    if (!CacheFactory.get('userCache')) {
      CacheFactory.createCache('userCache');
    }

    userCache = CacheFactory.get('userCache');

    Auth.$onAuth(function (authData) {
      if (!authData) {
        reset();
      }
      angular.forEach(callbacks, function (callback) {
        callback();
      });
    });

    UserBase.getUser = function () {
      var deferred = $q.defer(),
          authInfo = Auth.$getAuth(),
          userRef,
          userPromise;

      if (!authInfo) {
        console.log('No user is logged in');
        deferred.resolve(null);
        return deferred.promise;
      }

      if (!userCache.get('userPromise')) {
        console.log('calling fb for user profile');
        userRef = $firebaseObject(FirebaseRef.getUserProfilesRef());
        userPromise = userRef.$loaded();
        userCache.put('userRef', userRef);
        userCache.put('userPromise', userPromise);
      } else {
        console.log('serving user profile from cache');
      }

      return userCache.get('userPromise');
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
      return Auth.$changePassword({
        email: credentials.email,
        oldPassword: credentials.password,
        newPassword: credentials.newPassword
      });
    };

    UserBase.socialLogin = function (provider) {
      return Auth.$authWithOAuthPopup(provider)
        .then(updateUserProfile);
    };

    UserBase.logout = function () {
      reset();
      Auth.$unauth();
    };

    UserBase.onSignInChange = function (callback) {
      callbacks.push(callback);
    };

    UserBase.signInRequired = function () {
      return Auth.$requireAuth();
    };

    UserBase.setGoal = function (categoryId, goal) {
      var usersRef = FirebaseRef.getUserProfilesRef();

      return usersRef.child('goals').child(categoryId).set(goal);
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
        case 'google':
          userProfile.name = authInfo[authInfo.provider].displayName;
          userProfile.providerData = {
            profileImageUrl: authInfo[authInfo.provider].profileImageURL,
            accessToken: authInfo[authInfo.provider].accessToken
          };
          break;
        default:
          throw new Error('Unsupported auth provider: ' + authInfo.provider);
      }
      return usersRef.update(userProfile);
    }

    function reset() {
      // Disconnects firebase array and objects and cleans up caches
      var categoryCache = CacheFactory.get('category'),
          itemsCache = CacheFactory.get('items');

      // disconnect userProfile obj and remove from cache
      if (userCache.get('userRef')) {
        console.log('$destroy userRef');
        userCache.get('userRef').$destroy();
      }
      userCache.removeAll();

      // Clear any cached categories
      if (categoryCache) {
        // No need to call $destroy on categories, but might later
        // once user categories is implemented
        console.log('remove all categories');
        categoryCache.removeAll();
      }

      // Disconnect userItems arrays and clear from cache
      if (itemsCache) {
        angular.forEach(itemsCache.keys(), function (key) {
          // Disconnecting all firebase Arrays from server
          var obj = itemsCache.get(key);
          obj.best.$destroy();
          obj.items.$destroy();
        });
        itemsCache.removeAll();
      }
    }
  }
}());
