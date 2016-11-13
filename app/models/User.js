var async = require('async')

module.exports = {

  getIds: function (username, next) {
    var result = {
      web: 0,
      logblock: 0,
      auth: 0
    }
    if (username === undefined) return result

    // web
    if (username == parseInt(username)) { // is an id
      db.get('web_v5').query("SELECT `pseudo` FROM users WHERE `id` = " + username + " LIMIT 1", function (err, rows, fields) {
        if (err) throw err
        queries(rows[0].pseudo)
      })
    } else {
      queries(username)
    }

    function queries (username) {
      async.parallel([
        // web
        function (callback) {
          db.get('web_v5').query("SELECT `id` FROM users WHERE `pseudo` = '" + username + "' LIMIT 1", function (err, rows, fields) {
            if (err) return callback(err)
            callback(undefined, rows)
          })
        },
        // auth
        function (callback) {
          db.get('auth').query("SELECT `user_id` FROM `joueurs` WHERE `user_pseudo` = '" + username + "' LIMIT 1", function (err, rows, fields) {
            if (err) return callback(err)
            callback(undefined, rows)
          })
        },
        // logblock
        function (callback) {
          db.get('logblock').query("SELECT `playerid` FROM `lb-players` WHERE `playername` = '" + username + "' LIMIT 1", function (err, rows, fields) {
            if (err) return callback(err)
            callback(undefined, rows)
          })
        }
      ], function (err, results) {
        if (err) return next(err)
        if (results[0][0] === undefined) return next(true)

        result.web = results[0][0].id
        result.logblock = results[1][0].id
        result.auth = results[2][0].id

        return next(undefined, result)
      })
    }
  }

}
