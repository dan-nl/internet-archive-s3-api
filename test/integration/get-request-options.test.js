/* eslint max-len: off */

'use strict';

/**
 * module dependencies
 */
var getRequestOptions = require( '../../src/helpers/get-request-options' );
var getMetadataHeaders = require( '../../src/helpers/get-metadata-headers' );
var test = require( 'tap' ).test;

test( 'getRequestOptions()', function ( t ) {
  t.throws(
    function () {
      getRequestOptions();
    },
    new TypeError( 'Cannot read property \'trim\' of undefined' ),
    'should throw a TypeError when required request_options: access, identifier, or secret are missing'
  );

  t.end();
} );

test( 'getRequestOptions( user_options ) get with basic user_options', function ( t ) {
  var request_options = {
    access: '<ia-s3-access-key>',
    identifier: 'my-identifier',
    secret: '<ia-s3-secret-key>'
  };

  var expected = {
    access: '<ia-s3-access-key>',
    headers: {
      authorization: 'LOW <ia-s3-access-key>:<ia-s3-secret-key>',
      date: new Date().toUTCString(),
      'user-agent': 'node.js/%node request (https://www.npmjs.com/package/request)'
        .replace( '%node', process.version )
    },
    identifier: 'my-identifier',
    method: 'get',
    qs: {},
    secret: '<ia-s3-secret-key>',
    timeout: 10000,
    url: 'https://my-identifier.s3.us.archive.org'
  };

  t.same(
    getRequestOptions( request_options ),
    expected,
    'should return the expected object when passed in the given request_options'
  );

  t.end();
} );

test( 'getRequestOptions( user_options ) put with metadata headers', function ( t ) {
  var metadata = {
    'collection': 'test_collection',
    'contributor': 'Added to Historypin by <a href="http://www.historypin.org/channels/view/48708" title="Jewish Memory">Jewish Memory</a>',
    'coverage': '298 14th Avenue, San Francisco, CA 94118, USA (37.782557, -122.473002)',
    'creator': 'photosam88',
    'credits': 'This item was contributed to the <a href="https://www.historypin.org" title="Historypin">Historypin</a> community',
    'date': '2012-10-30T00:00:00.000Z',
    'description': 'Congregation Beth Sholom is a Conservative Jewish synagogue located in the Richmond District. The congregation was founded in 1904.',
    'hp-dateSubmitted': 'Wed 14 Aug 2013',
    'hp-geo-tags': '298 14th Avenue, San Francisco, CA 94118, USA',
    'hp-lat': '37.782557',
    'hp-lng': '-122.473002',
    'hp-media-url': 'https://www.historypin.org//services/thumb/phid/169455/dim/5000x5000/quality/90/',
    'hp-range': '100m',
    'identifier': 'test-hp-pin-169455',
    'language': 'eng',
    'licenseurl': 'http://creativecommons.org/licenses/by/3.0/',
    'mediatype': 'image',
    'notes': '',
    'publisher': 'Historypin',
    'rights': '',
    'subject': 'san francisco, synagogue, jewish, sourdough and rye',
    'title': 'Congregation Beth Sholom'
  };

  var request_options = {
    access: '<ia-s3-access-key>',
    headers: getMetadataHeaders( metadata ),
    identifier: 'my-identifier',
    method: 'put',
    secret: '<ia-s3-secret-key>'
  };

  var expected = {
    access: '<ia-s3-access-key>',
    headers: {
      authorization: 'LOW <ia-s3-access-key>:<ia-s3-secret-key>',
      date: new Date().toUTCString(),
      'user-agent': 'node.js/%node request (https://www.npmjs.com/package/request)'
        .replace( '%node', process.version ),
      'x-archive-meta-collection': 'test_collection',
      'x-archive-meta-contributor': 'Added to Historypin by <a href="http://www.historypin.org/channels/view/48708" title="Jewish Memory">Jewish Memory</a>',
      'x-archive-meta-coverage': '298 14th Avenue, San Francisco, CA 94118, USA (37.782557, -122.473002)',
      'x-archive-meta-creator': 'photosam88',
      'x-archive-meta-credits': 'This item was contributed to the <a href="https://www.historypin.org" title="Historypin">Historypin</a> community',
      'x-archive-meta-date': '2012-10-30T00:00:00.000Z',
      'x-archive-meta-description': 'Congregation Beth Sholom is a Conservative Jewish synagogue located in the Richmond District. The congregation was founded in 1904.',
      'x-archive-meta-hp-dateSubmitted': 'Wed 14 Aug 2013',
      'x-archive-meta-hp-geo-tags': '298 14th Avenue, San Francisco, CA 94118, USA',
      'x-archive-meta-hp-lat': '37.782557',
      'x-archive-meta-hp-lng': '-122.473002',
      'x-archive-meta-hp-media-url': 'https://www.historypin.org//services/thumb/phid/169455/dim/5000x5000/quality/90/',
      'x-archive-meta-hp-range': '100m',
      'x-archive-meta-identifier': 'test-hp-pin-169455',
      'x-archive-meta-language': 'eng',
      'x-archive-meta-licenseurl': 'http://creativecommons.org/licenses/by/3.0/',
      'x-archive-meta-mediatype': 'image',
      'x-archive-meta-notes': '',
      'x-archive-meta-publisher': 'Historypin',
      'x-archive-meta-rights': '',
      'x-archive-meta-subject': 'san francisco, synagogue, jewish, sourdough and rye',
      'x-archive-meta-title': 'Congregation Beth Sholom'
    },
    identifier: 'my-identifier',
    method: 'put',
    qs: {},
    secret: '<ia-s3-secret-key>',
    timeout: 10000,
    url: 'https://my-identifier.s3.us.archive.org'
  };

  t.same(
    getRequestOptions( request_options ),
    expected,
    'should return the expected object when passed in the given request_options'
  );

  t.end();
} );
