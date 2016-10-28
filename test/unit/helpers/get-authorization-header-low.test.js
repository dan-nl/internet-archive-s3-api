'use strict';

/**
 * module dependencies
 */
var getAuthorizationHeaderLow = require( '../../../src/helpers/get-authorization-header-low' );
var test = require( 'tap' ).test;

test( 'getAuthorizationHeaderLow( access, secret )', function ( t ) {
  var access = '<ia-s3-access>';
  var secret = '<ia-s3-secret>';

  var expected = 'LOW <ia-s3-access>:<ia-s3-secret>';

  t.same(
    getAuthorizationHeaderLow( access, secret ),
    expected,
    'returned object should be the same at the expected object'
  );

  t.end();
} );
