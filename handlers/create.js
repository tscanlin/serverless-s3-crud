'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  endpoint: 'http://localhost:4568',
  s3ForcePathStyle: true,
  sslEnabled: false,
});
const uuid = require('uuid');
const config = require('../serverlessConfig.js');

module.exports = (event, callback) => {
  S3.upload({
    Bucket: config.custom.folderName,
    Key: config.custom.jsonKey === 'uuid'
      ? uuid.v4()
      : new Date().getTime().toString(),
    Body: event.body
  }, (err, res) => {
    console.log(err, res);
    callback(err, res);
  })
};
