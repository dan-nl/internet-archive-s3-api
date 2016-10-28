'use strict';

/**
 * module requirements
 */
var request = require( 'request-as-bluebird' );
var getRequestOptions = require( './helpers/get-request-options' );

/**
 * returns a list of all buckets owned by the authenticated sender of the request.
 *
 * @param {Object} request_options
 * @param {Object} [request_headers]
 * @param {boolean} [debug]
 *
 * @returns {Promise.<{ body: string, response: IncomingMessage }>}
 */
function getBucketList( request_options, request_headers, debug ) {
  var options;
  var headers;

  options = request_options || {};
  headers = request_headers || null;

  // note: if provided, these user request_options will be overwritten
  options.url = 'https://s3.us.archive.org';

  // console.log( getRequestOptions( options, headers ) );
  return request( getRequestOptions( options, headers ), debug );
}

module.exports = getBucketList;
