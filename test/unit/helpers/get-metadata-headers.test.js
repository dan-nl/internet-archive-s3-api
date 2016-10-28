'use strict';

/**
 * module dependencies
 */
var getMetadataHeaders = require( '../../../src/helpers/get-metadata-headers' );
var test = require( 'tap' ).test;

test( 'getMetadataHeaders( metadata )', function ( t ) {
  var metadata = {
    collection: 'test_collection',
    description: 'test description'
  };

  var expected = {
    'x-archive-meta-collection': 'test_collection',
    'x-archive-meta-description': 'test description'
  };

  t.same(
    getMetadataHeaders( metadata ),
    expected,
    'returned object should be the same as the expected object'
  );

  t.end();
} );

test( 'getMetadataHeaders( metadata ) using _ in key', function ( t ) {
  var metadata = {
    collection: 'test_collection',
    description: 'test description',
    test_date: 'Thursday, 1 January 1970'
  };

  var expected = {
    'x-archive-meta-collection': 'test_collection',
    'x-archive-meta-description': 'test description',
    'x-archive-meta-test--date': 'Thursday, 1 January 1970'
  };

  t.same(
    getMetadataHeaders( metadata ),
    expected,
    'returned object should be the same as the expected object'
  );

  t.end();
} );
