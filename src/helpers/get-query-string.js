/* eslint no-param-reassign: off */

'use strict';

/**
 * @param {Object} user_query_string
 * @param {number} user_query_string.check_auth
 *
 * @returns {Object}
 */
function getQueryString( user_query_string ) {
  var query_string = {};

  user_query_string = user_query_string || {};

  if ( typeof user_query_string.check_auth === 'number' ) {
    if ( !isNaN( user_query_string.check_auth ) ) {
      query_string.check_auth = String( user_query_string.check_auth );
    }
  }

  return query_string;
}

module.exports = getQueryString;
