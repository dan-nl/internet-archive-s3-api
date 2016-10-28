'use strict';

/**
 * module dependencies
 */
var validateAccess = require( './s3/validate-access' );
var validateSecret = require( './s3/validate-secret' );

/**
 * @param {string} user_access
 * @param {string} user_secret
 * @returns {string}
 */
function getAuthorizationHeaderLow( user_access, user_secret ) {
  var access = validateAccess( user_access );
  var secret = validateSecret( user_secret );

  return 'LOW %a:%s'
    .replace( '%a', access )
    .replace( '%s', secret );
}

module.exports = getAuthorizationHeaderLow;
