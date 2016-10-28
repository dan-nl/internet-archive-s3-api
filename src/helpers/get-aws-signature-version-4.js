'use strict';

/**
 * module dependencies
 */
var aws4 = require( 'aws4' );

/**
 * @todo: figure out how to format this signed key for ia - this aws version doesn’t work
 *
 * @param {string} access
 * @param {string} secret
 *
 * @returns {Object}
 */
function getAuthorizationHeader( access, secret ) {
  var options = {
    host: 's3.us.archive.org',
    path: '/'
  };

  var credentials = {
    accessKeyId: access,
    secretAccessKey: secret
  };

  return aws4.sign( options, credentials );
}

module.exports = getAuthorizationHeader;
