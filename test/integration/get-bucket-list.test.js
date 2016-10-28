/* eslint global-require:off */

'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/development' );
var getBucketList = require( '../../src/get-bucket-list' );
var parser = require( 'xml2json' );
var test = require( 'tap' ).test;

test( 'getBucketList( request_options )', function ( t ) {
  var request_options = {
    access: config.s3.access,
    identifier: 'test-api',
    secret: config.s3.secret
  };

  var expected = require( './fixtures/get-bucket-list-result.json' );

  return getBucketList( request_options )
    .then(
      /**
       * @param {{ body: string, response: IncomingMessage }} result
       * @returns {undefined}
       */
      function ( result ) {
        var json_string = parser.toJson( result.body );

        t.same(
          JSON.parse( json_string ),
          expected,
          'returned object should be the same as the expected object'
        );

        t.end();
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @returns {undefined}
       */
      function ( err ) {
        console.log( err );
        t.end();
      }
    );
} );
