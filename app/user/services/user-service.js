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

  function User($q, Auth, FirebaseRef, $firebaseObject, CacheFactory, $window) {
    var UserBase = {},
        callbacks = [],
        userCache;

    if (!CacheFactory.get('userCache')) {
      CacheFactory.createCache('userCache');
    }

    userCache = CacheFactory.get('userCache');

    Auth.$onAuthStateChanged(function (user) {
      if (!user) {
        reset();
      }
      angular.forEach(callbacks, function (callback) {
        callback();
      });
    });

    UserBase.getUser = function () {
      var deferred = $q.defer(),
          user = Auth.$getAuth(),
          userRef,
          userPromise;

      if (!user) {
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
      return Auth.$signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(updateUserProfile);
    };

    UserBase.signUp = function (credentials) {
      // Create the firebase account
      return Auth.$createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(function () {
          // If that worked, sign in
          return Auth.$signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(function (user) {
              // If sign in was ok, then create a user profile
              return updateUserProfile(user, {displayName: credentials.name});
            });
        });
    };

    UserBase.changePassword = function (credentials) {
      var currentUser = Auth.$getAuth(),
          // This should be part of the Angularfire API at some point
          credential = $window.firebase.auth.EmailAuthProvider.credential(credentials.email, credentials.password);

      return currentUser.reauthenticate(credential).then(function () {
        return Auth.$updatePassword(credentials.newPassword);
      });
    };

    UserBase.socialLogin = function (provider) {
      return Auth.$signInWithPopup(provider)
        .then(function (result) {
          return updateUserProfile(result.user, {accessToken: result.credential.accessToken});
        });
    };

    UserBase.logout = function () {
      reset();
      Auth.$signOut();
    };

    UserBase.onSignInChange = function (callback) {
      callbacks.push(callback);
    };

    UserBase.signInRequired = function () {
      return Auth.$requireSignIn();
    };

    UserBase.waitForSignIn = function () {
      return Auth.$waitForSignIn();
    };

    UserBase.setGoal = function (categoryId, goal) {
      var usersRef = FirebaseRef.getUserProfilesRef();

      return usersRef.child('goals').child(categoryId).set(goal);
    };

    UserBase.saveProfile = function (currentUser) {
      return currentUser.$save();
    };

    return UserBase;

    function updateUserProfile(user, options) {
      var providerId = user.providerData[0].providerId,
          usersRef = FirebaseRef.getUserProfilesRef(),
          userProfile = {
            provider: providerId
          };

      switch (providerId) {
        case 'password':
          if (options && options.displayName) {
            userProfile.name = options.displayName;
          }
          userProfile.email = user.email;
          userProfile.providerData = {
            emailVerified: user.emailVerified,
            profileImageUrl: user.providerData[0].photoURL
          };
          break;
        case 'facebook.com':
        case 'google.com':
          userProfile.name = user.providerData[0].displayName;
          userProfile.providerData = {
            profileImageUrl: user.providerData[0].photoURL,
            accessToken: options.accessToken
          };
          break;
        default:
          throw new Error('Unsupported auth provider: ' + user.provider);
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
