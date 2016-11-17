'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName: 'todos',
  };

  const s3params = {
    Bucket: 'todos',
    Key: 'test1',
    Body: JSON.stringify(params)
  }

  S3.createBucket(s3params, () => {
    
  })

  return S3.upload(s3params, (err, data) => {
    console.log(err, data);
  })

  // return dynamoDb.scan(params, (error, data) => {
  //   if (error) {
  //     callback(error);
  //   }
  //   callback(error, data.Items);
  // });
};
