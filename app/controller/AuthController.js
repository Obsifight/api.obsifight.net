var jwt = require('jsonwebtoken')
var crypto = require('crypto')

var salt = 'Ka88s5dV3vEFt5vn2u94gsT5G3jBG3u9X5C2hLAS'

module.exports = {

  generateToken: function (req, res) {
    if (req.body.username === undefined || req.body.password.length === 0 || req.body.password === undefined || req.body.password.length === 0)
      return res.status(400).json({status: false, error: 'Missing username or password.'})

    // Find user with this username and password hashed
    db.get('api').query("SELECT `id` FROM api_users WHERE `username` = ? AND `password` = ? LIMIT 1", [req.body.username, req.body.password], function (err, rows, fields) {
      if (err) {
        console.error(err)
        return res.status(403).json({status: false, error: 'Invalid credentials.'})
      }
      // user not found
      if (rows === undefined || rows.length === 0)
        return res.status(403).json({status: false, error: 'Invalid credentials.'})

      // Generate token
      var token = jwt.sign({
        id: rows[0].id, // user's id
        ip: req.connection.remoteAddress
      }, 'xEVKGwYJVrpQDXqVULHesLkZLW6PvQa6BRAZxfgb', { expiresIn: '5m' })

      res.json({status: true, data: {token: token}})

      // edit user's last access
      db.get('api').query("UPDATE api_users SET `lastAccess` = ? WHERE `id` = ?", [(new Date), rows[0].id], function (err, rows, fields) {
        if (err) console.error(err)
      })
    })
  }

}
