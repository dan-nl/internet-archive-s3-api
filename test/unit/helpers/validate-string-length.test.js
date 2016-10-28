/* eslint no-undefined: off */

'use strict';

/**
 * module dependencies
 */
var validateStringLength = require( '../../../src/helpers/validate-string-length' );
var test = require( 'tap' ).test;

test( 'validateStringLength( `min string`, 11 )', function ( t ) {
  t.equal(
    validateStringLength( 'success', 1, 7 ),
    true,
    'should return true when string passes the test'
  );

  t.end();
} );

test( 'validateStringLength( `min string`, 11 )', function ( t ) {
  var string = 'min string';

  t.equal(
    validateStringLength( string, 11 ),
    false,
    'should return false when a string is passed in that does not meet the min requirement'
  );

  t.end();
} );

test( 'validateStringLength( `max string`, 1, 5 )', function ( t ) {
  var string = 'max string';

  t.equal(
    validateStringLength( string, 1, 5 ),
    false,
    'should return false when a string is passed in that is greater than the max allowed'
  );

  t.end();
} );

test( 'validateStringLength( `max string`, null, 5 )', function ( t ) {
  var string = 'max string';

  t.equal(
    validateStringLength( string, null, 5 ),
    false,
    'should allow `null` to be passed in as the min value'
  );

  t.end();
} );

test( 'validateStringLength( undefined, 5 )', function ( t ) {
  t.equals(
    validateStringLength( undefined, 1 ),
    false,
    'should return false if `undefined` or other non-string value is passed in as the string'
  );

  t.end();
} );
