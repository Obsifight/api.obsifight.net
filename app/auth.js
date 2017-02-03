var jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.headers.authorization === undefined || req.headers.authorization.length === 0)
    return res.status(401).json({status: false, error: 'Not authorized.'})

  // check token
  jwt.verify(req.headers.authorization, 'xEVKGwYJVrpQDXqVULHesLkZLW6PvQa6BRAZxfgb', function (err, decoded) {
    if (err || decoded === undefined || decoded.id === undefined || decoded.ip !== req.connection.remoteAddress)
      return res.status(401).json({status: false, error: 'Not authorized.'})
    req.api = {
      user: {
        id: parseInt(decoded.id)
      }
    }
    next()

    // add into history
    var body = (req.originalUrl != '/user/authenticate') ? JSON.stringify(req.body) : 'Private.'
    db.get('api').query("INSERT INTO api_histories SET `user_id` = ?, `action` = ?, `body` = ?, `accessToken` = ?, `createdAt` = ?", [parseInt(decoded.id), req.method+' '+req.originalUrl, body, req.headers.authorization, (new Date)], function (err, rows, fields) {
      if (err) console.error(err)
    })
  })
}
