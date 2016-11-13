// Require & init project
var express = require('express')
var app = express()

app.use(express.static('public'))
app.set('views', './app/view')
app.set('view engine', 'pug')

// body parse
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// auth
var auth = require('./app/middleware/auth')
app.use(auth.logged)

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

// Listen requests
app.listen(config.port, function () {
  console.log('App listen on port ' + config.port)
})
