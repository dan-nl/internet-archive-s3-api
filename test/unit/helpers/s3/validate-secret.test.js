'use strict';

/**
 * module dependencies
 */
var validateSecret = require( '../../../../src/helpers/s3/validate-secret' );
var test = require( 'tap' ).test;

test( 'validateSecret( `<ia-s3-secret-key>` )', function ( t ) {

  t.equal(
    validateSecret( '<ia-s3-secret-key>' ),
    '<ia-s3-secret-key>',
    'should return a string that equals the expected string'
  );

  t.end();
} );

test( 'validateSecret( `` )', function ( t ) {
  var message = [
    'validateSecret( `` ) string length [ 0 ] is less than ',
    'the min string length [ 1 ] required'
    ].join( '' );

  t.throws(
    function() { validateSecret( '' ); },
    new Error( message ),
    'should throw an error with the expected message'
  );

  t.end();
} );

test( 'validateSecret( {} )', function ( t ) {
  var message = 'validateSecret( `[object Object]` ): user_secret not provided as a string';

  t.throws(
    function() { validateSecret( {} ); },
    new Error( message ),
    'should throw an error with the expected message'
  );

  t.end();
} );
