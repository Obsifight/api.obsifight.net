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
            web: -1,
            logblock: -1,
            uuid: null
        }

        // web
        if (username == parseInt(username)) { // is an id
            db.get(currentDB).query("SELECT `uuid`, `id` FROM users WHERE `id` = ? LIMIT 1", [username], function (err, rows) {
                if (err) return next(err)
                result.web = rows[0].i
                queries(rows[0].uuid)
            })
        } else {
            checkIfNotAndOldUsername(username)
        }

        function checkIfNotAndOldUsername(username) {
            // find if username wasn't an old username
            db.get(currentDB).query("SELECT `user_id` FROM `users_edit_username_histories` WHERE `old_username` = ? LIMIT 1", [username], function (err, rows, fields) {
                if (err) return next(err)
                if (rows === undefined || rows.length === 0)
                    return queries(username)

                // old username, so get new username with this id
                db.get(currentDB).query("SELECT `uuid`, `id` FROM users WHERE `id` = ? LIMIT 1", [rows[0].user_id], function (err, rows, fields) {
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
        db.get(currentDB).query("SELECT `id` AS `id`, `pseudo` AS `username`, `email` AS `email`, `money` AS `money`, `ip` AS `register_ip`, `skin` AS `has_purchased_skin`, `cape` AS `has_purchased_cape`, `created` AS `register_date`, `obsi-skin_uploaded` AS `skin_uploaded`, `obsi-cape_uploaded` AS `cape_uploaded`, `obsi-obsiguard_enabled` AS `obsiguard_enabled` FROM `users` WHERE `id` = ? LIMIT 1", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows[0] === undefined) return next(new Error('User not found'))
            return next(undefined, rows[0])
        })
    },

    getUsernameUpdateLogs: function (id, next) {
        db.get(currentDB).query("SELECT `id` AS `id`, `user_id` AS `user_id`, `old_pseudo` AS `old_username`, `new_pseudo` AS `new_username`, `created` AS `update_date` FROM `obsi__pseudo_update_histories` WHERE `user_id` = ?", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows.length === 0) return next(undefined, [])
            return next(undefined, rows)
        })
    },

    getRefunds: function (id, next) {
        db.get(currentDB).query("SELECT `added_money` AS `added_money` FROM `obsi__refund_histories` WHERE `user_id` = ?", [id], function (err, rows, fields) {
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
        db.get(currentDB).query("SELECT `shop__items_buy_histories`.`created` AS `date`, `shop__items`.`price` AS `price`, `shop__items`.`name` AS `item_name` FROM `shop__items_buy_histories` INNER JOIN `users` ON `users`.`id` = `shop__items_buy_histories`.`user_id` INNER JOIN `shop__items` ON `shop__items`.`id` = `shop__items_buy_histories`.`item_id` WHERE `shop__items_buy_histories`.`user_id` = ?", [id], function (err, rows, fields) {
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
        async.parallel([
            // paypal
            function (cb) {
                db.get(currentDB).query("SELECT `credits_gived` AS `added_points`, `created` AS `date` FROM `shop__paypal_histories` WHERE `user_id` = ?", [id], function (err, rows, fields) {
                    if (err) return cb(err)
                    if (rows === undefined || rows.length === 0) return cb(undefined, [])
                    // formatting
                    async.eachOf(rows, function (row, index, callback) {
                        rows[index] = {
                            date: row.date,
                            action_id: 'purchase_money_paypal',
                            action_type: 'add',
                            action_message: 'Pay with Paypal',
                            sold: '+' + row.added_points.toString()
                        }
                        callback()
                    }, function () {
                        return cb(undefined, rows)
                    })
                })
            },
            // paysafecard
            function (cb) {
                db.get(currentDB).query("SELECT `credits_gived` AS `added_points`, `created` AS `date` FROM `paysafecard__payment_histories` WHERE `user_id` = ?", [id], function (err, rows, fields) {
                    if (err) return cb(err)
                    if (rows === undefined || rows.length === 0) return cb(undefined, [])
                    // formatting
                    async.eachOf(rows, function (row, index, callback) {
                        rows[index] = {
                            date: row.date,
                            action_id: 'purchase_money_paysafecard',
                            action_type: 'add',
                            action_message: 'Pay with paysafecard',
                            sold: '+' + row.added_points.toString()
                        }
                        callback()
                    }, function () {
                        return cb(undefined, rows)
                    })
                })
            },
            // dedipass
            function (cb) {
                db.get(currentDB).query("SELECT `credits_gived` AS `added_points`, `created` AS `date` FROM `shop__dedipass_histories` WHERE `user_id` = ?", [id], function (err, rows, fields) {
                    if (err) return cb(err)
                    if (rows === undefined || rows.length === 0) return cb(undefined, [])
                    // formatting
                    async.eachOf(rows, function (row, index, callback) {
                        rows[index] = {
                            date: row.date,
                            action_id: 'purchase_money_dedipass',
                            action_type: 'add',
                            action_message: 'Pay with Dédipass',
                            sold: '+' + row.added_points.toString()
                        }
                        callback()
                    }, function () {
                        return cb(undefined, rows)
                    })
                })
            },
            // stripe
            function (cb) {
                db.get(currentDB).query("SELECT `credits` AS `added_points`, `created` AS `date` FROM `shopplus__stripe_histories` WHERE `user_id` = ?", [id], function (err, rows, fields) {
                    if (err) return cb(err)
                    if (rows === undefined || rows.length === 0) return cb(undefined, [])
                    // formatting
                    async.eachOf(rows, function (row, index, callback) {
                        rows[index] = {
                            date: row.date,
                            action_id: 'purchase_money_stripe',
                            action_type: 'add',
                            action_message: 'Pay with Stripe',
                            sold: '+' + row.added_points.toString()
                        }
                        callback()
                    }, function () {
                        return cb(undefined, rows)
                    })
                })
            }
        ], function (err, results) {
            if (err) return next(err)
            next(undefined, [].concat(results[0], results[1], results[2], results[3]))
        })
    },

    getMoneyTransfers: function (id, next) {
        db.get(currentDB).query("SELECT `shop__points_transfer_histories`.`created` AS `date`, `shop__points_transfer_histories`.`points` AS `how`, `users`.`pseudo` AS `to` FROM `shop__points_transfer_histories` INNER JOIN `users` ON `users`.`id` = `shop__points_transfer_histories`.`user_id` WHERE `shop__points_transfer_histories`.`author_id` = ?", [id], function (err, rows, fields) {
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
        db.get(currentDB).query("SELECT `shop__points_transfer_histories`.`created` AS `date`, `shop__points_transfer_histories`.`points` AS `how`, `users`.`pseudo` AS `from` FROM `shop__points_transfer_histories` INNER JOIN `users` ON `users`.`id` = `shop__points_transfer_histories`.`author_id` WHERE `shop__points_transfer_histories`.`user_id` = ?", [id], function (err, rows, fields) {
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
        db.get(currentDB).query("SELECT `obsi__youtube_videos_remuneration_histories`.`title` AS `title`, `obsi__youtube_videos_remuneration_histories`.`remuneration` AS `remuneration`, `obsi__youtube_videos_remuneration_histories`.`created` AS `date` FROM `obsi__youtube_videos_remuneration_histories` INNER JOIN `obsi__youtube_channels` ON `obsi__youtube_videos_remuneration_histories`.`channel_id` = `obsi__youtube_channels`.`youtube_channel_id` WHERE `obsi__youtube_channels`.`user_id` = ?", [id], function (err, rows, fields) {
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
    },

    getMarketPurchases: function (id, next) {
        db.get(currentDB).query("SELECT `playermarket__purchase_histories`.`price` AS `price`,`playermarket__purchase_histories`.`created` AS `date`, `users`.`pseudo` AS `seller_username` FROM `playermarket__purchase_histories` INNER JOIN `users` ON `users`.`id` = `playermarket__purchase_histories`.`seller_id` WHERE `user_id` = ?", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows.length === 0) return next(undefined, [])
            // formatting
            async.eachOf(rows, function (row, index, cb) {
                rows[index] = {
                    date: row.date,
                    action_id: 'webmarket',
                    action_type: 'remove',
                    action_message: 'Purchase from ' + row.seller_username + ' for ' + row.price.toString(),
                    sold: '-' + row.price.toString()
                }
                cb()
            }, function () {
                return next(undefined, rows)
            })
        })
    },

    getMarketSales: function (id, next) {
        db.get(currentDB).query("SELECT  `playermarket__purchase_histories`.`price` AS  `price` ,  `playermarket__purchase_histories`.`created` AS  `date` ,  `users`.`pseudo` AS  `buyer_username` FROM  `playermarket__purchase_histories` INNER JOIN  `users` ON  `users`.`id` =  `playermarket__purchase_histories`.`user_id` WHERE  `seller_id` = ?", [id], function (err, rows, fields) {
            if (err) return next(err)
            if (rows === undefined || rows.length === 0) return next(undefined, [])
            // formatting
            async.eachOf(rows, function (row, index, cb) {
                rows[index] = {
                    date: row.date,
                    action_id: 'webmarket',
                    action_type: 'add',
                    action_message: 'Sale for ' + row.price.toString() + ' to ' + row.buyer_username,
                    sold: '+' + row.price.toString()
                }
                cb()
            }, function () {
                return next(undefined, rows)
            })
        })
    }

}
