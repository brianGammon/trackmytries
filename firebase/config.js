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
    FBSECRET: 'thisShouldNotBeUnderSourceControl',
    // Use env.json to load data from other files (like for Prod)
    CATEGORYDATA: './sample_data/categories-test-data.json',
    USERDATA: './sample_data/users-test-data.json',
    ITEMDATA: './sample_data/items-test-data.json'
  });

module.exports = {
  fbUrl: nconf.get('FBURL'),
  fbSecret: nconf.get('FBSECRET'),
  categoryData: nconf.get('CATEGORYDATA'),
  userData: nconf.get('USERDATA'),
  itemData: nconf.get('ITEMDATA')
};
