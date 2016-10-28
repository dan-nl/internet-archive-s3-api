'use strict';

/**
 * module requirements
 */
var request = require( 'request-as-bluebird' );
var getRequestOptions = require( './helpers/get-request-options' );

/**
 * creates a new ia s3 bucket
 *
 * - ia sa access key is required
 * - ia sa secret is required
 * - optional metadata can be sent via the `request_options.headers param`, which should be prefixed
 *   with `x-archive-meta-` for each metadata item: see getMetadataHeaders.
 * - optional request headers can be sent, but are not necessary and may lead to unexpected results.
 * - debug is optional; when set it will output request debug info.
 *
 * @param {Object} request_options
 * @param {string} request_options.access
 * @param {Object} [request_options.headers]
 * @param {string} request_options.identifier
 * @param {string} request_options.secret
 *
 * @param {Object} [request_headers]
 * @param {boolean} [debug]
 *
 * @throws {Error}
 * @returns {Promise.<{ body: string, response: IncomingMessage }>}
 */
function createBucket( request_options, request_headers, debug ) {
  var options;
  var headers;

  options = request_options || {};
  headers = request_headers || null;

  options.timeout = request_options.timeout || 30000;

  // note: if provided, these user request_options will be overwritten
  options.method = 'put';

  return request( getRequestOptions( options, headers ), debug );
}

module.exports = createBucket;
