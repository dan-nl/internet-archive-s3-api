'use strict';

var api = {};

api.createBucket = require( './create-bucket' );
api.getBucket = require( './get-bucket' );
api.getBucketList = require( './get-bucket-list' );
api.getMetadataHeaders = require( './helpers/get-metadata-headers' );
api.getRequestOptions = require( './helpers/get-request-options' );
api.getUserInfo = require( './get-user-info' );
api.uploadFileFromUrl = require( './upload-file-from-url' );

module.exports = api;
