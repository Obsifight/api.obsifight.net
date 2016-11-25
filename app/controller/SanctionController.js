var _ = require('underscore')
var async = require('async')

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
        // base
        var formattedData = {
          id: ban.id,
          reason: ban.reason,
          ban: ban.server,
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
          bans.push(formattedData)
          callback()
        }
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
  }

}
