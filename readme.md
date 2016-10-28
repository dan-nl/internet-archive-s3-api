# internet-archive-s3-api
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][david-dm-image]][david-dm-url] [![Dev Dependency Status][david-dm-dev-image]][david-dm-dev-url] [![NSP Status][nsp-image]][nsp-url]

internet archive s3 api helper methods

___work in progress in alpha state___

## table of contents
* [installation](#installation)
* [use](#use)
    * [createBucket( request_options, request_headers )](#createbucket-request_options,-request_headers-)
        * [basic use](#basic-use)
        * [response](#response)
            * [success](#sucess)
            * [failure](#failure)
    * [getBucket( request_options, request_headers )](#getbucket-request_options-request_headers-)
        * [basic use](#basic-use)
        * [response](#response)
            * [success](#sucess)
            * [failure](#failure)
    * [getUserInfo( request_options, request_headers )](#getuserinfo-request_options-request_headers-)
        * [basic use](#basic-use)
        * [response](#response)
            * [success](#sucess)
            * [failure](#failure)
* [license](#license)

## installation
```javascript
npm install internet-archive-s3-api
```

## use
### createBucket( request_options, request_headers, debug )
```javascript
@param {Object} request_options
@param {string} request_options.access
@param {Object} [request_options.headers]
@param {string} request_options.identifier
@param {string} request_options.secret
@param {Object} [request_headers]
@param {boolean} [debug]
@returns {Promise.<{body: string, response: IncomingMessage}>}
```

creates a new archive.org bucket.

* ia sa access key is required
* ia sa secret is required
* optional metadata can be sent via `request_options.headers`, which should be prefixed with `x-archive-meta-` for each metadata item: see getMetadataHeaders.
* optional request headers can be sent, but are not necessary and may lead to unexpected results.
* optional debug can be set to output request debug info.

#### basic use
```javascript
var parser = require( 'xml2json' );
var s3 = require( 'internet-archive-s3-api' );

var metadata = {
  collection: 'test_collection',
  identifier: '<identifier>',
  language: 'eng',
  mediatype: 'image',
};

var request_options = {
  access: '<your-ia-s3-access-key>',
  headers: s3.getMetadataHeaders( metadata ),
  identifier: '<identifier>',
  secret: '<your-ia-s3-secret-key>'
}

s3.createBucket( request_options )
  .then(
    /**
     * @param {body: string, response: IncomingMessage} result
     */
    function( result ) {
      var json_string = parser.toJson( result.body );
      var json = JSON.parse( json_string );
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle err
    }
  )
```

#### success
```javascript
response: {
   statusCode: 200,
   body: ''
}
```

#### failure
```javascript
response: {
   statusCode: 409,
   body: '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n<Error><Code>BucketAlreadyExists</Code><Message>The requested bucket name is not available. The bucket namespace is shared by all users of the system. Please select a different name and try again.</Message><Resource /><RequestId>f6b31bd8-3cd3-4aa4-8d1a-b501fb7d8143</RequestId></Error>'
}
```

a string that can be parsed into an xml document or json with, for example, [xml2json][xml2json-url]


### getBucket( request_options, request_headers, debug )
```javascript
@param {Object} request_options
@param {string} request_options.access
@param {string} request_options.identifier
@param {string} request_options.secret
@param {Object} [request_headers]
@param {boolean} [debug]
@returns {Promise.<{body: string, response: IncomingMessage}>}
```

returns details about an archive.org user’s bucket.

* ia sa access key is required
* ia sa secret is required
* ia identifier is required
* optional request headers can be sent, but are not necessary and may lead to unexpected results.
* optional debug can be set to output request debug info.

#### basic use
```javascript
var getBucket = require( 'internet-archive-s3-api' ).getBucket;
var parser = require( 'xml2json' );

var request_options = {
  access: '<your-ia-s3-access-key>',
  secret: '<your-ia-s3-secret-key>'
}

getBucket( request_options )
  .then(
    /**
     * @param {body: string, response: IncomingMessage} result
     */
    function( result ) {
      var json_string = parser.toJson( result.body );
      var json = JSON.parse( json_string );
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle err
    }
  )
```

#### success
```javascript
response: {
  statusCode: 200,
  body: '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n<ListBucketResult><Name>test-empty-bucket</Name><Contents><Key>test-empty-bucket_archive.torrent</Key><LastModified>2016-12-17T12:19:01.000Z</LastModified><ETag>2016-12-17T12:19:01.000Z</ETag><Size>1523</Size><StorageClass>STANDARD</StorageClass><Owner><ID>OpaqueIDStringGoesHere</ID><DisplayName>Readable ID Goes Here</DisplayName></Owner></Contents><Contents><Key>test-empty-bucket_files.xml</Key><LastModified>2016-12-17T12:19:01.000Z</LastModified><ETag>2016-12-17T12:19:01.000Z</ETag><Size>1144</Size><StorageClass>STANDARD</StorageClass><Owner><ID>OpaqueIDStringGoesHere</ID><DisplayName>Readable ID Goes Here</DisplayName></Owner></Contents><Contents><Key>test-empty-bucket_meta.sqlite</Key><LastModified>2016-12-17T12:18:56.000Z</LastModified><ETag>2016-12-17T12:18:56.000Z</ETag><Size>3072</Size><StorageClass>STANDARD</StorageClass><Owner><ID>OpaqueIDStringGoesHere</ID><DisplayName>Readable ID Goes Here</DisplayName></Owner></Contents><Contents><Key>test-empty-bucket_meta.xml</Key><LastModified>2016-12-17T12:19:01.000Z</LastModified><ETag>2016-12-17T12:19:01.000Z</ETag><Size>475</Size><StorageClass>STANDARD</StorageClass><Owner><ID>OpaqueIDStringGoesHere</ID><DisplayName>Readable ID Goes Here</DisplayName></Owner></Contents></ListBucketResult>'
}
```

a string that can be parsed into an xml document or json with, for example, [xml2json][xml2json-url]

#### failure
```javascript
response: {
  stausCode: 404,
  body: '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n<Error><Code>NoSuchBucket</Code><Message>The specified bucket does not exist.</Message><Resource>test-api-10 not found by Metadata::get_obj()[server]</Resource><RequestId>c7773fe0-2693-4f83-acd5-ead886b45f2f</RequestId></Error>' } }
}
````

a string that can be parsed into an xml document or json with, for example, [xml2json][xml2json-url]


### getMetadataHeaders( metadata, headers )
```javascript
@param {Object} metadata
@param {Object} headers
@returns {{}}
```

returns metadata prefixed with `x-archive-meta-` and converts `_` to `--`

#### basic use
```javascript
var s3 = require( 'internet-archive-s3-api' ).getMetadataHeaders;

var metadata = {
  collection: 'test_collection',
  language: 'eng',
  mediatype: 'image',
  your_custom: 'custom value',
  'hp-geo-tags': '298 14th Avenue, San Francisco, CA 94118, USA'
};

var headers = getMetadataHeaders( metadata );
```

#### response
```javascript
{
  'x-archive-meta-collection': 'test_collection',
  'x-archive-meta-language': 'eng',
  'x-archive-meta-mediatype': 'image',
  'x-archive-meta-your--custom': 'custom value',
  'x-archive-meta-hp-geo-tags': '298 14th Avenue, San Francisco, CA 94118, USA'
}
```


### getUserInfo( request_options, request_headers, debug )
```javascript
@param {Object} request_options
@param {string} request_options.access
@param {string} request_options.secret
@param {Object} [request_headers]
@param {boolean} [debug]
@returns {Promise.<{body: string, response: IncomingMessage}>}
```

returns details about an archive.org user.

* ia sa access key is required
* ia sa secret is required
* optional request headers can be sent, but are not necessary and may lead to unexpected results.
* optional debug can be set to output request debug info.

#### basic use
```javascript
var getUserInfo = require( 'internet-archive-s3-api' ).getUserInfo;

var request_options = {
  access: '<your-ia-s3-access-key>',
  secret: '<your-ia-s3-secret-key>'
}

getUserInfo( request_options )
  .then(
    /**
     * @param {body: string, response: IncomingMessage} result
     */
    function( result ) {
      var json = JSON.parse( result.body );
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle err
    }
  )
```

##### success
```javascript
response: {
  statusCode: 200,
  body: '{"username": string, "accesskey": string, "itemname": string, "authorized": boolean, "screenname": string}'
}
```

a string that can be parsed into a json

##### failure
```javascript
response: {
  statusCode: 200,
  body: '{"accesskey": "none", "authorized": false, "error": "The AWS Access Key Id you provided does not exist in our records."}'
}
```

a string that can be parsed into a json


## license
[MIT License][mit-license]

[coveralls-image]: https://coveralls.io/repos/github/dan-nl/internet-archive-s3-api/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/dan-nl/internet-archive-s3-api?branch=master
[david-dm-image]: https://david-dm.org/dan-nl/internet-archive-s3-api.svg
[david-dm-url]: https://david-dm.org/dan-nl/internet-archive-s3-api
[david-dm-dev-image]: https://david-dm.org/dan-nl/internet-archive-s3-api/dev-status.svg
[david-dm-dev-url]: https://david-dm.org/dan-nl/internet-archive-s3-api?type=dev
[mit-license]: https://raw.githubusercontent.com/dan-nl/internet-archive-s3-api/master/license.txt
[npm-image]: https://img.shields.io/npm/v/internet-archive-s3-api.svg
[npm-url]: https://www.npmjs.com/package/internet-archive-s3-api
[nsp-image]: https://nodesecurity.io/orgs/{organization}/projects/{nsp-project-id}/badge
[nsp-url]: https://nodesecurity.io/orgs/{organization}/projects/{nsp-project-id}
[travis-image]: https://travis-ci.org/dan-nl/internet-archive-s3-api.svg?branch=master
[travis-url]: https://travis-ci.org/dan-nl/internet-archive-s3-api
[xml2json-url]: https://www.npmjs.com/package/xml2json
