var Twitter = require("node-twitter-api")
var twitter = new Twitter({
  consumerKey: 'LsiwYVnryExcsR1xWA274MArL',
  consumerSecret: 'g3IJh1SOhOLOnGr4hKJWbuVo80jJfNwI2woLKiyLURgqOzlWmF',
  callback: config.host + '/socials/twitter/authorization/response'
})
var crypto = require('crypto')

module.exports = {

  requestAuthorization: function (req, res) {
    // check request
    if (!req.query || !req.query.userId || req.query.userId.length <= 0 || !req.query.callback || req.query.callback.length <= 0 || !req.query.authKey || req.query.authKey.length <= 0)
      return res.status(400).json({status: false, error: 'Invalid request.'})
    // check authencity of user id
    db.get('web_v6').query('SELECT password FROM users WHERE id = ? LIMIT 1', [req.query.userId], function (err, row, fields) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error when check auth key.'})
      }
      if (!row || row.length === 0)
        return res.status(404).json({status: false, error: 'Unknown user.'})
      if (crypto.createHash('sha256').update(row[0].password).digest('hex') !== req.query.authKey)
        return res.status(403).json({status: false, error: 'Invalid auth key.'})

      // handle connect
      twitter.getRequestToken(function(err, requestToken, requestSecret) {
        if (err) {
          console.error(err)
          res.status(500).json({status: false, error: 'Internal error on request authorization with Twitter.'})
        }
        else {
          // store into session user's id with him requestSecret and callback
          req.session.twitter = {
            userId: req.query.userId,
            requestSecret: requestSecret,
            callback: req.query.callback
          }
          req.session.save()
          // redirect user
          res.redirect('https://api.twitter.com/oauth/authenticate?oauth_token=' + requestToken)
        }
      })
    })
  },

  requestResponse: function (req, res) {
    // check request
    if (!req.query || !req.query.oauth_token || req.query.oauth_token.length <= 0 || !req.query.oauth_verifier || req.query.oauth_verifier.length <= 0)
      return res.status(400).json({status: false, error: 'Invalid request.'})
    // setup
    var requestToken = req.query.oauth_token
    var verifier = req.query.oauth_verifier
    // check session
    if (!req.session || !req.session.twitter || Object.keys(req.session.twitter).length !== 3)
      return res.status(400).json({status: false, error: 'Invalid session.'})
    var requestSecret = req.session.twitter.requestSecret
    var userId = req.session.twitter.userId
    var callback = req.session.twitter.callback

    // get access token
    twitter.getAccessToken(requestToken, requestSecret, verifier, function(err, accessToken, accessSecret) {
      if (err) {
        console.error(err)
        res.status(500).json({status: false, error: 'Internal error on response authorization with Twitter.'})
      } else {
        // try to log user
        twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
          if (err) {
            console.error(err)
            res.status(500).json({status: false, error: 'Internal error on check credentials with Twitter.'})
          } else {
            // save twitter screen_name & id into database
            db.get('web_v6').query('SELECT id FROM obsi__users_twitters WHERE user_id = ?', [userId], function (err, row) {
              if (err)
                console.error(err)
              // delete if already link
              if (row.length > 0)
                db.get('web_v6').query('DELETE FROM obsi__users_twitters WHERE id = ?', [row[0].id], function (err) {
                  if (err)
                    console.error(err)
                })
              // add
              db.get('web_v6').query('INSERT INTO obsi__users_twitters SET user_id = ?, twitter_id = ?, screen_name = ?, created = ?', [userId, user.id, user.screen_name, (new Date())], function (err) {
                if (err)
                  console.error(err)
              })
            })
            // redirect to callback (stored in session) with informations
            res.redirect(callback + '?screen_name=' + user.screen_name + '&id=' + user.id)
          }
        })
      }
    })
	}

}
