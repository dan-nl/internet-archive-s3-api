'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/development' );
var getUserInfo = require( '../../src/get-user-info' );
var test = require( 'tap' ).test;

test( 'getUserInfo( { access: string, secret: string } )', function ( t ) {
  var request_options = {
    access: config.s3.access,
    secret: config.s3.secret
  };

  var expected_keys = [ 'username', 'accesskey', 'itemname', 'authorized', 'screenname' ];

  return getUserInfo( request_options, null )
    .then(
      /**
       * @param {{ body: string, response: IncomingMessage }} result
       * @returns {undefined}
       */
      function ( result ) {
        var json = JSON.parse( result.body );
        var keys = Object.keys( json );

        t.same(
          keys,
          expected_keys,
          'returned keys array should be the same at the expected array'
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
