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
            if (err || ids.web === 0) {
                console.error(err)
                return res.status(404).json({status: false, error: 'User not found.'})
            }

            async.parallel([

                // get launcher logs
                function (callback) {
                    User.getAddresses(ids.web, callback)
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

                function (callback) {
                    db.get(currentDB).query('SELECT users.username, users_connection_logs.ip, users_connection_logs.created_at as date, users_connection_logs.id ' +
                        'FROM users_connection_logs ' +
                        'INNER JOIN users ON users.id = users_connection_logs.user_id ' +
                        'WHERE user_id = ? ORDER BY id DESC LIMIT 1', [ids.web], function (err, rows) {
                        if (err)
                            return callback(err)
                        if (rows === undefined || rows.length === 0)
                            return callback(undefined, [])
                        rows.mac_adress = null;
                        callback(undefined, rows[0])
                    })
                }

            ], function (err, results) {
                if (err) {
                    console.error(err)
                    return res.status(500).json({status: false, error: 'Internal error.'})
                }

                // render to user
                res.json({
                    status: true,
                    data: {
                        ids: ids,
                        usernames: {
                            histories: results[2],
                            current: results[1].username
                        },
                        uuid: ids.uuid,
                        registerDate: results[1].register_date,
                        lastConnection: results[3], // launcher's logs
                        adresses: {
                            mac: results[0].mac,
                            ip: results[0].ip
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

    getUUIDFromUsername: function (req, res) {
        if (req.params.username === undefined)
            return res.status(400).json({status: false, error: 'Missing uuid.'})

        User.getUUIDFromUsername(req.params.username, function (err, data) {
            if (err) {
                console.error(err)
                return res.status(404).json({status: false, error: 'User not found.'})
            }
            res.json({
                status: true,
                data: {
                    uuid: data.uuid_formatted
                }
            })
        })
    },

    canVote: function (req, res) {
        if (req.params.username === undefined)
            return res.status(400).json({status: false, error: 'Missing user\'s name.'})

        // find user
        db.get(currentDB).query("SELECT `id` AS `id` FROM users WHERE `username` = ? LIMIT 1", [req.params.username], function (err, rows, fields) {
            if (err) {
                console.error(err)
                return res.status(500).json({status: false, error: 'Internal error.'})
            }
            if (rows === undefined || rows[0] === undefined)
                return res.status(404).json({status: false, error: 'User not found.'})
            // find user's vote
            db.get(currentDB).query("SELECT `created_at` AS `last_vote_date` FROM votes WHERE `user_id` = ? ORDER BY id DESC LIMIT 1", [rows[0].id], function (err, rows, fields) {
                // error
                if (err) {
                    console.error(err)
                    return res.status(500).json({status: false, error: 'Internal error.'})
                }
                // user hasn't vote yet
                if (rows === undefined || rows.length === 0)
                    return res.json({status: true, success: "User hasn't vote yet!"})

                var last_vote_date = (new Date(rows[0].last_vote_date)).getTime()
                // check if cooldown (minutes) was passed
                var now = Date.now()
                var cooldown_time = 240 * 60 * 1000 // minutes to miliseconds
                cooldown_time = last_vote_date + cooldown_time
                if (now > cooldown_time)
                    return res.json({status: true, success: "User can vote!"})
                else
                    return res.json({status: false, success: "User can't vote!"})
            })
        })
    },

    authenticate: function (req, res) {
        if (req.body.username === undefined || req.body.username.length === 0 || req.body.password === undefined || req.body.password.length === 0)
            return res.status(400).json({status: false, error: 'Missing params.'})

        // find user
        db.get(currentDB).query("SELECT `id` AS `id`, `password` AS `password` FROM users WHERE `username` = ? LIMIT 1", [req.body.username], function (err, rows, fields) {
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
            return res.json({
                status: true, data: {
                    user: {
                        id: rows[0].id
                    }
                }
            })
        })
    },

    getStaff: function (req, res) {
       var ranks = {}
       db.get('permissions').query('SELECT memberships.display_name AS member, entities.display_name FROM memberships' +
           'INNER JOIN entities ON entities.id = memberships.group_id' +
           'WHERE entities.priority > 1' +
           'ORDER BY entities.priority DESC', function (err, rows) {
           if (err) {
               console.error(err)
               return res.status(500).json({status: false, error: 'Internal error.'})
           }
           for (var i = 0; i < rows.length; i++)
           {
               if (ranks[rows[i].display_name] !== undefined)
                   ranks[rows[i].display_name].push(rows[i].member)
               else
                   ranks[rows[i].display_name] = [rows[i].member]
           }
           return (res.json({status: true, data: ranks}))
       })
    },

    getMoneyTimeline: function (req, res) {
        if (req.params.username === undefined)
            return res.status(400).json({status: false, error: 'Missing user\'s name.'})
        // find user
        db.get(currentDB).query("SELECT `id` AS `id` FROM users WHERE `username` = ? LIMIT 1", [req.params.username], function (err, rows, fields) {
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
                    db.get(currentDB).query("SELECT `money` AS `balance` FROM `users` WHERE `id` = ?", [rows[0].id], function (err, rows, fields) {
                        if (err) return callback(err)
                        callback(undefined, parseFloat(rows[0].balance))
                    })
                },
                // get old balance
                function (callback) {
                    db.get('web_v7').query("SELECT `money` AS `balance` FROM `users` WHERE `id` = ?", [rows[0].id], function (err, rows, fields) {
                        if (err) return callback(err)
                        if (!rows[0]) return callback(undefined, 0.0)
                        callback(undefined, parseFloat(rows[0].balance))
                    })
                },
                // get money from youtube videos
                function (callback) {
                    User.getYoutubeRemunerations(rows[0].id, callback)
                },
            ], function (err, results) {
                if (err) {
                    console.error(err)
                    return res.status(500).json({status: false, error: 'Internal error.'})
                }
                var oldBalance = results[6] || 0
                var currentBalance = results[5] || 0
                // formatting
                var timeline = []
                timeline = timeline.concat(results[0], results[1], results[2], results[3], results[4], results[7])
                timeline.sort(function (a, b) {
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

    getMoney: function (req, res) {
        if (req.params.username === undefined)
            return res.status(400).json({status: false, error: 'Missing user\'s name.'})
        // find user
        db.get(currentDB).query("SELECT `money` AS `money` FROM users WHERE `username` = ? LIMIT 1", [req.params.username], function (err, rows) {
            if (err) {
                console.error(err)
                return res.status(500).json({status: false, error: 'Internal error.'})
            }
            if (rows === undefined || rows[0] === undefined)
                return res.status(404).json({status: false, error: 'User not found.'})
            return res.json({status: true, data: {
                money: rows[0].money
            }})
        })
    },

    transferMoney: function (req, res) {
        if (req.params.username === undefined)
            return res.status(400).json({status: false, error: 'Missing user\'s name.'})
        if (req.body === undefined || req.body.amount === undefined || req.body.amount.length === 0)
            return res.status(400).json({status: false, error: 'Missing amount.'})
        if (req.body === undefined || req.body.receiver === undefined || (req.body.receiver !== null && req.body.receiver.length === 0))
            return res.status(400).json({status: false, error: 'Missing receiver\'s username.'})
        var amount = parseFloat(req.body.amount)
        var receiver = req.body.receiver
        // find user
        db.get(currentDB).query("SELECT `id` AS `id`, `money` AS `money` FROM users WHERE `username` = ? LIMIT 1", [req.params.username], function (err, rows) {
            if (err) {
                console.error(err)
                return res.status(500).json({status: false, error: 'Internal error.'})
            }
            if (rows === undefined || rows[0] === undefined)
                return res.status(404).json({status: false, error: 'User not found.'})
            var user = rows[0]
            if (amount > user.money)
                return res.status(402).json({status: false, error: 'User didn\'t have enough money.'})
            // find receiver
            if (receiver === null) {
                db.get(currentDB).query("UPDATE users SET `money` = ? WHERE `id` = ?", [user.money - amount, user.id], function (err) {
                    if (err) {
                        console.error(err)
                        return res.status(500).json({status: false, error: 'Internal error.'})
                    }
                    return res.json({status: true, success: 'Transfer successfully proceeded.'})
                })
            } else {
                db.get(currentDB).query("SELECT `id` AS `id`, `money` AS `money` FROM users WHERE `username` = ? LIMIT 1", [receiver], function (err, rows) {
                    if (err) {
                        console.error(err)
                        return res.status(500).json({status: false, error: 'Internal error.'})
                    }
                    if (rows === undefined || rows[0] === undefined)
                        return res.status(404).json({status: false, error: 'Receiver not found.'})
                    receiver = rows[0]
                    var receiverMoney = receiver.money + amount
                    var userMoney = user.money - amount
                    db.get(currentDB).query("UPDATE users SET `money` = ? WHERE `id` = ?", [receiverMoney, receiver.id], function (err) {
                        if (err) {
                            console.error(err)
                            return res.status(500).json({status: false, error: 'Internal error.'})
                        }
                        db.get(currentDB).query("UPDATE users SET `money` = ? WHERE `id` = ?", [userMoney, user.id], function (err) {
                            if (err) {
                                console.error(err)
                                return res.status(500).json({status: false, error: 'Internal error.'})
                            }
                            return res.json({status: true, success: 'Transfer successfully proceeded.'})
                        })
                    })
                })
            }
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
                db.get(currentDB).query("SELECT user_id FROM users_connection_logs WHERE ip = ? GROUP BY user_id", [req.body.ip], function (err, rows, fields) {
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
                db.get('auth').query("SELECT user_id FROM mac_addresses WHERE address LIKE '%?%' GROUP BY user_id", [req.body.mac], function (err, rows, fields) {
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
            _.each(_.groupBy([].concat(results[0], results[1]), 'user_id'), function (value, key, list) {
                data.push(value[0])
            })
            res.json({
                status: true,
                data: data
            })
        })
    },

    getUsersInfos: function (req, res) {
        if (!req.body || req.body.length === 0 || ((!req.body.ids || req.body.ids.length === 0) && (!req.body.uuids || req.body.uuids.length === 0)))
            return res.status(400).json({status: false, error: 'Missing params.'})
        // parse
        var dbreq, list
        if (req.body.ids) {
            list = _.map(req.body.ids, function (id) {
                if (id == parseInt(id))
                    return parseInt(id)
            })
            dbreq = "SELECT `id` AS `id`, `username` AS `username` FROM `users` WHERE `id` IN(" + list.join() + ")"
        } else {
            list = _.map(req.body.uuids, function (uuid) {
                if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.exec(uuid))
                    return uuid
            })
            dbreq = "SELECT `uuid` AS `id`, `username` AS `username` FROM `users` WHERE `uuid` IN('" + list.join("', '") + "')"
        }
        // query
        db.get(currentDB).query(dbreq, function (err, rows, fields) {
            if (err) {
                console.error(err)
                return res.status(500).json({status: false, error: 'Internal error.'})
            }
            // each
            var users = {}
            for (var key in rows) {
                if (rows.hasOwnProperty(key)) {
                    users[rows[key].id] = rows[key].username
                }
            }
            // result
            return res.json({
                status: true,
                data: {
                    users: users
                }
            })
        })
    }

}
