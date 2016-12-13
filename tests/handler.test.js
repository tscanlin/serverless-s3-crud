const Code = require('code')
const expect = Code.expect
const Lab = require('lab')
const fetch = require('isomorphic-fetch')
const lab = exports.lab = Lab.script()

// const handler = require('../handler')

const prefix = 'test/path/'
const apiEndpoint = 'http://localhost:3000/form-response/'
const bucket = 'form-response'
const TEST_KEY = 'test-data'
const TEST_DATA = {
  this: 'is',
  a: 'test',
  bool: true,
  num: 5
}

lab.describe('GET request', function() {
  lab.test('handler returns null if an object does not exist', (done) => {
    fetch(apiEndpoint + prefix, {
      method: 'GET'
    })
      .then(function(res) {
        return res.json()
      }).then(function(data) {
        expect(data).to.be.null()
        done()
      })
  })
})

lab.describe('POST request', function() {
  lab.test('handler cannot create an object when no Body is specified', (done) => {
      fetch(apiEndpoint + prefix, {
          method: 'POST'
        })
        .then(function(res) {
          return res.json()
        }).then(function(data) {
          expect(data.errorMessage).to.contain('Uncaught error')
          done()
        })
  })

  lab.test('handler creates an object', (done) => {
      fetch(apiEndpoint + prefix + TEST_KEY, {
          method: 'POST',
          body: JSON.stringify(TEST_DATA)
        })
        .then(function(res) {
          return res.json()
        }).then(function(data) {
          expect(data.ETag).to.be.a.string()
          expect(data.Location).to.contain(bucket + '/' + prefix + TEST_KEY)
          expect(data.key).to.equal(prefix + TEST_KEY)
          expect(data.Key).to.equal(prefix + TEST_KEY)
          expect(data.Bucket).to.equal(bucket)
          done()
        })
  })
})
