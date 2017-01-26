var async = require('async')
var _ = require('underscore')

Array.prototype.remove = function () {
  var what
  var a = arguments
  var L = a.length
  var ax
  while (L && this.length) {
    what = a[--L]
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1)
    }
  }
  return this
}

module.exports = {

  get: function (req, res) {
    if (req.params.username === undefined)
      return res.status(400).json({status: false, error: 'Missing user\'s name.'})

    // Find user
    User.getIds(req.params.username, function (err, ids) {
      if (err || ids.web === 0) return res.status(404).json({status: false, error: 'User not found.'})

      async.parallel([

        // get uuid
        function (callback) {
          User.getAuthInfos(ids.auth, callback)
        },

        // get launcher logs
        function (callback) {
          User.getAuthLogs(ids.auth, function (err, rows) {
            if (err) return callback(err)

            // formatting
            async.eachOf(rows, function (row, index, cb) {
              try {
                rows[index].mac_adress = JSON.parse(row.mac_adress)
              } catch (e) {
                rows[index].mac_adress = []
              }
              cb()
            }, function () {
              return callback(undefined, rows)
            })
          })
        },

        // get register date
        function (callback) {
          User.getWebsiteInfos(ids.web, callback)
        },

        // get username update logs
        function (callback) {
          User.getUsernameUpdateLogs(ids.web, function (err, rows) {
            if (err) return callback(err)

            // formatting
            var formattedData = _.each(rows, function (element, index) { // rows is an array with logs
              return element.old_username
            })
            return callback(undefined, formattedData)
          })
        },

      ], function (err, results) {
        if (err) {
          console.error(err)
          return res.status(500).json({status: false, error: 'Internal error.'})
        }

        // mac
        var adresses = []
        results[1].forEach(function (connection) {
          if (connection.mac_adress)
            connection.mac_adress.forEach(function (adress) {
              adresses.push({adress: adress})
            })
        })

        // render to user
        res.json({
          status: true,
          data: {
            ids: ids,
            usernames: {
              histories : results[3],
              current: results[2].username
            },
            uuid: results[0].uuid,
            registerDate: results[2].register_date,
            lastConnection: results[1][results[1].length - 1], // launcher's logs
            adresses: {
              mac: Object.keys(_.groupBy(adresses, 'adress')).remove('null'),
              ip: Object.keys(_.groupBy(results[1], 'ip')).remove('null')
            }
          }
        })
      })
    })
  },

  getFromUUID: function (req, res) {
    if (req.params.uuid === undefined)
      return res.status(400).json({status: false, error: 'Missing user\'s name.'})

    User.getUsernameFromUUID(req.params.uuid, function (err, data) {
      if (err) {
        console.error(err)
        return res.status(404).json({status: false, error: 'User not found.'})
      }
      res.json({
        status: true,
        data: {
          username: data.username
        }
      })
    })
  },

  canVote: function (req, res) {
    if (req.params.username === undefined)
      return res.status(400).json({status: false, error: 'Missing user\'s name.'})

    // find user
    db.get('web_v6').query("SELECT `id` AS `id` FROM users WHERE `pseudo` = ? LIMIT 1", [req.params.username], function (err, rows, fields) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error.'})
      }
      if (rows === undefined || rows[0] === undefined)
        return res.status(404).json({status: false, error: 'User not found.'})
      // find user's vote
      db.get('web_v6').query("SELECT `created` AS `last_vote_date` FROM obsivote__votes WHERE `user_id` = ? LIMIT 1", [rows[0].id], function (err, rows, fields) {
        // error
        if (err) {
          console.error(err)
          return res.status(500).json({status: false, error: 'Internal error.'})
        }
        // user hasn't vote yet
        if (rows === undefined || rows.length === 0)
          return res.json({status: true, success: "User hasn't vote yet!"})

        var last_vote_date = (new Date(rows[0].last_vote_date)).getTime()

        // get configuration
        db.get('web_v6').query("SELECT `time_vote` AS `vote_cooldown` FROM obsivote__configurations WHERE 1 LIMIT 1", function (err, rows, fields) {
          // error
          if (err) {
            console.error(err)
            return res.status(500).json({status: false, error: 'Internal error.'})
          }
          // not config
          if (rows === undefined || rows.length === 0)
            return res.json({status: true, success: "Admin hasn't config vote yet!"})
          // check if cooldown (minutes) was passed
          var now = Date.now()
          var cooldown_time = rows[0].vote_cooldown * 60 * 1000 // minutes to miliseconds
          cooldown_time = last_vote_date + cooldown_time
          if (now > cooldown_time)
            return res.json({status: true, success: "User can vote!"})
          else
            return res.json({status: false, success: "User can't vote!"})
        })
      })
    })
  },

  authenticate: function (req, res) {
    if (req.body.username === undefined || req.body.username.length === 0 || req.body.password === undefined || req.body.password.length === 0)
      return res.status(400).json({status: false, error: 'Missing params.'})

    // find user
    db.get('web_v6').query("SELECT `id` AS `id`, `password` AS `password` FROM users WHERE `pseudo` = ? LIMIT 1", [req.body.username], function (err, rows, fields) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error when find user.'})
      }

      // not found
      if (rows === undefined || rows[0] === undefined)
        return res.status(404).json({status: false, error: 'User not found.'})

      // check if password is valid
      if (User.encodePassword(req.body.username, req.body.password) !== rows[0].password)
        return res.status(403).json({status: false, error: "Invalid user's credentials."})

      // valid
      return res.json({status: true, data: {
        user: {
          id: rows[0].id
        }
      }})
    })
  },

  getStaff: function (req, res) {
    var ranks = config.staff.ranks
    if (req.body.premium)
      ranks = _.findWhere(ranks, {premium: true})
    // find groups id
    var usersByRanks = {}
    async.each(ranks, function (rank, next) {
      db.get('pex').query('SELECT `child` AS `user` FROM `permissions_inheritance` WHERE `parent` = ?', [rank.name], function (err, rows, fields) {
        if (err) {
          console.error(err)
          return next()
        }
        // empty
        if (rows === undefined || rows.length === 0)
          return next()
        // each users
        async.each(rows, function (row, cb) {
          // get username
          User.getUsernameFromUUID(row.user, function (err, data) {
            if (err) {
              console.error(err)
              return cb()
            }
            if (!usersByRanks[rank.customGroupName])
              usersByRanks[rank.customGroupName] = []
            usersByRanks[rank.customGroupName].push(data.username)
            return cb()
          })
        }, function () {
          return next()
        })
      })
    }, () => {
      res.json({
        status: true,
        data: usersByRanks
      })
    })
  },

  getMoneyTimeline: function (req, res) {
    if (req.params.username === undefined)
      return res.status(400).json({status: false, error: 'Missing user\'s name.'})
    // find user
    db.get('web_v6').query("SELECT `id` AS `id` FROM users WHERE `pseudo` = ? LIMIT 1", [req.params.username], function (err, rows, fields) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error.'})
      }
      if (rows === undefined || rows[0] === undefined)
        return res.status(404).json({status: false, error: 'User not found.'})
      // get data
      async.parallel([
        // get refunds
        function (callback) {
          User.getRefunds(rows[0].id, callback)
        },
        // get items buy
        function (callback) {
          User.getItemsPurchases(rows[0].id, callback)
        },
        // get money buy
        function (callback) {
          User.getMoneyPurchases(rows[0].id, callback)
        },
        // get money transfers
        function (callback) {
          User.getMoneyTransfers(rows[0].id, callback)
        },
        // get money transfers to him
        function (callback) {
          User.getMoneyTransfersFromOthers(rows[0].id, callback)
        },
        // get current balance
        function (callback) {
          db.get('web_v6').query("SELECT `money` AS `balance` FROM `users` WHERE `id` = ?", [rows[0].id], function (err, rows, fields) {
            if (err) return callback(err)
            callback(undefined, parseFloat(rows[0].balance))
          })
        },
        // get old balance
        function (callback) {
          db.get('web_v5').query("SELECT `money` AS `balance` FROM `users` WHERE `id` = ?", [rows[0].id], function (err, rows, fields) {
            if (err) return callback(err)
            callback(undefined, parseFloat(rows[0].balance))
          })
        }
      ], function (err, results) {
        if (err) {
          console.error(err)
          return res.status(500).json({status: false, error: 'Internal error.'})
        }
        var oldBalance = results[6] || 0
        var currentBalance = results[5] || 0
        // formatting
        var timeline = []
        timeline = timeline.concat(results[0], results[1], results[2], results[3], results[4])
        timeline.sort(function(a,b) {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        // response
        res.json({
          status: true,
          data: {
            oldBalance: oldBalance,
            current: currentBalance,
            timeline: timeline
          }
        })
      })
    })
  },

  findUsers: function (req, res) {
    if (!req.body || req.body.length === 0)
      return res.status(400).json({status: false, error: 'Missing params.'})
    // handle find
    async.parallel([
      // ip
      function (callback) {
        if (!req.body.ip || req.body.ip.length < 5)
          return callback(undefined, [])
        // find
        db.get('launcherlogs').query("SELECT `username` AS `username`, MAX(`date`) AS `last_connection` FROM `loginlogs` WHERE `ip` = ? GROUP BY `username` ORDER BY MAX(`date`)", [req.body.ip], function (err, rows, fields) {
          if (err) return callback(err)
          if (!rows || rows.length === 0) return callback(undefined, [])
          return callback(undefined, rows)
        })
      },
      // mac
      function (callback) {
        if (!req.body.mac || req.body.mac.length < 5)
          return callback(undefined, [])
        // find
        db.get('launcherlogs').query("SELECT `username` AS `username`, MAX(`date`) AS `last_connection` FROM `loginlogs` WHERE `mac_adress` LIKE '%\"" + req.body.mac + "\"%' GROUP BY `username` ORDER BY MAX(`date`)", [], function (err, rows, fields) {
          if (err) return callback(err)
          if (!rows || rows.length === 0) return callback(undefined, [])
          return callback(undefined, rows)
        })
      }
    ], function (err, results) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error.'})
      }
      // response
      var data = []
      _.each(_.groupBy([].concat(results[0], results[1]), 'username'), function (value, key, list) {
        data.push(value[0])
      })
      res.json({
        status: true,
        data: data
      })
    })
  }

}
