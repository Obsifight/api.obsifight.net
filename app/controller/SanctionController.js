var _ = require('underscore')
var async = require('async')

var formatBan = function (ban, callback) {
  // base
  var formattedData = {
    id: ban.id,
    reason: ban.reason,
    server: ban.server,
    date: ban.date,
    staff: (ban.staff_username != null) ? {username: ban.staff_username} : null,
    end_date: ban.end_date,
    state: ban.state,
    duration: (ban.end_date == null) ? 'PERMANENT' : ((ban.end_date - ban.date) / 1000), // return time in minutes or PERMANENT
    remove_date: ban.remove_date,
    remove_staff: (ban.remove_staff != null) ? {username: ban.remove_staff} : null,
    remove_reason: ban.remove_reason
  }

  // type of ban
  if (ban.uuid != null) {
    formattedData.user = {
      uuid: ban.uuid
    }
    formattedData.ban_type = 'user'
    // get username of user
    db.get('sanctions').query("SELECT `BAT_player` AS `username` FROM BAT_players WHERE `UUID` = ? LIMIT 1", [ban.uuid], function (err, rows, fields) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error.'})
      }
      if (rows !== undefined && rows.length > 0 && rows[0] !== undefined)
        formattedData.user.username = rows[0].username
      push()
    })
  } else if (ban.banned_ip != null) {
    formattedData.ip = ban.banned_ip
    formattedData.ban_type = 'ip'
    push()
  }

  // push result
  function push () {
    callback(formattedData)
  }
}
var formatKick = function (kick, callback) {
  var formattedData = {
    id: kick.id,
    reason: kick.reason,
    server: kick.server,
    date: kick.date,
    staff: (kick.staff_username != null) ? {username: kick.staff_username} : null
  }

  formattedData.user = {
    uuid: kick.uuid
  }
  // get username of user
  db.get('sanctions').query("SELECT `BAT_player` AS `username` FROM BAT_players WHERE `UUID` = ? LIMIT 1", [kick.uuid], function (err, rows, fields) {
    if (err) {
      console.error(err)
      return res.status(500).json({status: false, error: 'Internal error.'})
    }
    if (rows !== undefined && rows.length > 0 && rows[0] !== undefined)
      formattedData.user.username = rows[0].username
    // push result
    callback(formattedData)
  })
}
var formatMute = function (mute, callback) {
  // base
  var formattedData = {
    id: mute.id,
    reason: mute.reason,
    server: mute.server,
    date: mute.date,
    staff: (mute.staff_username != null) ? {username: mute.staff_username} : null,
    end_date: mute.end_date,
    state: mute.state,
    duration: (mute.end_date == null) ? 'PERMANENT' : ((mute.end_date - mute.date) / 1000), // return time in minutes or PERMANENT
    remove_date: mute.remove_date,
    remove_staff: (mute.remove_staff != null) ? {username: mute.remove_staff} : null,
    remove_reason: mute.remove_reason
  }

  // type of ban
  if (mute.uuid != null) {
    formattedData.user = {
      uuid: mute.uuid
    }
    formattedData.mute_type = 'user'
    // get username of user
    db.get('sanctions').query("SELECT `BAT_player` AS `username` FROM BAT_players WHERE `UUID` = ? LIMIT 1", [mute.uuid], function (err, rows, fields) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error.'})
      }
      if (rows !== undefined && rows.length > 0 && rows[0] !== undefined)
        formattedData.user.username = rows[0].username
      push()
    })
  } else if (ban.banned_ip != null) {
    formattedData.ip = mute.muted_ip
    formattedData.mute_type = 'ip'
    push()
  }

  // push result
  function push () {
    callback(formattedData)
  }
}

module.exports = {

  getBans: function (req, res) {
    var limit = 100
    if (req.query !== undefined && req.query.limit !== undefined)
      limit = parseInt(req.query.limit)

    db.get('sanctions').query("SELECT `ban_id` AS `id`, `UUID` AS `uuid`, `ban_ip` AS `banned_ip`, `ban_staff` AS `staff_username`, `ban_reason` AS `reason`, `ban_server` AS `server`, `ban_begin` AS `date`, `ban_end` AS `end_date`, `ban_state` AS `state`, `ban_unbandate` AS `remove_date`, `ban_unbanstaff` AS `remove_staff`, `ban_unbanreason` AS `remove_reason` FROM BAT_ban WHERE 1 ORDER BY `id` DESC LIMIT ?", [limit], function (err, rows, fields) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error.'})
      }
      if (rows === undefined || rows[0] === undefined)
        return res.status(404).json({status: false, error: 'No bans found.'})

      // init response var (after formatting)
      var bans = []

      // formatting
      async.each(rows, function (ban, callback) { // for each bans
        formatBan(ban, function (formattedData) {
          bans.push(formattedData)
          callback()
        })
      }, function () {
        // send to client
        return res.json({
          status: true,
          data: {
            bans: _.sortBy(bans, function (num) {
              return -num
            })
          }
        })
      })
    })
  },

  getBan: function (req, res) {
    if (req.params.id === undefined || parseInt(req.params.id) != req.params.id)
      return res.status(400).json({status: false, error: 'Missing ban\'s id or invalid id.'})

    // query
    db.get('sanctions').query("SELECT `ban_id` AS `id`, `UUID` AS `uuid`, `ban_ip` AS `banned_ip`, `ban_staff` AS `staff_username`, `ban_reason` AS `reason`, `ban_server` AS `server`, `ban_begin` AS `date`, `ban_end` AS `end_date`, `ban_state` AS `state`, `ban_unbandate` AS `remove_date`, `ban_unbanstaff` AS `remove_staff`, `ban_unbanreason` AS `remove_reason` FROM BAT_ban WHERE `ban_id` = ? LIMIT 1", [parseInt(req.params.id)], function (err, rows, fields) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error.'})
      }
      if (rows === undefined || rows[0] === undefined)
        return res.status(404).json({status: false, error: 'Ban not found.'})

      // formatting
      formatBan(rows[0], function (ban) {
        // send to client
        return res.json({
          status: true,
          data: {
            ban: ban
          }
        })
      })
    })
  },

  editBan: function (req, res) {
    if (req.params.id === undefined || parseInt(req.params.id) != req.params.id)
      return res.status(400).json({status: false, error: 'Missing ban\'s id or invalid id.'})
    // check body
    if (req.body.end_date === undefined && req.body.remove_reason === undefined)
      return res.status(400).json({status: false, error: 'Missing ban\'s `end_date` or `remove_reason`.'})
    if (req.body.end_date !== undefined && new Date(req.body.end_date) == 'Invalid Date') // invalid end date specified
      return res.status(400).json({status: false, error: 'Invalid ban\'s `end_date`.'})
    if (req.body.end_date !== undefined && new Date(req.body.end_date).getTime() <= Date.now()) // user try to edit end_date for unban user
      return res.status(400).json({status: false, error: 'Invalid ban\'s `end_date`. You\'ve try to set `end_date` inferior or equal of now.'})

    // find ban
    db.get('sanctions').query("SELECT `ban_id` AS `id`, `ban_state` AS `state` FROM BAT_ban WHERE `ban_id` = ? LIMIT 1", [parseInt(req.params.id)], function (err, rows, fields) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error.'})
      }
      // unknown ban with this id
      if (rows === undefined || rows[0] === undefined)
        return res.status(404).json({status: false, error: 'Ban not found.'})
      if (rows === undefined || rows[0].state == 0)
        return res.status(404).json({status: false, error: 'Ban already expired.'})

      if (req.body.end_date !== undefined) { // edit ban end date
        db.get('sanctions').query("UPDATE BAT_ban SET `ban_end` = ? WHERE `ban_id` = ? LIMIT 1", [new Date(req.body.end_date), parseInt(req.params.id)], function (err, rows, fields) {
          if (err) {
            console.error(err)
            return res.status(500).json({status: false, error: 'Internal error when edit ban.'})
          }
          render()
        })
      } else if (req.body.remove_reason !== undefined) { // unban user
        // find current api user with req.api.user.id
        db.get('api').query("SELECT `username` AS `username` FROM api_users WHERE `id` = ? LIMIT 1", [req.api.user.id], function (err, rows, fields) {
          if (err || rows === undefined || rows.length === 0) {
            console.error(err || new Error('Api user not found.'))
            return res.status(500).json({status: false, error: 'Internal error when find current api user.'})
          }
          db.get('sanctions').query("UPDATE BAT_ban SET `ban_state` = 0, `ban_unbandate` = ?, `ban_unbanstaff` = ?, `ban_unbanreason` = ? WHERE `ban_id` = ? LIMIT 1", [(new Date()), rows[0].username, req.body.remove_reason, parseInt(req.params.id)], function (err, rows, fields) {
            if (err) {
              console.error(err)
              return res.status(500).json({status: false, error: 'Internal error when edit ban.'})
            }
            render()
          })
        })
      } else {
        return res.status(400).json({status: false, error: 'Missing params.'})
      }

      function render () {
        res.json({
          status: true,
          success: 'Ban has been successfuly edited!'
        })
      }
    })
  },

  addBan: function (req, res) {
    // Check args
    var args = ['reason', 'server', 'type']
    for (var i = 0; i < args.length; i++) {
      if (req.body[args[i]] === undefined || req.body[args[i]].length === 0)
        return res.status(400).json({status: false, error: 'Missing params `' + args[i] + '`.'})
    }
    if (req.body.type !== 'user' && req.body.type !== 'ip')
      return res.status(400).json({status: false, error: 'Missing params `type` or invalid.'})
    if (req.body.type === 'user' && req.body.user === undefined && (req.body.user.uuid === undefined || req.body.user.username === undefined))
      return res.status(400).json({status: false, error: 'Missing params `user.uuid` or `user.username`.'})
    if (req.body.type === 'ip' && req.body.ip === undefined)
      return res.status(400).json({status: false, error: 'Missing params `ip`.'})
    if (req.body.end_date !== undefined && new Date(req.body.end_date) == 'Invalid Date') // invalid end date specified
      return res.status(400).json({status: false, error: 'Invalid ban\'s `end_date`.'})

    // set user uuid if type is user and username is defined
    if (req.body.type === 'user' && req.body.user.uuid === undefined)
      db.get('sanctions').query("SELECT `UUID` AS `uuid` FROM BAT_players WHERE `BAT_player` = ? LIMIT 1", [req.body.user.username], function (err, rows, fields) {
        if (err) {
          console.error(err )
          return res.status(500).json({status: false, error: 'Internal error when find user\'s uuid.'})
        }
        if (rows === undefined || rows.length === 0)
          return res.status(404).json({status: false, error: 'User not found.'})
        addBan(rows[0].uuid)
      })
    else if (req.body.type === 'user') // uuid set by client
      addBan(req.body.user.uuid)
    else // ban ip
      addBan()

    function addBan (uuid) {
      // add ban
      db.get('api').query("SELECT `username` AS `username` FROM api_users WHERE `id` = ? LIMIT 1", [req.api.user.id], function (err, rows, fields) {
        if (err || rows === undefined || rows.length === 0) {
          console.error(err || new Error('Api user not found.'))
          return res.status(500).json({status: false, error: 'Internal error when find current api user.'})
        }
        // after get api_user's username
        db.get('sanctions').query("INSERT INTO BAT_ban SET `UUID` = ?, `ban_ip` = ?, `ban_staff` = ?, `ban_reason` = ?, `ban_server` = ?, `ban_begin` = ?, `ban_end` = ?", [
          (req.body.type === 'user' ? uuid : null),
          (req.body.type === 'ip' ? req.body.ip : null),
          rows[0].username,
          req.body.reason,
          req.body.server,
          (new Date()),
          (req.body.end_date || null)
        ], function (err, rows, fields) {
          if (err) {
            console.error(err)
            return res.status(500).json({status: false, error: 'Internal error when edit ban.'})
          }
          res.json({
            status: true,
            success: 'Ban has been successfuly added!'
          })
        })
      })
    }
  },

  getUserSanctions: function (req, res) {
    if (req.params.username === undefined)
      return res.status(400).json({status: false, error: 'Missing user\'s name.'})

    // handle limit
    var limit = 100
    if (req.query !== undefined && req.query.limit !== undefined)
      limit = parseInt(req.query.limit)
    limit = limit / 3

    // find UUID
    User.getUUIDFromUsername(req.params.username, function (err, uuid) {
      if (err) {
        if (typeof err === 'string') { // not found
          return res.status(404).json({status: false, error: 'User not found.'})
        } else { // mysql error
          console.error(err)
          return res.status(500).json({status: false, error: 'Internal error.'})
        }
      }
      uuid = uuid.uuid // without '-'

      // get sanctions
      async.parallel([

        function getBans (next) {
          db.get('sanctions').query("SELECT `ban_id` AS `id`, `UUID` AS `uuid`, `ban_ip` AS `banned_ip`, `ban_staff` AS `staff_username`, `ban_reason` AS `reason`, `ban_server` AS `server`, `ban_begin` AS `date`, `ban_end` AS `end_date`, `ban_state` AS `state`, `ban_unbandate` AS `remove_date`, `ban_unbanstaff` AS `remove_staff`, `ban_unbanreason` AS `remove_reason` FROM BAT_ban WHERE `UUID` = ? ORDER BY `id` DESC LIMIT ?", [uuid, limit], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows[0] === undefined)
              return next(undefined, [])

            // init response var (after formatting)
            var bans = []

            // formatting
            async.each(rows, function (ban, callback) { // for each bans
              formatBan(ban, function (formattedData) {
                bans.push(formattedData)
                callback()
              })
            }, function () {
              next(undefined, _.sortBy(bans, function (num) {
                return -num
              }))
            })
          })
        },

        function getKicks (next) {
          db.get('sanctions').query("SELECT `kick_id` AS `id`, `UUID` AS `uuid`, `kick_staff` AS `staff_username`, `kick_reason` AS `reason`, `kick_server` AS `server`, `kick_date` AS `date` FROM BAT_kick WHERE `UUID` = ? ORDER BY `id` DESC LIMIT ?", [uuid, limit], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows[0] === undefined)
              return next(undefined, [])

            // init response var (after formatting)
            var kicks = []

            // formatting
            async.each(rows, function (kick, callback) { // for each bans
              formatKick(kick, function (formattedData) {
                kicks.push(formattedData)
                callback()
              })
            }, function () {
              next(undefined, _.sortBy(kicks, function (num) {
                return -num
              }))
            })
          })
        },

        function getMutes (next) {
          db.get('sanctions').query("SELECT `mute_id` AS `id`, `UUID` AS `uuid`, `mute_ip` AS `muted_ip`, `mute_staff` AS `staff_username`, `mute_reason` AS `reason`, `mute_server` AS `server`, `mute_begin` AS `date`, `mute_end` AS `end_date`, `mute_state` AS `state`, `mute_unmutedate` AS `remove_date`, `mute_unmutestaff` AS `remove_staff`, `mute_unmutereason` AS `remove_reason` FROM BAT_ban WHERE `UUID` = ? ORDER BY `id` DESC LIMIT ?", [uuid, limit], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows[0] === undefined)
              return next(undefined, [])

            // init response var (after formatting)
            var mutes = []

            // formatting
            async.each(rows, function (mute, callback) { // for each bans
              formatMute(mute, function (formattedData) {
                mutes.push(formattedData)
                callback()
              })
            }, function () {
              next(undefined, _.sortBy(mutes, function (num) {
                return -num
              }))
            })
          })
        }

      ], function (err, results) {
        if (err) {
          console.error(err)
          return res.status(500).json({status: false, error: 'Internal error.'})
        }
        // results
        return res.json({
          status: true,
          data: {
            bans: results[0],
            kicks: results[1],
            mutes: results[2]
          }
        })
      })
    })
  }

}
