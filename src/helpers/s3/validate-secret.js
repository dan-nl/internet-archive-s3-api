'use strict';

var validateStringLength = require( '../validate-string-length' );

/**
 * @param {string} user_secret
 * @throws {Error}
 * @returns {string}
 */
function validateSecret( user_secret ) {
  var message;
  var secret;

  if ( typeof user_secret !== 'string' ) {
    message =
      'validateSecret( `%user_secret` ): secret not provided as a string'
        .replace( '%user_secret', user_secret );

    throw new Error( message );
  }

  secret = user_secret.trim();

  if ( !validateStringLength( secret, 1 ) ) {
    message =
      [
        'validateSecret( `%secret` ) string length [ %length ] ',
        'is less than the min string length [ 1 ] required'
      ]
        .join( '' )
        .replace( '%secret', secret )
        .replace( '%length', String( secret.length ) );

    throw new Error( message );
  }

  return secret;
}

module.exports = validateSecret;
