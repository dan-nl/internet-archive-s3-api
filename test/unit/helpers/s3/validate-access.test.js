'use strict';

/**
 * module dependencies
 */
var validateAccess = require( '../../../../src/helpers/s3/validate-access' );
var test = require( 'tap' ).test;

test( 'validateAccess( `<ia-s3-access-key>` )', function ( t ) {

  t.equal(
    validateAccess( '<ia-s3-access-key>' ),
    '<ia-s3-access-key>',
    'should return a string that equals the expected string'
  );

  t.end();
} );

test( 'validateAccess( `` )', function ( t ) {
  var message = [
    'validateAccess( `` ) string length [ 0 ] is less than ',
    'the min string length [ 1 ] required'
    ].join( '' );

  t.throws(
    function() { validateAccess( '' ); },
    new Error( message ),
    'should throw an error with the expected message'
  );

  t.end();
} );

test( 'validateAccess( {} )', function ( t ) {
  var message = 'validateAccess( `[object Object]` ): user_access not provided as a string';

  t.throws(
    function() { validateAccess( {} ); },
    new Error( message ),
    'should throw an error with the expected message'
  );

  t.end();
} );
