var async = require('async')

module.exports = {

  getBans: function (req, res) {
    var limit = 100
    if (req.query !== undefined && req.query.limit !== undefined)
      limit = parseInt(req.query.limit)

    db.get('sanctions').query("SELECT `ban_id` AS `id`, `UUID` AS `uuid`, `ban_ip` AS `banned_ip`, `ban_staff` AS `staff_username`, `ban_reason` AS `reason`, `ban_server` AS `server`, `ban_begin` AS `date`, `ban_end` AS `end_date`, `ban_state` AS `state`, `ban_unbandate` AS `remove_date`, `ban_unbanstaff` AS `remove_staff` FROM BAT_ban WHERE 1 ORDER BY `id` DESC LIMIT ?", [limit], function (err, rows, fields) {
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
          end_date: ban.end_date,
          state: ban.state,
          duration: (ban.end_date == null) ? 'PERMANENT' : ((ban.end_date - ban.date) / 1000), // return time in minutes or PERMANENT
          remove_date: ban.remove_date,
          remove_staff: (ban.remove_staff != null) ? {username: ban.remove_staff} : null
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
            bans: bans
          }
        })
      })
    })
  }

}
