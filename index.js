const listen = require('merry/listen')
const notFound = require('merry/404')
const error = require('merry/error')
const bankai = require('bankai')
const merry = require('merry')
const path = require('path')

const entry = path.join(__dirname, 'client.js')

const assets = bankai(entry)
const app = merry()

app.router([
  ['/404', notFound()],
  ['/', function (req, res, params, done) {
    done(null, assets.html(req, res))
  }],
  ['/bundle.js', (req, res, params, done) => {
    done(null, assets.js(req, res))
  }],
  ['/bundle.css', (req, res, params, done) => {
    done(null, assets.css(req, res))
  }],
  ['/oops', (req, res, params, done) => {
    done(error(500, 'oops'))
  }],
  ['/ooops', (req, res, params, done) => {
    throw new Error('oops')
  }]
])

listen(8080, app.start())
