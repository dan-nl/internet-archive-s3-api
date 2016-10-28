'use strict';

/**
 * @param {string} string
 * @param {number} [min]
 * @param {number} [max]
 * @returns {boolean}
 */
function validateStringLength( string, min, max ) {
  if ( typeof string !== 'string' ) {
    return false;
  }

  if ( min ) {
    if ( string.length < min ) {
      return false;
    }
  }

  if ( max ) {
    if ( string.length > max ) {
      return false;
    }
  }

  return true;
}

module.exports = validateStringLength;
