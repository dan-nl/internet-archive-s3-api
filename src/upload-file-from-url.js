'use strict';

/**
 * module requirements
 */
// var request = require( 'request-pipe-as-bluebird' );
var getRequestOptions = require( './helpers/get-request-options' );

function uploadFileFromUrl( url_source, request_options, request_headers, debug ) {
  console.log(getRequestOptions( url_source, request_options, request_headers, debug ));
  // request.get( 'http://google.com/img.png' ).pipe( request.put( 'http://mysite.com/img.png' ) )

  // return request( url_source, getRequestOptions( request_options, request_headers ), debug  );

  // request
  //   .get( url_source )
  //   .on(
  //     'response',
  //     function ( response ) {
  //       // console.log( response.statusCode );
  //       // console.log( response.headers );
  //     }
  //   )
  //   .on(
  //     'error',
  //     function ( err ) {
  //       throw error;
  //     }
  //   )
  //   .pipe(
  //     request( getRequestOptions( request_options, request_headers ) )
  //   );
}

module.exports = uploadFileFromUrl;
