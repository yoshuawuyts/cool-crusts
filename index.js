const listen = require('merry/listen')
const notFound = require('merry/404')
const normcore = require('normcore')
const error = require('merry/error')
const bankai = require('bankai')
const merry = require('merry')
const path = require('path')

const feed = normcore('cool-crusts')
const entry = path.join(__dirname, 'client.js')
console.info(JSON.stringify({ logKey: feed.key.toString('hex') }))

const assets = bankai(entry)
const app = merry({ logStream: feed.createWriteStream() })

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
