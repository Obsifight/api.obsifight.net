var async = require('async')

module.exports = {

  getIds: function (username, next) {
    var result = {
      web: 0,
      logblock: 0,
      auth: 0
    }
    if (username === undefined) return callback(new Error('Username is not defined.'))

    // web
    if (username == parseInt(username)) { // is an id
      db.get('web_v5').query("SELECT `pseudo` FROM users WHERE `id` = ? LIMIT 1", [username], function (err, rows, fields) {
        if (err) return callback(err)
        queries(rows[0].pseudo)
      })
    } else {
      queries(username)
    }

    function queries (username) {
      async.parallel([
        // web
        function (callback) {
          db.get('web_v5').query("SELECT `id` FROM users WHERE `pseudo` = ? LIMIT 1", [username], function (err, rows, fields) {
            if (err) return callback(err)
            callback(undefined, rows)
          })
        },
        // auth
        function (callback) {
          db.get('auth').query("SELECT `user_id` FROM `joueurs` WHERE `user_pseudo` = ? LIMIT 1", [username], function (err, rows, fields) {
            if (err) return callback(err)
            callback(undefined, rows)
          })
        },
        // logblock
        function (callback) {
          db.get('logblock').query("SELECT `playerid` FROM `lb-players` WHERE `playername` = ? LIMIT 1", [username], function (err, rows, fields) {
            if (err) return callback(err)
            callback(undefined, rows)
          })
        }
      ], function (err, results) {
        if (err) return next(err)
        if (results[0][0] === undefined) return next(true)

        result.web = results[0][0].id
        result.auth = results[1][0].user_id
        result.logblock = results[2][0].playerid

        return next(undefined, result)
      })
    }
  },

  getAuthInfos: function (id, next) {
    db.get('auth').query("SELECT `profileid` AS `uuid`, `user_pseudo` AS `username`, `authorised_ip` AS `authorised_ip`, `dynamic_ip` AS `dynamic_ip`, `has_connected_to_v5` AS `has_connected_to_v5`, `is_register_v5` AS `is_register_v5`, `mac_adress` AS `mac_adress` FROM `joueurs` WHERE `user_id` = ? LIMIT 1", [id], function (err, rows, fields) {
      if (err) return next(err)
      if (rows === undefined || rows[0] === undefined) return next(new Error('User not found'))
      return next(undefined, rows[0])
    })
  },

  getAuthLogs: function (id, next) {
    db.get('launcherlogs').query("SELECT `id` AS `id`, `username` AS `username`, `ip` AS `ip`, `data` AS `data`, `mac_adress` AS `mac_adress` FROM `loginlogs` WHERE `user_id` = ? LIMIT 1", [id], function (err, rows, fields) {
      if (err) return next(err)
      if (rows === undefined || rows[0] === undefined) return next(new Error("User's log not found"))
      return next(undefined, rows[0])
    })
  },

  getWebsiteInfos: function (id, next) {
    db.get('web_v5').query("SELECT `id` AS `id`, `pseudo` AS `username`, `email` AS `email`, `money` AS `money`, `ip` AS `register_ip`, `skin` AS `has_purchased_skin`, `cape` AS `has_purchased_cape`, `created` AS `register_date`, `skin_uploaded` AS `obsi-skin_uploaded`, `cape_uploaded` AS `obsi-cape_uploaded`, `obsiguard_enabled` AS `obsi-obsiguard_enabled` FROM `users` WHERE `id` = ? LIMIT 1", [id], function (err, rows, fields) {
      if (err) return next(err)
      if (rows === undefined || rows[0] === undefined) return next(new Error('User not found'))
      return next(undefined, rows[0])
    })
  },

  getUsernameUpdateLogs: function (id, next) {
    db.get('web_v5').query("SELECT `id` AS `id`, `user_id` AS `user_id`, `old_pseudo` AS `old_username`, `new_pseudo` AS `new_username`, `created` AS `update_date` FROM `obsi__pseudo_update_histories` WHERE `user_id` = ? LIMIT 1", [id], function (err, rows, fields) {
      if (err) return next(err)
      if (rows === undefined || rows[0] === undefined) return next(new Error('User not found'))
      return next(undefined, rows[0])
    })
  }

}
