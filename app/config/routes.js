module.exports = {

  'post /authenticate': 'AuthController.generateToken',

  'get /user/:id': {function: 'UserController.get', protected: true}

}
