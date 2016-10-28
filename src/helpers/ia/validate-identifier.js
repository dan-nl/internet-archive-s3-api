'use strict';

var validateStringLength = require( '../validate-string-length' );

/**
 * @param {string} user_identifier
 * @throws {Error}
 * @returns {string}
 */
function validateIdentifier( user_identifier ) {
  var identifier;
  var message;

  if ( typeof user_identifier !== 'string' ) {
    message =
      'validateIdentifier( `%identifier` ): identifier not provided as a string'
        .replace( '%identifier', user_identifier );

    throw new Error( message );
  }

  identifier = user_identifier.trim();

  if ( !validateStringLength( identifier, 1 ) ) {
    message =
      [
        'validateIdentifier( `%identifier` ) string length [ %length ] ',
        'is less than the min string length [ 1 ] required'
      ]
        .join( '' )
        .replace( '%identifier', identifier )
        .replace( '%length', String( identifier.length ) );

    throw new Error( message );
  }

  return identifier;
}

module.exports = validateIdentifier;
