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
    db.get('auth').query("SELECT `profileid` AS `uuid`, `user_pseudo` AS `username`, `authorised_ip` AS `authorised_ip`, `dynamic_ip` AS `dynamic_ip`, `has_connected_v5` AS `has_connected_v5`, `is_register_v5` AS `is_register_v5`, `mac_adress` AS `mac_adress` FROM `joueurs` WHERE `user_id` = ? LIMIT 1", [id], function (err, rows, fields) {
      if (err) return next(err)
      if (rows === undefined || rows[0] === undefined) return next(new Error('User not found'))
      return next(undefined, rows[0])
    })
  },

  getAuthLogs: function (id, next) {
    // find id
    db.get('auth').query("SELECT `user_pseudo` AS `username` FROM `joueurs` WHERE `user_id` = ? LIMIT 1", [id], function (err, rows, fields) {
      if (err) return next(err)
      if (rows === undefined || rows[0] === undefined) return next(new Error('User not found'))

      // find logs with username
      db.get('launcherlogs').query("SELECT `id` AS `id`, `username` AS `username`, `ip` AS `ip`, `date` AS `date`, `mac_adress` AS `mac_adress` FROM `loginlogs` WHERE `username` = ?", [rows[0].username], function (err, rows, fields) {
        if (err) return next(err)
        if (rows === undefined || rows.length === 0) return next(undefined, [])
        return next(undefined, rows)
      })
    })
  },

  getWebsiteInfos: function (id, next) {
    db.get('web_v5').query("SELECT `id` AS `id`, `pseudo` AS `username`, `email` AS `email`, `money` AS `money`, `ip` AS `register_ip`, `skin` AS `has_purchased_skin`, `cape` AS `has_purchased_cape`, `created` AS `register_date`, `obsi-skin_uploaded` AS `skin_uploaded`, `obsi-cape_uploaded` AS `cape_uploaded`, `obsi-obsiguard_enabled` AS `obsiguard_enabled` FROM `users` WHERE `id` = ? LIMIT 1", [id], function (err, rows, fields) {
      if (err) return next(err)
      if (rows === undefined || rows[0] === undefined) return next(new Error('User not found'))
      return next(undefined, rows[0])
    })
  },

  getUsernameUpdateLogs: function (id, next) {
    db.get('web_v5').query("SELECT `id` AS `id`, `user_id` AS `user_id`, `old_pseudo` AS `old_username`, `new_pseudo` AS `new_username`, `created` AS `update_date` FROM `obsi__pseudo_update_histories` WHERE `user_id` = ?", [id], function (err, rows, fields) {
      if (err) return next(err)
      if (rows === undefined || rows.length === 0) return next(undefined, [])
      return next(undefined, rows)
    })
  }

}
