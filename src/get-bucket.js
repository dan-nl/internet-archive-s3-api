'use strict';

/**
 * module requirements
 */
var request = require( 'request-as-bluebird' );
var getRequestOptions = require( './helpers/get-request-options' );

/**
 * returns details about an archive.org user’s bucket.
 *
 * - ia sa access key is required
 * - ia sa secret is required
 * - ia identifier is required
 * - optional request headers can be sent, but are not necessary and may lead to unexpected results.
 * - optional debug can be set to output request debug info.
 *
 * @param {Object} request_options
 * @param {Object} [request_headers]
 * @param {boolean} [debug]
 *
 * @throws {Error}
 * @returns {Promise.<{ body: string, response: IncomingMessage }>}
 */
function getBucket( request_options, request_headers, debug ) {
  var options;
  var headers;

  options = request_options || {};
  headers = request_headers || null;

  // note: if provided, these user request_options will be overwritten
  options.qs = options.qs || {};
  options.qs[ 'list-type' ] = 2;

  return request( getRequestOptions( options, headers ), debug );
}

module.exports = getBucket;
