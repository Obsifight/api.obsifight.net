var async = require('async')
var crypto = require('crypto')

module.exports = {

    encodePassword: function (username, password) {
        var salt = 'PApVSuS8hDUEsOEP0fWZESmODaHkXVst27CTnYMM'
        return crypto.createHash('sha1').update(username + salt + password).digest('hex')
    },

    getIds: function (username, next) {
        if (username === undefined)
            return callback(new Error('Username is not defined.'))
        var result = {
            web: 0,
            logblock: -1,
            uuid: null
        }

        // web
        if (username == parseInt(username)) { // is an id
            db.get(currentDB).query("SELECT `uuid`, `id` FROM users WHERE `id` = ? LIMIT 1", [username], function (err, rows) {
                if (err) return next(err)
                result.web = rows[0].id
                queries(rows[0].uuid)
            })
        } else {
            checkIfNotAndOldUsername(username)
        }

        function checkIfNotAndOldUsername(username) {
            // find if username wasn't an old username
            db.get(currentDB).query("SELECT `user_id` FROM `users_edit_username_histories` WHERE `old_username` = ? LIMIT 1", [username], function (err, rows, fields) {
                if (err) return next(err)
                var key, value
                if (rows === undefined || rows.length === 0)
                {
                    key = 'username'
                    value = username
                }
                else
                {
                    key = 'id'
                    value = rows[0].user_id
                }

                // old username, so get new username with this id
                db.get(currentDB).query("SELECT `uuid`, `id` FROM users WHERE `" + key + "` = ? LIMIT 1", [value], function (err, rows, fields) {
                    if (err) return next(err)
                    if (rows === undefined || rows[0] === undefined) return next(new Error('User not found'))
                    result.web = rows[0].id
                    return queries(rows[0].uuid)
                })
            })
        }

        function queries(uuid) {
            db.get('logblock').query("SELECT `playerid` FROM `lb-players` WHERE `UUID` = ? LIMIT 1", [uuid], function (err, rows, fields) {
                if (err) return next(err)

                if (rows[0])
                    result.logblock = rows[0].playerid

                result.uuid = uuid
                return next(undefined, result)
            })
        }
    },

    getUUIDFromUsername: function (username, next) {
        db.get(currentDB).query("SELECT `uuid` AS `uuid` FROM `users` WHERE `username` = ? LIMIT 1", [username], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows[0] === undefined) return next('User not found')
            return next(undefined, {
                uuid: rows[0].uuid.replace(/-/g, ''), // without '-'
                uuid_formatted: rows[0].uuid // with '-'
            })
        })
    },

    getUsernameFromUUID: function (uuid, next) {
        db.get(currentDB).query("SELECT `username` AS `username` FROM `users` WHERE `uuid` = ? LIMIT 1", [uuid], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows[0] === undefined) return next('User not found')
            return next(undefined, {
                username: rows[0].username
            })
        })
    },

    getAddresses: function (id, next) {
        async.parallel([
            // Get mac
            function (cb) {
                db.get('auth').query("SELECT address FROM mac_addresses WHERE user_id = ? GROUP BY address", [id], function (err, rows) {
                    if (err)
                        return cb(err)
                    cb(undefined, rows.map(function (address) {
                        return address.address
                    }, rows))
                })
            },
            // Get ip
            function (cb) {
                db.get(currentDB).query("SELECT ip FROM users_connection_logs WHERE user_id = ? GROUP BY ip", [id], function (err, rows) {
                    if (err)
                        return cb(err)
                    cb(undefined, rows.map(function (address) {
                        return address.ip
                    }, rows))
                })
            }
        ], function (err, results) {
            if (err)
                return (next(err))
            next(undefined, {
                mac: results && results.length > 0 && results[0] !== undefined ? results[0] : [],
                ip: results && results.length > 0 && results[1] !== undefined ? results[1] : []
            })
        })
    },

    getWebsiteInfos: function (id, next) {
        db.get(currentDB).query("SELECT `id` AS `id`, `username` AS `username`, `email` AS `email`, `money` AS `money`, `ip` AS `register_ip`, `created_at` AS `register_date` FROM `users` WHERE `id` = ? LIMIT 1", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows[0] === undefined) return next(new Error('User not found'))
            return next(undefined, rows[0])
        })
    },

    getUsernameUpdateLogs: function (id, next) {
        db.get(currentDB).query("SELECT `id` AS `id`, `user_id` AS `user_id`, `old_username` AS `old_username`, `new_username` AS `new_username`, `created_at` AS `update_date` FROM `users_edit_username_histories` WHERE `user_id` = ?", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows.length === 0) return next(undefined, [])
            return next(undefined, rows)
        })
    },

    getRefunds: function (id, next) {
        db.get(currentDB).query("SELECT `amount` AS `added_money` FROM `users_refund_histories` WHERE `user_id` = ?", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows.length === 0) return next(undefined, [])
            // formatting
            async.eachOf(rows, function (row, index, cb) {
                rows[index] = {
                    date: new Date('2017-01-07 16:30:00'),
                    action_id: 'refund',
                    action_type: 'add',
                    action_message: 'Refunded',
                    sold: '+' + row.added_money.toString()
                }
                cb()
            }, function () {
                return next(undefined, rows)
            })
        })
    },

    getItemsPurchases: function (id, next) {
        db.get(currentDB).query("SELECT `shop_items_purchase_histories`.`created_at` AS `date`, `shop_items`.`price` AS `price`, `shop_items`.`name` AS `item_name` " +
            "FROM `shop_items_purchase_histories` " +
            "INNER JOIN `users` ON `users`.`id` = `shop_items_purchase_histories`.`user_id` " +
            "INNER JOIN `shop_items` ON `shop_items`.`id` = `shop_items_purchase_histories`.`item_id` " +
            "WHERE `shop_items_purchase_histories`.`user_id` = ?", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows.length === 0) return next(undefined, [])
            // formatting
            async.eachOf(rows, function (row, index, cb) {
                rows[index] = {
                    date: row.date,
                    action_id: 'purchase_item',
                    action_type: 'remove',
                    action_message: 'Buy ' + row.item_name,
                    sold: '-' + row.price.toString()
                }
                cb()
            }, function () {
                return next(undefined, rows)
            })
        })
    },

    getMoneyPurchases: function (id, next) {
        result = []

        db.get(currentDB).query("SELECT `money` AS `added_points`, `amount` AS `amount`, `transaction_type` AS `type`, `created_at` AS `date` " +
            "FROM `shop_credit_histories` WHERE `user_id` = ?", [id], function (err, rows, fields) {
            if (err)
                return next(err)
            if (rows === undefined || rows.length === 0)
                return next(undefined, [])
            // formatting
            async.eachOf(rows, function (row, index, callback) {
                rows[index] = {
                    date: row.date,
                    action_id: 'purchase_money_' + row.type.toLowerCase(),
                    action_type: 'add',
                    action_message: 'Pay ' + row.amount + '€ with ' + row.type,
                    sold: '+' + row.added_points.toString()
                }
                callback()
            }, function () {
                if (err)
                    return next(err)
                next(undefined, result)
            })
        })
    },

    getMoneyTransfers: function (id, next) {
        db.get(currentDB).query("SELECT `users_transfer_money_histories`.`created_at` AS `date`, `users_transfer_money_histories`.`amount` AS `how`, `users`.`username` AS `to` " +
            "FROM `users_transfer_money_histories` " +
            "INNER JOIN `users` ON `users`.`id` = `users_transfer_money_histories`.`to` " +
            "WHERE `users_transfer_money_histories`.`user_id` = ?", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows.length === 0) return next(undefined, [])
            // formatting
            async.eachOf(rows, function (row, index, cb) {
                rows[index] = {
                    date: row.date,
                    action_id: 'transfer',
                    action_type: 'remove',
                    action_message: 'Send ' + row.how.toString() + ' to ' + row.to,
                    sold: '-' + row.how.toString()
                }
                cb()
            }, function () {
                return next(undefined, rows)
            })
        })
    },

    getMoneyTransfersFromOthers: function (id, next) {
        db.get(currentDB).query("SELECT `users_transfer_money_histories`.`created_at` AS `date`, `users_transfer_money_histories`.`amount` AS `how`, `users`.`username` AS `from` " +
            "FROM `users_transfer_money_histories` " +
            "INNER JOIN `users` ON `users`.`id` = `users_transfer_money_histories`.`user_id` " +
            "WHERE `users_transfer_money_histories`.`to` = ?", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows.length === 0) return next(undefined, [])
            // formatting
            async.eachOf(rows, function (row, index, cb) {
                rows[index] = {
                    date: row.date,
                    action_id: 'transfer',
                    action_type: 'add',
                    action_message: 'Receive ' + row.how.toString() + ' from ' + row.from,
                    sold: '+' + row.how.toString()
                }
                cb()
            }, function () {
                return next(undefined, rows)
            })
        })
    },

    getYoutubeRemunerations: function (id, next) {
        db.get(currentDB).query("SELECT `users_youtube_channel_videos`.`title` AS `title`, `users_youtube_channel_video_remuneration_histories`.`remuneration` AS `remuneration`, `users_youtube_channel_video_remuneration_histories`.`created_at` AS `date`" +
            "FROM `users_youtube_channel_video_remuneration_histories` " +
            "INNER JOIN `users_youtube_channel_videos` ON `users_youtube_channel_video_remuneration_histories`.`video_id` = `users_youtube_channel_videos`.`id` " +
            "INNER JOIN `users_youtube_channels` ON `users_youtube_channel_videos`.`channel_id` = `users_youtube_channels`.`id` " +
            "WHERE `users_youtube_channels`.`user_id` = ?", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows.length === 0) return next(undefined, [])
            // formatting
            async.eachOf(rows, function (row, index, cb) {
                rows[index] = {
                    date: row.date,
                    action_id: 'youtube_remuneration',
                    action_type: 'add',
                    action_message: 'Receive ' + row.remuneration.toString() + ' for "' + row.title + '"',
                    sold: '+' + row.remuneration.toString()
                }
                cb()
            }, function () {
                return next(undefined, rows)
            })
        })
    }
}
