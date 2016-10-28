'use strict';

var validateStringLength = require( '../validate-string-length' );

/**
 * @param {string} user_access
 * @throws {Error}
 * @returns {string}
 */
function validateAccess( user_access ) {
  var access;
  var message;

  if ( typeof user_access !== 'string' ) {
    message =
      'validateAccess( `%user_access` ): access not provided as a string'
        .replace( '%user_access', user_access );

    throw new Error( message );
  }

  access = user_access.trim();

  if ( !validateStringLength( access, 1 ) ) {
    message =
      [
        'validateAccess( `%access` ) string length [ %length ] ',
        'is less than the min string length [ 1 ] required'
      ]
        .join( '' )
        .replace( '%access', access )
        .replace( '%length', String( access.length ) );

    throw new Error( message );
  }

  return access;
}

module.exports = validateAccess;
