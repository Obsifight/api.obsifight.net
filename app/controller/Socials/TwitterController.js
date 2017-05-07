var Twitter = require("node-twitter-api")
var twitter = new Twitter({
  consumerKey: 'LsiwYVnryExcsR1xWA274MArL',
  consumerSecret: 'g3IJh1SOhOLOnGr4hKJWbuVo80jJfNwI2woLKiyLURgqOzlWmF',
  callback: config.host + '/socials/twitter/authorization/response'
})
var TwitterClient = require('twitter')
var twitterClient = new TwitterClient({
  consumer_key: 'LsiwYVnryExcsR1xWA274MArL',
  consumer_secret: 'g3IJh1SOhOLOnGr4hKJWbuVo80jJfNwI2woLKiyLURgqOzlWmF',
  access_token_key: '2442975125-ieTYruT97SiD9J46VXuURGCrOaJpBFDawRXTvuT',
  access_token_secret: 'YH9ZdtG6dartapDqlWEQxqhqOlZdsuV12bYjbB4bBxVev'
})
var crypto = require('crypto')
var request = require('request')

module.exports = {

  requestAuthorization: function (req, res) {
    // check request
    if (!req.query || !req.query.userId || req.query.userId.length <= 0 || !req.query.callback || req.query.callback.length <= 0 || !req.query.notification || req.query.notification.length <= 0 || !req.query.authKey || req.query.authKey.length <= 0)
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
            callback: req.query.callback,
            notification: req.query.notification,
            authKey: req.query.authKey
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
    if (!req.session || !req.session.twitter || Object.keys(req.session.twitter).length !== 5)
      return res.status(400).json({status: false, error: 'Invalid session.'})
    var requestSecret = req.session.twitter.requestSecret
    var userId = req.session.twitter.userId
    var callback = req.session.twitter.callback
    var notification = req.session.twitter.notification
    var authKey = req.session.twitter.authKey

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
            // clear session
            req.session.twitter = {}
            // send notification
            request({
              method: 'POST',
              uri: notification,
              json: {
                accessToken: accessToken,
                accessSecret: accessSecret,
                user: user,
                userId: userId,
                authKey: authKey
              }
            },
            function (err, response, body) {
              if (err || response.statusCode !== 200)
                console.error(err || body)
            })
            // redirect to callback (stored in session) with informations
            res.redirect(callback + '?screen_name=' + user.screen_name + '&id=' + user.id)
          }
        })
      }
    })
	},

  getLikedTweets: function (req, res) {
    var count = 10
    if (req.query.count)
      count = req.query.count
    twitterClient.get('favorites/list', {count: count}, function(err, result, response) {
      if (err) {
        console.error(err)
        return res.status(500).json({status: false, error: 'Internal error.'})
      }
      // data
      var tweets = []
      for (var i = 0; i < result.length; i++) {
        tweets.push({
          id: result[i].id,
          text: result[i].text,
          retweet_count: result[i].retweet_count,
          retweeted: result[i].retweeted,
          created_at: result[i].created_at,
          user: {
            id: result[i].user.id,
            name: result[i].user.name,
            screen_name: result[i].user.screen_name,
            followers_count: result[i].followers_count
          }
        })
      }

      res.json({status: true, data: tweets})
    })
  }

}
