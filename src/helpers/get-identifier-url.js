/* eslint no-param-reassign: off */

'use strict';

/**
 * module dependencies
 */
var validateIdentifier = require( './ia/validate-identifier' );

/**
 * @param {string} user_identifier
 * @returns {string}
 */
function getIdentifierUrl( user_identifier ) {
  var identifier = validateIdentifier( user_identifier );

  return 'https://:identifier.s3.us.archive.org'
    .replace( ':identifier', identifier );
}

module.exports = getIdentifierUrl;
