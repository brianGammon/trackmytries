'use strict';
var nconf = require('nconf');

// Load up our config settings
// argv & server ENV override the file
// env.json goes in the root of the project where package.json is
// Defaults are the fallback
nconf.argv().env().file({file: 'env.json'})
  .defaults({
    // Your should use env.json in your dev environment
    FBURL: 'https://<yourfbnamehere>.firebaseio.com',
    FBSECRET: 'thisShouldNotBeUnderSourceControl'
  });

module.exports = {
  fbUrl: nconf.get('FBURL'),
  fbSecret: nconf.get('FBSECRET')
};
