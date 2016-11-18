'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName: 'todos',
  };

  const s3bucket = {
    Bucket: 'todos-new',
  }
  const s3params = {
    Bucket: 'todos-new',
    Key: 'test1',
    Body: 'something else!!!'
  }
  const s3GetParams = {
    Bucket: 'todos-new',
    Key: 'test1',
  }
  console.log('test');

  // S3.createBucket(s3bucket, (err, d) => {
  //   console.log(err, d);
  //   // console.log(d.Body.toString());
  // })

  return S3.upload(s3params, (err, data) => {
    console.log(err, data);

    return S3.getObject(s3GetParams, (err, data) => {
      console.log('get it!');
      console.log(err, data);
      console.log(data.Body.toString());
    })
  })

  // return dynamoDb.scan(params, (error, data) => {
  //   if (error) {
  //     callback(error);
  //   }
  //   callback(error, data.Items);
  // });
};
