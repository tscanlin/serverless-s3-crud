'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  endpoint: 'http://localhost:4568',
  s3ForcePathStyle: true,
  sslEnabled: false,
});
const uuid = require('uuid');

module.exports = (event, callback) => {
  S3.upload({
    Bucket: 'formResponse',
    Key: uuid.v4(),
    Body: event.body
  }, (err, res) => {
    console.log(err, res);
    callback(err, res);
  })

  // const data = JSON.parse(event.body);
  //
  // data.id = uuid.v1();
  // data.updatedAt = new Date().getTime();
  //
  // const params = {
  //   TableName: 'todos',
  //   Item: data
  // };
  //
  // return dynamoDb.put(params, (error, data) => {
  //   if (error) {
  //     callback(error);
  //   }
  //   callback(error, params.Item);
  // });
};
