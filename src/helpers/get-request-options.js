'use strict';

/**
 * module dependencies
 */
var getAuthorizationHeaderLow = require( './get-authorization-header-low' );
var getGenericRequestOptions = require( 'generic-request-options' );
var getIdentifierUrl = require( './get-identifier-url' );
var getQueryString = require( './get-query-string' );

/**
 * @param {Object} user_request_options
 * @param {Object} [request_headers]
 *
 * @returns {Object}
 */
function getRequestOptions( user_request_options, request_headers ) {
  var options;

  if ( !( user_request_options instanceof Object ) ) {
    throw new Error( 'getRequestOptions(): user_request_options not provided as an Object' );
  }

  options = getGenericRequestOptions( user_request_options, request_headers );
  options.method = user_request_options.method || 'get';
  options.qs = getQueryString( user_request_options.qs );

  options.headers.authorization =
    options.headers.authorization ||
    getAuthorizationHeaderLow( user_request_options.access, user_request_options.secret );

  options.url =
    options.url ||
    getIdentifierUrl( user_request_options.identifier );

  return options;
}

module.exports = getRequestOptions;
