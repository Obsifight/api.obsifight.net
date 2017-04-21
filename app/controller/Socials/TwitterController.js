var Twitter = require("node-twitter-api")
var twitter = new Twitter({
    consumerKey: 'LsiwYVnryExcsR1xWA274MArL',
	consumerSecret: 'g3IJh1SOhOLOnGr4hKJWbuVo80jJfNwI2woLKiyLURgqOzlWmF',
	oauth_callback: config.host + '/socials/twitter/authorization/response'
})

module.exports = {

	requestAuthorization: function (req, res) {
		/*// check request
		if (!request.body || !request.body.userId || request.body.userId.length <= 0)
			return res.status(400).json({status: false, error: 'Invalid request.'})*/
		// handle connect
		twitter.getRequestToken(function(err, requestToken, requestSecret, d) {
			console.log(err, requestToken, requestSecret, d)

            if (err) {
            	console.error(err)
                res.status(500).json({status: false, error: 'Internal error on request authorization with Twitter.'})
            }
            else {
                res.redirect('https://api.twitter.com/oauth/authenticate?oauth_token=' + requestToken)
            }
        })
	},

	requestResponse: function (req, res) {
		var requestToken = req.query.oauth_token
      	var verifier = req.query.oauth_verifier

        twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
            if (err) {
                console.error(err)
                res.status(500).json({status: false, error: 'Internal error on response authorization with Twitter.'})
            } else {
                twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                    if (err) {
                    	console.error(err)
                		res.status(500).json({status: false, error: 'Internal error on check credentials with Twitter.'})
                    } else
                        res.send(user)
                })
            }
        })
	}

}