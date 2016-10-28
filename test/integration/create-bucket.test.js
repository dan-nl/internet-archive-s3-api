/* eslint global-require:off */

'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/development' );
var parser = require( 'xml2json' );
var createBucket = require( '../../src/create-bucket' );
var test = require( 'tap' ).test;

test( 'createBucket( request_options )', function ( t ) {
  var request_options = {
    access: config.s3.access,
    identifier: 'test-api',
    secret: config.s3.secret
  };

  var expected = require( './fixtures/create-bucket-result.json' );

  return createBucket( request_options )
    .then(
      /**
       * @param {{ body: string, response: IncomingMessage }} result
       * @returns {undefined}
       */
      function ( result ) {
        var json_string = parser.toJson( result.body );
        var json = JSON.parse( json_string );

        t.equal(
          json.Error.Code,
          expected.Error.Code,
          'should return an Error.Code that matches the expected.Error.Code'
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
