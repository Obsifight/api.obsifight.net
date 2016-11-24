var _ = require('underscore')

module.exports = {

  getBans: function (req, res) {
    db.get('sanctions').query("SELECT `ban_id` AS `id`, `UUID` AS `uuid`, `ban_ip` AS `banned_ip`, `ban_staff` AS `staff_uuid`, `ban_reason` AS `reason`, `ban_server` AS `server`, `ban_begin` AS `date`, `ban_end` AS `end_date`, `ban_state` AS `state`, `ban_unbandate` AS `remove_date`, `ban_unbanstaff` AS `remove_staff_uuid` FROM BAT_ban WHERE 1 ORDER BY `id` DESC", function (err, rows, fields) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error.'})
      }
      if (rows === undefined || rows[0] === undefined)
        return res.status(404).json({status: false, error: 'No bans found.'})

      return res.json({
        status: true,
        data: {
          bans: rows
        }
      })
    })
  }

}
