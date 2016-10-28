'use strict';

/**
 * module dependencies
 */
var getQueryString = require( '../../../src/helpers/get-query-string' );
var test = require( 'tap' ).test;

test( 'getQueryString()', function ( t ) {
  t.same(
    getQueryString(),
    {},
    'returned object should be the same as the expected object'
  );

  t.end();
} );

test( 'getQueryString( { check_auth: 1 } )', function ( t ) {
  var user_query_string = {
    check_auth: 1
  };

  t.same(
    getQueryString( user_query_string ),
    user_query_string,
    'returned object should be the same as the expected object'
  );

  t.end();
} );

test( 'getQueryString( { check_auth: NaN } )', function ( t ) {
  var user_query_string = {
    check_auth: NaN
  };

  t.same(
    getQueryString( user_query_string ),
    {},
    'returned object should be the same as the expected object'
  );

  t.end();
} );
