/* eslint no-param-reassign: off */

'use strict';

/**
 * returns metadata prefixed with x-archive-meta- and converts __ to --
 *
 * @param {Object} metadata
 * @param {Object} headers
 * @returns {{}}
 */
function getMetadataHeaders( metadata, headers ) {
  headers = headers || {};

  Object.keys( metadata ).reduce(
    /**
     * @param {string} acc
     * @param {string} key
     * @returns {string}
     */
    function ( acc, key ) {
      var header_key = 'x-archive-meta-%key'
        .replace( '%key', key )
        .replace( '_', '--' );

      headers[ header_key ] = metadata[ key ];

      return acc;
    },
    ''
  );

  return headers;
}

module.exports = getMetadataHeaders;
