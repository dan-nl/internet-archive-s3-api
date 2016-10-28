'use strict';

/**
 * module dependencies
 */
var validateIdentifier = require( '../../../../src/helpers/ia/validate-identifier' );
var test = require( 'tap' ).test;

test( 'validateIdentifier( `identifier` )', function ( t ) {

  t.equal(
    validateIdentifier( 'identifier' ),
    'identifier',
    'should return a string that equals the expected string'
  );

  t.end();
} );


test( 'validateIdentifier( `` )', function ( t ) {
  var message = [
    'validateIdentifier( `` ) string length [ 0 ] is less than ',
    'the min string length [ 1 ] required'
  ].join( '' );

  t.throws(
    function() { validateIdentifier( '' ); },
    new Error( message ),
    'should throw an error with the expected message'
  );

  t.end();
} );

test( 'validateIdentifier( {} )', function ( t ) {
  var message = 'validateIdentifier( `[object Object]` ): identifier not provided as a string';

  t.throws(
    function() { validateIdentifier( {} ); },
    new Error( message ),
    'should throw an error with the expected message'
  );

  t.end();
} );