var init = require('../init.js')
var app = init.app
var chai = init.chai
var expect = chai.expect
var async = require('async')

// UserController
describe('UserController', function () {
  // hooks
  before('Create databases', function (next) { // add database
    async.parallel([
      // web_v5
      function (cb) {
        connection.query(
          "CREATE DATABASE IF NOT EXISTS `web_v5` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;"
        , function (err) {
          if (err) return cb(err)

          async.parallel([
            // create `web_v5`.`obsi__email_update_histories`
            function (callback) {
              connection.query(
                "USE `web_v5`;" +
                "CREATE TABLE IF NOT EXISTS `obsi__email_update_histories` (" +
                "  `id` int(11) NOT NULL AUTO_INCREMENT," +
                "  `user_id` int(11) NOT NULL," +
                "  `old_email` varchar(50) NOT NULL," +
                "  `new_email` varchar(50) NOT NULL," +
                "  `confirmed_by` int(11) NOT NULL," +
                "  `created` datetime NOT NULL," +
                "  PRIMARY KEY (`id`)" +
                ") ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;"
              , callback)
            },
            // create `web_v5`.`obsi__pseudo_update_histories`
            function (callback) {
              connection.query(
                "USE `web_v5`;" +
                "CREATE TABLE IF NOT EXISTS `obsi__pseudo_update_histories` (" +
                "  `id` int(11) NOT NULL AUTO_INCREMENT," +
                "  `user_id` int(11) NOT NULL," +
                "  `old_pseudo` varchar(16) NOT NULL," +
                "  `new_pseudo` varchar(16) NOT NULL," +
                "  `created` datetime NOT NULL," +
                "  PRIMARY KEY (`id`)" +
                ") ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;"
              , callback)
            },
            // create `web_v5`.`obsivote__votes`
            function (callback) {
              connection.query(
                "USE `web_v5`;" +
                "CREATE TABLE IF NOT EXISTS `obsivote__votes` (" +
                "  `id` int(20) NOT NULL AUTO_INCREMENT," +
                "  `user_id` int(20) NOT NULL," +
                "  `ip` varchar(16) NOT NULL," +
                "  `created` datetime NOT NULL," +
                "  PRIMARY KEY (`id`)" +
                ") ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;"
              , callback)
            },
            // create `web_v5`.`users`
            function (callback) {
              connection.query(
                "USE `web_v5`;" +
                "CREATE TABLE IF NOT EXISTS `users` (" +
                "  `id` int(20) NOT NULL AUTO_INCREMENT," +
                "  `pseudo` varchar(255) NOT NULL," +
                "  `password` varchar(255) NOT NULL," +
                "  `email` varchar(255) NOT NULL," +
                "  `rank` int(1) NOT NULL," +
                "  `money` varchar(20) NOT NULL DEFAULT '0'," +
                "  `vote` int(3) NOT NULL DEFAULT '0'," +
                "  `ip` varchar(255) NOT NULL," +
                "  `allowed_ip` text," +
                "  `skin` int(1) NOT NULL DEFAULT '0'," +
                "  `cape` int(1) NOT NULL DEFAULT '0'," +
                "  `created` datetime NOT NULL," +
                "  `rewards_waited` int(11) DEFAULT NULL," +
                "  `confirmed` varchar(25) DEFAULT NULL," +
                "  `obsi-skin_uploaded` int(1) NOT NULL DEFAULT '0'," +
                "  `obsi-cape_uploaded` int(1) NOT NULL DEFAULT '0'," +
                "  `obsi-number_phone` varchar(12) DEFAULT NULL," +
                "  `obsi-obsiguard_enabled` int(1) NOT NULL DEFAULT '0'," +
                "  `obsi-obsiguard_code` varchar(10) DEFAULT NULL," +
                "  `obsi-obsiguard_manage_key` varchar(10) DEFAULT NULL," +
                "  `obsi-can_update_pseudo` int(1) NOT NULL DEFAULT '0'," +
                "  `obsivote-kit_to_get` int(1) NOT NULL DEFAULT '0'," +
                "  PRIMARY KEY (`id`)" +
                ") ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;"
              , callback)
            }
          ], cb)
        })
      },
      // logblock - MC_BIGBROTHER
      function (cb) {
        connection.query(
          "CREATE DATABASE IF NOT EXISTS `MC_BIGBROTHER` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;"
        , function (err) {
          if (err) return cb(err)

          async.parallel([
            // create `MC_BIGBROTHER`.`lb-FACTION`
            function (callback) {
              connection.query(
                "USE `MC_BIGBROTHER`;" +
                "CREATE TABLE IF NOT EXISTS `lb-FACTION` (" +
                "`id` int(10) unsigned NOT NULL," +
                "  `date` datetime NOT NULL," +
                "  `playerid` int(10) unsigned NOT NULL," +
                "  `replaced` tinyint(3) unsigned NOT NULL," +
                "  `type` tinyint(3) unsigned NOT NULL," +
                "  `data` tinyint(3) unsigned NOT NULL," +
                "  `x` mediumint(9) NOT NULL," +
                "  `y` smallint(5) unsigned NOT NULL," +
                "  `z` mediumint(9) NOT NULL" +
                ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;"
              , callback)
            },
            // create `MC_BIGBROTHER`.`lb-players`
            function (callback) {
              connection.query(
                "USE `MC_BIGBROTHER`;" +
                "CREATE TABLE IF NOT EXISTS `lb-players` (" +
                "`playerid` int(10) unsigned NOT NULL," +
                "  `UUID` varchar(36) NOT NULL," +
                "  `playername` varchar(32) NOT NULL," +
                "  `firstlogin` datetime NOT NULL," +
                "  `lastlogin` datetime NOT NULL," +
                "  `onlinetime` int(10) unsigned NOT NULL," +
                "  `ip` varchar(255) NOT NULL" +
                ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;"
              , callback)
            }
          ], cb)
        })
      },
      // launcherlogs - V4_utils
      function (cb) {
        connection.query(
          "CREATE DATABASE IF NOT EXISTS `V4_utils` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;"
        , function (err) {
          if (err) return cb(err)

          async.parallel([
            // create `V4_utils`.`loginlogs`
            function (callback) {
              connection.query(
                "USE `V4_utils`;" +
                "CREATE TABLE IF NOT EXISTS `loginlogs` (" +
                "  `id` int(11) NOT NULL AUTO_INCREMENT," +
                "  `ip` varchar(64) NOT NULL," +
                "  `mac_adress` varchar(30) DEFAULT NULL," +
                "  `username` varchar(255) NOT NULL," +
                "  `type` varchar(64) NOT NULL," +
                "  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
                "  PRIMARY KEY (`id`)" +
                ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;"
              , callback)
            }
          ], cb)
        })
      },
      // auth - V4_launcher
      function (cb) {
        connection.query(
          "CREATE DATABASE IF NOT EXISTS `V4_launcher` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;"
        , function (err) {
          if (err) return cb(err)

          async.parallel([
            // create `V4_launcher`.`joueurs`
            function (callback) {
              connection.query(
                "USE `V4_launcher`;" +
                "CREATE TABLE IF NOT EXISTS `joueurs` (" +
                "  `user_id` int(11) NOT NULL AUTO_INCREMENT," +
                "  `profileid` varchar(255) NOT NULL," +
                "  `user_pseudo` varchar(18) NOT NULL," +
                "  `user_mdp` varchar(64) NOT NULL," +
                "  `access_token` varchar(128) NOT NULL," +
                "  `authorised_ip` text," +
                "  `dynamic_ip` int(1) NOT NULL DEFAULT '0'," +
                "  `has_connected_v5` int(1) NOT NULL DEFAULT '0'," +
                "  `is_register_v5` int(1) NOT NULL DEFAULT '0'," +
                "  `mac_adress` varchar(25) DEFAULT NULL," +
                "  PRIMARY KEY (`user_id`)," +
                "  UNIQUE KEY `user_pseudo` (`user_pseudo`)" +
                ") ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;"
              , callback)
            }
          ], cb)
        })
      }
    ], function (err) {
      if (err) {
        console.error(err)
        process.exit()
      }
      next()
    })
  })
  beforeEach('Truncate and add data into databases', function (next) { // truncate tables
    async.parallel([
      // truncate `web_v5`.`obsi__email_update_histories`
      function (callback) {
        connection.query('TRUNCATE web_v5.obsi__email_update_histories;', callback)
      },
      // truncate `web_v5`.`obsi__pseudo_update_histories`
      function (callback) {
        connection.query('TRUNCATE web_v5.obsi__pseudo_update_histories;', callback)
      },
      // truncate `web_v5`.`obsivote__votes`
      function (callback) {
        connection.query('TRUNCATE web_v5.obsivote__votes;', callback)
      },
      // truncate `web_v5`.`users`
      function (callback) {
        connection.query('TRUNCATE web_v5.users;', callback)
      },
      // truncate `MC_BIGBROTHER`.`lb-FACTION`
      function (callback) {
        connection.query('TRUNCATE `MC_BIGBROTHER`.`lb-FACTION`;', callback)
      },
      // truncate ` `MC_BIGBROTHER`.`lb-players`
      function (callback) {
        connection.query('TRUNCATE  `MC_BIGBROTHER`.`lb-players`;', callback)
      },
      // truncate `V4_utils`.`loginlogs`
      function (callback) {
        connection.query('TRUNCATE `V4_utils`.`loginlogs`;', callback)
      },
      // truncate `V4_launcher`.`joueurs`
      function (callback) {
        connection.query('TRUNCATE `V4_launcher`.`joueurs`;', callback)
      }
    ], function (err) {
      if (err) {
        console.error(err)
        process.exit()
      }
      // add data
      async.parallel([
        // add user to web Tests@motdepasse
        function (callback) {
          connection.query(
            "INSERT INTO `web_v5`.`users` (`id`, `pseudo`, `password`, `email`, `rank`, `money`, `vote`, `ip`, `allowed_ip`, `skin`, `cape`, `created`, `rewards_waited`, `confirmed`, `obsi-skin_uploaded`, `obsi-cape_uploaded`, `obsi-number_phone`, `obsi-obsiguard_enabled`, `obsi-obsiguard_code`, `obsi-obsiguard_manage_key`, `obsi-can_update_pseudo`, `obsivote-kit_to_get`)" +
            "VALUES" +
	          "(1, 'Tests', '7d916f71f0e1172159eb211b5eaeb12c4477d91d', 'tests@eywek.fr', 0, '10', 5, '127.0.0.1', NULL, 1, 0, '2016-12-09 16:45:00', NULL, NULL, 0, 0, NULL, 0, NULL, NULL, 0, 0);",
            callback
          )
        },
        // add user to auth Tests@motdepasse
        function (callback) {
          connection.query(
            "INSERT INTO `V4_launcher`.`joueurs` (`user_id`, `profileid`, `user_pseudo`, `user_mdp`, `access_token`, `authorised_ip`, `dynamic_ip`, `has_connected_v5`, `is_register_v5`, `mac_adress`) VALUES" +
            "(2, '54fcfc84-1c98-4706-a98e-ae1e201b6402', 'Tests', '7d916f71f0e1172159eb211b5eaeb12c4477d91d', '', NULL, 0, 0, 0, NULL);",
            callback
          )
        }
      ], function (err) {
        if (err) {
          console.error(err)
          process.exit()
        }
        next()
      })
    })
  })
  after('Drop `obsiapiv6` database', function (next) { // drop database
    return next()
    connection.query(
      'DROP DATABASE IF EXISTS `web_v5`;' +
      'DROP DATABASE IF EXISTS `V4_launcher`;' +
      'DROP DATABASE IF EXISTS `V4_utils`;' +
      'DROP DATABASE IF EXISTS `MC_BIGBROTHER`;'
    ,
    function (err) {
      if (err) {
        console.error(err)
        process.exit()
      }

      next()
    })
  })
  // GET /user/:username - AuthController.get()
  describe('GET /user/:username', function () {
    describe('without username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user/').end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Method not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with unknown user', function () {
      it('should return 403 code', function (done) {
        chai.request(app).get('/user/fakeuser')
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('User not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with user has never log on server', function () {
      it('should return 200 code + user\'s data', function (done) {
        chai.request(app).get('/user/Tests')
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res).to.have.status(200)
          // data
          expect(res.body.data).to.be.object
          expect(res.body.data).to.be.not.empty
          expect(res.body.data.ids).to.be.object
          expect(res.body.data.ids.web).to.equal(1)
          expect(res.body.data.ids.auth).to.equal(2)
          expect(res.body.data.ids.logblock).to.equal(-1)
          expect(res.body.data.usernames.histories).to.be.empty
          expect(res.body.data.usernames.current).to.equal('Tests')
          expect(res.body.data.uuid).to.equal('54fcfc84-1c98-4706-a98e-ae1e201b6402')
          expect(res.body.data.registerDate).to.equal((new Date('2016-12-09 16:45:00')).toJSON())
          expect(res.body.data.lastConnection).to.be.undefined
          expect(res.body.data.adresses.mac).to.be.empty
          expect(res.body.data.adresses.ip).to.be.empty
          done()
        })
      })
    })
    describe('with user with username history', function () {
      it('should return 200 code + user\'s data', function (done) {
        // add username history
        connection.query("INSERT INTO `web_v5`.`obsi__pseudo_update_histories` (`id`, `user_id`, `old_pseudo`, `new_pseudo`, `created`) VALUES" +
        "(1, 1, 'Test1', 'Tests', '2016-04-05 16:37:56');", function (err) {
          if (err) {
            console.error(err)
            return process.exit()
          }
          chai.request(app).get('/user/Tests')
          .end(function (err, res) {
            expect(res.body.status).to.equal(true)
            expect(res).to.have.status(200)
            // data
            expect(res.body.data).to.be.object
            expect(res.body.data).to.be.not.empty
            expect(res.body.data.ids).to.be.object
            expect(res.body.data.ids.web).to.equal(1)
            expect(res.body.data.ids.auth).to.equal(2)
            expect(res.body.data.ids.logblock).to.equal(-1)
            expect(res.body.data.usernames.histories).to.be.not.empty
            expect(res.body.data.usernames.histories[0]).to.be.object
            expect(res.body.data.usernames.histories[0].id).to.be.equal(1)
            expect(res.body.data.usernames.histories[0].new_username).to.be.equal('Tests')
            expect(res.body.data.usernames.histories[0].old_username).to.be.equal('Test1')
            expect(res.body.data.usernames.histories[0].update_date).to.be.equal((new Date('2016-04-05 16:37:56')).toJSON())
            expect(res.body.data.usernames.histories[0].user_id).to.be.equal(1)
            expect(res.body.data.usernames.current).to.equal('Tests')
            expect(res.body.data.uuid).to.equal('54fcfc84-1c98-4706-a98e-ae1e201b6402')
            expect(res.body.data.registerDate).to.equal((new Date('2016-12-09 16:45:00')).toJSON())
            expect(res.body.data.lastConnection).to.be.undefined
            expect(res.body.data.adresses.mac).to.be.empty
            expect(res.body.data.adresses.ip).to.be.empty
            done()
          })
        })
      })
    })
    describe('with old username', function () {
      it('should return 200 code + user\'s data', function (done) {
        // add username history
        connection.query("INSERT INTO `web_v5`.`obsi__pseudo_update_histories` (`id`, `user_id`, `old_pseudo`, `new_pseudo`, `created`) VALUES" +
        "(1, 1, 'Test1', 'Tests', '2016-04-05 16:37:56');", function (err) {
          if (err) {
            console.error(err)
            return process.exit()
          }
          chai.request(app).get('/user/Test1')
          .end(function (err, res) {
            expect(res.body.status).to.equal(true)
            expect(res).to.have.status(200)
            // data
            expect(res.body.data).to.be.object
            expect(res.body.data).to.be.not.empty
            expect(res.body.data.ids).to.be.object
            expect(res.body.data.ids.web).to.equal(1)
            expect(res.body.data.ids.auth).to.equal(2)
            expect(res.body.data.ids.logblock).to.equal(-1)
            expect(res.body.data.usernames.histories).to.be.not.empty
            expect(res.body.data.usernames.histories[0]).to.be.object
            expect(res.body.data.usernames.histories[0].id).to.be.equal(1)
            expect(res.body.data.usernames.histories[0].new_username).to.be.equal('Tests')
            expect(res.body.data.usernames.histories[0].old_username).to.be.equal('Test1')
            expect(res.body.data.usernames.histories[0].update_date).to.be.equal((new Date('2016-04-05 16:37:56')).toJSON())
            expect(res.body.data.usernames.histories[0].user_id).to.be.equal(1)
            expect(res.body.data.usernames.current).to.equal('Tests')
            expect(res.body.data.uuid).to.equal('54fcfc84-1c98-4706-a98e-ae1e201b6402')
            expect(res.body.data.registerDate).to.equal((new Date('2016-12-09 16:45:00')).toJSON())
            expect(res.body.data.lastConnection).to.be.undefined
            expect(res.body.data.adresses.mac).to.be.empty
            expect(res.body.data.adresses.ip).to.be.empty
            done()
          })
        })
      })
    })
    describe('with user with mac adress history', function () { // TODO
      it('should return 200 code + user\'s data')
    })
  })
  describe('GET /user/from/uuid/:uuid', function () {
    describe('without username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user/from/uuid//').end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Method not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with unknown user', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user/from/uuid/fakeuser')
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('User not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with valid uuid', function () {
      it('should return 200 code', function (done) {
        chai.request(app).get('/user/from/uuid/54fcfc84-1c98-4706-a98e-ae1e201b6402')
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.be.not.empty
          expect(res.body.data.username).to.equal('Tests')
          expect(res).to.have.status(200)
          done()
        })
      })
    })
  })
  describe('POST /user/authenticate', function () {
    describe('without any params', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/user/authenticate')
        .send({})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without username', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/user/authenticate')
        .send({password: 'pass'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without password', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/user/authenticate')
        .send({username: 'user'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with unknown user', function () {
      it('should return 404 code', function (done) {
        chai.request(app).post('/user/authenticate')
        .send({username: 'false', password: 'false'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('User not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with invalid credentials', function () {
      it('should return 403 code', function (done) {
        chai.request(app).post('/user/authenticate')
        .send({username: 'Tests', password: 'false'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal("Invalid user's credentials.")
          expect(res).to.have.status(403)
          done()
        })
      })
    })
    describe('with valid credentials', function () {
      it('should return 200 code + user\'s id', function (done) {
        chai.request(app).post('/user/authenticate')
        .send({username: 'Tests', password: 'motdepasse'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.not.empty
          expect(res.body.data).to.be.object
          expect(res.body.data.user).to.be.object
          expect(res.body.data.user).to.be.not.null
          expect(res.body.data.user).to.be.object
          expect(res.body.data.user.id).to.be.equal(1)
          expect(res).to.have.status(200)
          done()
        })
      })
    })
  })
  describe('GET /user/:username/vote/can', function () {
    describe('without username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user//vote/can').end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Method not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('unknown user', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user/fake/vote/can').end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('User not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('user never vote', function () {
      it('should return 200 code + status = true', function (done) {
        // add config
        connection.query('CREATE TABLE IF NOT EXISTS `web_v5`.`obsivote__configurations` (' +
          '`id` int(20) NOT NULL AUTO_INCREMENT,' +
          '`rewards_type` int(1) NOT NULL DEFAULT \'0\',' +
          '`rewards` text NOT NULL,' +
          '`time_vote` int(3) NOT NULL,' +
          '`vote_url` varchar(150) NOT NULL,' +
          '`out_url` varchar(150) NOT NULL,' +
          '`server_id` int(11) NOT NULL,' +
          'PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2;' +
        'TRUNCATE `web_v5`.`obsivote__configurations`;' +
        'INSERT INTO `web_v5`.`obsivote__configurations` (`id`, `rewards_type`, `rewards`, `time_vote`, `vote_url`, `out_url`, `server_id`) VALUES' +
        "(1, 0, 'rewards', 180, 'vote_page', 'out_page', 2);"
        , function (err) {
          if (err) {
            console.error(err)
            return process.exit()
          }

          chai.request(app).get('/user/Tests/vote/can').end(function (err, res) {
            expect(res.body.status).to.equal(true)
            expect(res.body.success).to.equal("User hasn't vote yet!")
            expect(res).to.have.status(200)
            connection.query('DROP TABLE `web_v5`.`obsivote__configurations`;', done)
          })
        })
      })
    })
    describe('no config', function () {
      it('should return 200 code + status = true', function (done) {
        chai.request(app).get('/user/Tests/vote/can').end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal("User hasn't vote yet!")
          expect(res).to.have.status(200)
          done()
        })
      })
    })
    describe('user has voted but can now', function () {
      it('should return 200 code + status = true', function (done) {
        // add config
        connection.query('CREATE TABLE IF NOT EXISTS `web_v5`.`obsivote__configurations` (' +
          '`id` int(20) NOT NULL AUTO_INCREMENT,' +
          '`rewards_type` int(1) NOT NULL DEFAULT \'0\',' +
          '`rewards` text NOT NULL,' +
          '`time_vote` int(3) NOT NULL,' +
          '`vote_url` varchar(150) NOT NULL,' +
          '`out_url` varchar(150) NOT NULL,' +
          '`server_id` int(11) NOT NULL,' +
          'PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2;' +
        'TRUNCATE `web_v5`.`obsivote__configurations`;' +
        'INSERT INTO `web_v5`.`obsivote__configurations` (`id`, `rewards_type`, `rewards`, `time_vote`, `vote_url`, `out_url`, `server_id`) VALUES' +
        "(1, 0, 'rewards', 180, 'vote_page', 'out_page', 2);" +
        'TRUNCATE `web_v5`.`obsivote__votes`;' +
        'INSERT INTO `web_v5`.`obsivote__votes` (`id`, `user_id`, `ip`, `created`) VALUES' +
        "(1, 1, '127.0.0.1', '2016-01-01 00:00:00');"
        , function (err) {
          if (err) {
            console.error(err)
            return process.exit()
          }

          chai.request(app).get('/user/Tests/vote/can').end(function (err, res) {
            expect(res.body.status).to.equal(true)
            expect(res.body.success).to.equal("User can vote!")
            expect(res).to.have.status(200)
            connection.query('DROP TABLE `web_v5`.`obsivote__configurations`;', done)
          })
        })
      })
    })
    describe('user has voted', function () {
      it('should return 200 code + status = false', function (done) {
        // add config
        connection.query('CREATE TABLE IF NOT EXISTS `web_v5`.`obsivote__configurations` (' +
          '`id` int(20) NOT NULL AUTO_INCREMENT,' +
          '`rewards_type` int(1) NOT NULL DEFAULT \'0\',' +
          '`rewards` text NOT NULL,' +
          '`time_vote` int(3) NOT NULL,' +
          '`vote_url` varchar(150) NOT NULL,' +
          '`out_url` varchar(150) NOT NULL,' +
          '`server_id` int(11) NOT NULL,' +
          'PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2;' +
        'TRUNCATE `web_v5`.`obsivote__configurations`;' +
        'INSERT INTO `web_v5`.`obsivote__configurations` (`id`, `rewards_type`, `rewards`, `time_vote`, `vote_url`, `out_url`, `server_id`) VALUES' +
        "(1, 0, 'rewards', 180, 'vote_page', 'out_page', 2);" +
        'TRUNCATE `web_v5`.`obsivote__votes`;' +
        'INSERT INTO `web_v5`.`obsivote__votes` (`id`, `user_id`, `ip`, `created`) VALUES' +
        "(1, 1, '127.0.0.1', '" + new Date() + "');"
        , function (err) {
          if (err) {
            console.error(err)
            return process.exit()
          }

          chai.request(app).get('/user/Tests/vote/can').end(function (err, res) {
            expect(res.body.status).to.equal(false)
            expect(res.body.success).to.equal("User can't vote!")
            expect(res).to.have.status(200)
            connection.query('DROP TABLE `web_v5`.`obsivote__configurations`;', done)
          })
        })
      })
    })
  })
})
