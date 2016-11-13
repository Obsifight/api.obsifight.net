var jwt = require('jsonwebtoken')

module.exports = {

  generateToken: function (req, res) {
    if (req.body.username === undefined || req.body.password.length === 0 || req.body.password === undefined || req.body.password.length === 0)
      return res.status(400).json({status: false, error: 'Missing username or password.'})

    // Check credentials
    if (req.body.username !== 'Eywek' && req.body.password !== '9d25f3b6ab8cfba5d2d68dc8d062988534a63e87')
      return res.status(403).json({status: false, error: 'Invalid credentials.'})

    // Generate token
    var token = jwt.sign({
      id: 1 // user's id
    }, 'xEVKGwYJVrpQDXqVULHesLkZLW6PvQa6BRAZxfgb', { expiresIn: '5m' })

    res.json({status: true, data: {token: token}})
  }

}
