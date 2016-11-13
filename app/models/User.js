var async = require('async')

module.exports = {

  getIds: function (id) {
    var result = {
      web: 0,
      logblock: 0,
      auth: 0
    }
    if (id === undefined) return result

    async.parallel([
      // web
      function (callback) {
        db.get('web_v5').query('SELECT id FROM users WHERE id = `' + id + '` LIMIT 1', function (err, rows, fields) {
          if (err) return callback(err)
          callback(undefined, rows)
        })
      }
    ], function (err, results) {
      if (err) throw err
      if (results[0][0] === undefined) return false

      result.web = results[0][0].id
      return result
    })
  }

}
