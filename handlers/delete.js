'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  endpoint: 'http://localhost:4568',
  s3ForcePathStyle: true,
  sslEnabled: false,
});
const config = require('../serverlessConfig.js');

module.exports = (event, callback) => {
  S3.deleteObject({
    Bucket: config.custom.folderName,
    Key: event.pathParameters.id,
  }, (err, res) => {
    console.log(err, res);
    callback(err, res);
  })

  // const params = {
  //   TableName : 'todos',
  //   Key: {
  //     id: event.pathParameters.id
  //   }
  // };
  //
  // return dynamoDb.delete(params, (error, data) => {
  //   if (error) {
  //     callback(error);
  //   }
  //   callback(error, params.Key);
  // });
};
