yaml = require('js-yaml')
fs   = require('fs')

// Get document, or throw exception on error
var doc
try {
  doc = yaml.safeLoad(fs.readFileSync('./serverless.yml', 'utf8'))
} catch (e) {}

module.exports = doc
