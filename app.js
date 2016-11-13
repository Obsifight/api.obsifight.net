// Require & init project
var express = require('express')
var app = express()

app.use(express.static('public'))

// body parse
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// handle accept
app.use(function (req, res, next) {
  if (!req.accepts('json')) {
    res.status(403)
    res.json({status: false, error: 'API only accept JSON.'})
    return
  }
  next()
})

// auth
// var auth = require('./app/middleware/auth')
// app.use(auth.logged)

// include config
var config = require('./app/config/global')

// Routes
var routes = require('./app/config/routes')
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
  var controller = routes[route].split('.')[0]
  var action = routes[route].split('.')[1]
  // init route
  app[method](url, require('./app/controller/' + controller)[action])
}

// models & db connection
global.db = require('./vendors/db').setConfig(require('./app/config/db'))

var fs = require('fs')
fs.readdir('./app/models', function (err, files) {
  if (err) return false
  files.forEach(function (file) {
    global[file.split('.js')[0]] = require('./app/models/' + file)
  })
})

// handle 404

app.use(function (req, res, next) {
  res.status(404)

  // respond with json
  res.json({status: false, error: 'Method not found.'})
})

// Listen requests
app.listen(config.port, function () {
  console.log('App listen on port ' + config.port)
})
