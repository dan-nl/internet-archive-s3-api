'use strict';

/**
 * module dependencies
 */
var getIdentifierUrl = require( '../../../src/helpers/get-identifier-url' );
var test = require( 'tap' ).test;

test( 'getIdentifierUrl( `test-api` )', function ( t ) {
  var expected = 'https://test-api.s3.us.archive.org';

  t.equal(
    getIdentifierUrl( 'test-api' ),
    expected,
    'returned string should equal the expected string'
  );

  t.end();
} );
