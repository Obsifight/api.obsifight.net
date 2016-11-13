var jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.headers.authorization === undefined || req.headers.authorization.length === 0)
    return res.status(401).json({status: false, error: 'Not authorized.'})

  // check token
  jwt.verify(req.headers.authorization, 'xEVKGwYJVrpQDXqVULHesLkZLW6PvQa6BRAZxfgb', function (err, decoded) {
    if (err || decoded === undefined || decoded.id === undefined) return res.status(401).json({status: false, error: 'Not authorized.'})

    return next()
  })
}
