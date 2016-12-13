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

lab.beforeEach(function(done) {
  fetch(apiEndpoint + prefix + TEST_KEY, {
    method: 'DELETE'
  }).then(function(d) {
    done()
  })
})

lab.describe('GET request', function() {
  lab.test('returns null if an object does not exist', (done) => {
    fetch(apiEndpoint + prefix + TEST_KEY, {
        method: 'GET'
      }).then(function(res) {
        return res.json()
      }).then(function(data) {
        expect(data).to.be.null()
        done()
      })
  })

  lab.test('returns an object if it exists', (done) => {
    fetch(apiEndpoint + prefix + TEST_KEY, {
        method: 'POST',
        body: JSON.stringify(TEST_DATA)
      }).then(function() {
        return fetch(apiEndpoint + prefix + TEST_KEY, {
          method: 'GET'
        })
      }).then(function(res) {
        return res.json()
      }).then(function(data) {
        expect(data.ETag).to.be.a.string()
        expect(data.LastModified).to.be.a.string()
        expect(data.ContentLength).to.be.a.string()
        expect(data.ContentType).to.be.a.string()

        const body = new Buffer(data.Body, 'binary').toString()
        expect(body).to.be.a.string()

        const obj = JSON.parse(body)
        expect(obj).to.equal(TEST_DATA)
        done()
      })
      // .catch(function(e) {
      //   console.log(e)
      // })
  })
})

lab.describe('POST request', function() {
  lab.test('updates or creates an object', (done) => {
    fetch(apiEndpoint + prefix + TEST_KEY, {
        method: 'POST',
        body: JSON.stringify(TEST_DATA)
      }).then(function(res) {
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

  lab.test('cannot create an object when no Body is specified', (done) => {
    fetch(apiEndpoint + prefix, {
        method: 'POST'
      }).then(function(res) {
        return res.json()
      }).then(function(data) {
        expect(data.errorMessage).to.contain('Uncaught error')
        done()
      })
  })
})

lab.describe('PUT request', function() {
  lab.test('updates or creates an object', (done) => {
    const postfix = '-new'
    fetch(apiEndpoint + prefix + TEST_KEY + postfix, {
        method: 'PUT',
        body: JSON.stringify(TEST_DATA)
      }).then(function(res) {
        return res.json()
      }).then(function(data) {
        expect(data.ETag).to.be.a.string()
        expect(data.Location).to.contain(bucket + '/' + prefix + TEST_KEY + postfix)
        expect(data.key).to.equal(prefix + TEST_KEY + postfix)
        expect(data.Key).to.equal(prefix + TEST_KEY + postfix)
        expect(data.Bucket).to.equal(bucket)
        done()
      })
  })

  lab.test('cannot update an object when no Body is specified', (done) => {
    fetch(apiEndpoint + prefix, {
        method: 'PUT'
      }).then(function(res) {
        return res.json()
      }).then(function(data) {
        expect(data.errorMessage).to.contain('Uncaught error')
        done()
      })
  })
})

lab.describe('DELETE request', function() {
  lab.test('deletes an object', (done) => {
    fetch(apiEndpoint + prefix + TEST_KEY, {
        method: 'POST',
        body: JSON.stringify(TEST_DATA)
      }).then(function(res) {
        return res.json()
      }).then(function(data) {
        expect(data.ETag).to.be.a.string()
        expect(data.Location).to.contain(bucket + '/' + prefix + TEST_KEY)
        expect(data.key).to.equal(prefix + TEST_KEY)
        expect(data.Key).to.equal(prefix + TEST_KEY)
        expect(data.Bucket).to.equal(bucket)
        return fetch(apiEndpoint + prefix + TEST_KEY, {
          method: 'DELETE',
          body: JSON.stringify(TEST_DATA)
        })
      }).then(function(res) {
        return fetch(apiEndpoint + prefix + TEST_KEY, {
          method: 'GET'
        })
      }).then(function(res) {
        return res.json()
      }).then(function(data) {
        expect(data).to.be.null()
        done()
      })
  })

  lab.test('returns a 200 even if the object does not exist', (done) => {
      fetch(apiEndpoint + prefix + 'foo/bar', {
          method: 'DELETE'
        }).then(function(res) {
          expect(res.status).to.equal(200)
          done()
          return res.json()
        })
  })
})
