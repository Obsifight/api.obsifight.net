var async = require('async')

module.exports = {

  getIds: function (id, next) {
    var result = {
      web: 0,
      logblock: 0,
      auth: 0
    }
    if (id === undefined) return result

    async.parallel([
      // web
      function (callback) {
        db.get('web_v5').query("SELECT id FROM users WHERE `id` = '" + id + "' OR `pseudo` = '" + id + "' LIMIT 1", function (err, rows, fields) {
          if (err) return callback(err)
          callback(undefined, rows)
        })
      },
      // auth
      function (callback) {
        db.get('auth').query("SELECT * FROM `joueurs` WHERE `user_id` = '" + id + "' OR `user_pseudo` = '" + id + "'", function (err, rows, fields) {
          if (err) return callback(err)
          callback(undefined, rows)
        })
      },
      // logblock
      function (callback) {
        db.get('logblock').query("SELECT * FROM `lb-players` WHERE `playername` = '" + id + "' OR `playerid` = '" + id + "'", function (err, rows, fields) {
          if (err) return callback(err)
          callback(undefined, rows)
        })
      }
    ], function (err, results) {
      if (err) return next(err)
      if (results[0][0] === undefined) return next(true)

      result.web = results[0][0].id
      return next(undefined, result)
    })
  }

}
