// =======================
// INIT EXPRESS APP ======
// =======================
var express = require('express')
var app = express()

app.use(express.static('public'))

var bodyParser = require('body-parser')
app.use(bodyParser.json())

// handle accept
app.use(function (req, res, next) {
  if (!req.accepts('json')) {
    res.status(400)
    res.json({status: false, error: 'API only accept JSON.'})
    return
  }
  next()
})
var auth = require('../app/auth')
var config = require('../app/config/global')

// index
app.get('/', function (req, res) {
  return res.json({
    name: 'obsiapi',
    version: require('fs').readFileSync('../VERSION').toString().trim(),
    author: 'Eywek',
    environement: (process.env.NODE_ENV === 'production') ? 'production' : 'development'
  })
})

// configured
var routes = require('../app/config/routes')
for (var route in routes) {
  // get method
  if (route.split(' ').length > 1) {
    var method = route.split(' ')[0]
    var url = route.split(' ')[1]
  } else {
    var method = 'get'
    var url = route
  }
  // get controller & method
  if (typeof routes[route] === 'string') { // not protected
    var controller = routes[route].split('.')[0]
    var action = routes[route].split('.')[1]
  } else { // protected
    var controller = routes[route].function.split('.')[0]
    var action = routes[route].function.split('.')[1]

    if (routes[route].protected) {
      // init protected route
      app[method](url, auth, require('../app/controller/' + controller)[action])
      continue
    }
  }
  // init route
  app[method](url, require('../app/controller/' + controller)[action])
}

app.use(function (req, res, next) {
  res.status(404)

  // respond with json
  res.json({status: false, error: 'Method not found.'})
})

app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).json({status: false, error: 'An error has occured.'})
})

// =======================
// DATABASE ==============
// =======================
var fs = require('fs')

// create fake db
var connection = require('mysql').createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  socketPath: '/tmp/mysql.sock',
  multipleStatements: true
})
connection.connect()
global.connection = connection

// config
global.db = require('../Tests/vendors/db').setConfig(require('./config/db'))

// models
fs.readdir('../app/models', function (err, files) {
  if (err) return false
  files.forEach(function (file) {
    global[file.split('.js')[0]] = require('../app/models/' + file)
  })
})

// =======================
// INIT TESTS ============
// =======================

var assert = require('assert')
var chai = require('chai')
var chaiHttp = require('chai-http')

chai.use(chaiHttp)

// Export
module.exports.app = app
module.exports.chai = chai
module.exports.assert = assert
module.exports.connection = connection
/* module.exports.createDB = function (next) {
  console.log('Start create...')
  console.log(fs.readFileSync('./Tests/config/create.sql').toString().length)
  global.connection.query(fs.readFileSync('./Tests/config/create.sql').toString(), function (err) {
    if (err) {
      console.log(err)
      process.exit()
    }
    console.log('created!')
    next()
  })
}
module.exports.dropDB = function (next) {
  console.log('Start drop...')
  global.connection.query(fs.readFileSync('./Tests/config/drop.sql').toString(), function (err) {
    if (err) {
      console.log(err)
      process.exit()
    }
    console.log('dropped!')
    next()
  })
}*/
