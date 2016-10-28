'use strict';

/**
 * module requirements
 */
var request = require( 'request-as-bluebird' );
var getRequestOptions = require( './helpers/get-request-options' );

/**
 * given an ia s3 access and secret key, returns details about an archive.org user
 *
 * optional request headers can be sent, but are not necessary and may lead to unexpected results.
 * debug is optional; when set it will output request debug info.
 *
 * @param {Object} request_options
 * @param {string} request_options.access
 * @param {string} request_options.secret
 *
 * @param {Object} [request_headers]
 * @param {boolean} [debug]
 *
 * @throws {Error}
 * @returns {Promise.<{ body: string, response: IncomingMessage }>}
 */
function getUserInfo( request_options, request_headers, debug ) {
  var options;
  var headers;

  options = request_options || {};
  headers = request_headers || null;

  // note: if provided, these user request_options will be overwritten
  options.method = 'get';
  options.qs = {};
  options.qs.check_auth = 1;
  options.url = 'https://s3.us.archive.org';

  return request( getRequestOptions( options, headers ), debug );
}

module.exports = getUserInfo;
