'use strict'

const AWS = require('aws-sdk')
const S3 = new AWS.S3(require('../s3config.js')())
const serverlessConfig = require('../serverlessConfig.js')

module.exports = (event, callback) => {
  S3.listObjectsV2({
    Bucket: serverlessConfig.custom.folderName,
  }, (err, res) => {
    console.log(err, res)
    callback(err, res)
  })
}
