var init = require('../init.js')
var app = init.app
var chai = init.chai
var expect = chai.expect
var async = require('async')

// SanctionController
describe('SanctionController', function () {
  // hooks
  before('Create databases', function (next) { // add database
    async.parallel([
      // sanction - ObsiFight_Admin
      function (cb) {
        connection.query(
          "CREATE DATABASE IF NOT EXISTS `ObsiFight_Admin` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;"
        , function (err) {
          if (err) return cb(err)

          async.parallel([
            // create `ObsiFight_Admin`.`BAT_ban`
            function (callback) {
              connection.query(
                'USE `ObsiFight_Admin`;' +
                'CREATE TABLE IF NOT EXISTS `BAT_ban` (' +
                '  `ban_id` int(11) NOT NULL AUTO_INCREMENT,' +
                '  `UUID` varchar(100) DEFAULT NULL,' +
                '  `ban_ip` varchar(50) DEFAULT NULL,' +
                '  `ban_staff` varchar(30) NOT NULL,' +
                '  `ban_reason` varchar(100) DEFAULT NULL,' +
                '  `ban_server` varchar(30) NOT NULL,' +
                '  `ban_begin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,' +
                '  `ban_end` timestamp NULL DEFAULT NULL,' +
                '  `ban_state` tinyint(1) NOT NULL DEFAULT \'1\',' +
                '  `ban_unbandate` timestamp NULL DEFAULT NULL,' +
                '  `ban_unbanstaff` varchar(30) DEFAULT NULL,' +
                '  `ban_unbanreason` varchar(100) DEFAULT NULL,' +
                '  PRIMARY KEY (`ban_id`),' +
                '  KEY `UUID` (`UUID`),' +
                '  KEY `ban_ip` (`ban_ip`)' +
                ') ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;'
              , callback)
            },
            // create `ObsiFight_Admin`.`BAT_kick`
            function (callback) {
              connection.query(
                'USE `ObsiFight_Admin`;' +
                'CREATE TABLE IF NOT EXISTS `BAT_kick` (' +
                '  `kick_id` int(11) NOT NULL AUTO_INCREMENT,' +
                '  `UUID` varchar(100) NOT NULL,' +
                '  `kick_staff` varchar(30) NOT NULL,' +
                '  `kick_reason` varchar(100) DEFAULT NULL,' +
                '  `kick_server` varchar(30) NOT NULL,' +
                '  `kick_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
                '  PRIMARY KEY (`kick_id`),' +
                '  KEY `UUID` (`UUID`)' +
                ') ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;'
              , callback)
            },
            // create `ObsiFight_Admin`.`BAT_mute`
            function (callback) {
              connection.query(
                'USE `ObsiFight_Admin`;' +
                'CREATE TABLE IF NOT EXISTS `BAT_mute` (' +
                '  `mute_id` int(11) NOT NULL AUTO_INCREMENT,' +
                '  `UUID` varchar(100) DEFAULT NULL,' +
                '  `mute_ip` varchar(50) DEFAULT NULL,' +
                '  `mute_staff` varchar(30) NOT NULL,' +
                '  `mute_reason` varchar(100) DEFAULT NULL,' +
                '  `mute_server` varchar(30) NOT NULL,' +
                '  `mute_begin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,' +
                '  `mute_end` timestamp NULL DEFAULT NULL,' +
                '  `mute_state` tinyint(1) NOT NULL DEFAULT \'1\',' +
                '  `mute_unmutedate` timestamp NULL DEFAULT NULL,' +
                '  `mute_unmutestaff` varchar(30) DEFAULT NULL,' +
                '  `mute_unmutereason` varchar(100) DEFAULT NULL,' +
                '  PRIMARY KEY (`mute_id`),' +
                '  KEY `UUID` (`UUID`),' +
                '  KEY `mute_ip` (`mute_ip`)' +
                ') ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15460 ;'
              , callback)
            },
            // create `ObsiFight_Admin`.`BAT_players`
            function (callback) {
              connection.query(
                'USE `ObsiFight_Admin`;' +
                'CREATE TABLE IF NOT EXISTS `BAT_players` (' +
                '  `BAT_player` varchar(30) NOT NULL,' +
                '  `UUID` varchar(100) NOT NULL,' +
                '  `lastip` varchar(50) NOT NULL,' +
                '  `firstlogin` timestamp NULL DEFAULT NULL,' +
                '  `lastlogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
                '  UNIQUE KEY `UUID` (`UUID`),' +
                '  KEY `BAT_player` (`BAT_player`)' +
                ') ENGINE=InnoDB DEFAULT CHARSET=utf8;'
              , callback)
            }
          ], cb)
        })
      },
      // obsiapiv6
      function (cb) {
        connection.query(
          "CREATE DATABASE IF NOT EXISTS `obsiapiv6` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;"
        , function (err) {
          if (err) return cb(err)

          async.parallel([
            // create `obsiapiv6`.`api`
            function (callback) {
              connection.query(
                'USE `obsiapiv6`;' +
                'CREATE TABLE IF NOT EXISTS `api_users` (' +
                '  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,' +
                '  `username` varchar(20) NOT NULL DEFAULT \'\',' +
                '  `password` varchar(50) NOT NULL DEFAULT \'\',' +
                '  `createdAt` datetime NOT NULL,' +
                '  `lastAccess` datetime DEFAULT NULL,' +
                '  PRIMARY KEY (`id`)' +
                ') ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;' +
                'INSERT INTO `api_users` (`id`, `username`, `password`, `createdAt`, `lastAccess`) VALUES' +
                "(1, 'ApiTest', 'motdepasse', '2016-11-21 19:39:00', '2016-12-12 18:33:52');"
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
      // truncate `ObsiFight_Admin`.`BAT_ban`
      function (callback) {
        connection.query('TRUNCATE ObsiFight_Admin.BAT_ban;', callback)
      },
      // truncate `ObsiFight_Admin`.`BAT_kick`
      function (callback) {
        connection.query('TRUNCATE ObsiFight_Admin.BAT_kick;', callback)
      },
      // truncate `ObsiFight_Admin`.`BAT_mute`
      function (callback) {
        connection.query('TRUNCATE ObsiFight_Admin.BAT_mute;', callback)
      },
      // truncate `ObsiFight_Admin`.`BAT_players`
      function (callback) {
        connection.query('TRUNCATE ObsiFight_Admin.BAT_players;', callback)
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
        // add user to BAT_players Tests
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_players` (`BAT_player`, `UUID`, `lastip`, `firstlogin`, `lastlogin`) VALUES" +
            "('Tests', '00009d4c8de84d2b877d759ef23df030', '127.0.0.1', '2016-05-07 21:32:18', '2016-09-12 11:54:24');",
            callback
          )
        },
        // add user to BAT_players White
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_players` (`BAT_player`, `UUID`, `lastip`, `firstlogin`, `lastlogin`) VALUES" +
            "('White', '10009d4c8de84d2b877d759ef23df030', '127.0.0.1', '2016-05-07 21:32:18', '2016-09-12 11:54:24');",
            callback
          )
        },
        // add user to auth Tests@motdepasse
        function (callback) {
          connection.query(
            "INSERT INTO `V4_launcher`.`joueurs` (`user_id`, `profileid`, `user_pseudo`, `user_mdp`, `access_token`, `authorised_ip`, `dynamic_ip`, `has_connected_v5`, `is_register_v5`, `mac_adress`) VALUES" +
            "(1, '00009d4c8de84d2b877d759ef23df030', 'Tests', '7d916f71f0e1172159eb211b5eaeb12c4477d91d', '', NULL, 0, 0, 0, NULL);",
            callback
          )
        },
        // add user to auth White@motdepasse
        function (callback) {
          connection.query(
            "INSERT INTO `V4_launcher`.`joueurs` (`user_id`, `profileid`, `user_pseudo`, `user_mdp`, `access_token`, `authorised_ip`, `dynamic_ip`, `has_connected_v5`, `is_register_v5`, `mac_adress`) VALUES" +
            "(2, '10009d4c8de84d2b877d759ef23df030', 'White', '7d916f71f0e1172159eb211b5eaeb12c4477d91d', '', NULL, 0, 0, 0, NULL);",
            callback
          )
        },
        // add 1 ban permanent not active
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_ban` (`ban_id`, `UUID`, `ban_ip`, `ban_staff`, `ban_reason`, `ban_server`, `ban_begin`, `ban_end`, `ban_state`, `ban_unbandate`, `ban_unbanstaff`, `ban_unbanreason`) VALUES" +
            "(1, '00009d4c8de84d2b877d759ef23df030', NULL, 'Suertzz', 'Ma raison', '(global)', '2016-03-08 03:56:45', NULL, 0, '2016-03-08 03:56:57', 'Suertzz', 'Ma raison de déban');",
            callback
          )
        },
        // add 1 ban permanent active
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_ban` (`ban_id`, `UUID`, `ban_ip`, `ban_staff`, `ban_reason`, `ban_server`, `ban_begin`, `ban_end`, `ban_state`, `ban_unbandate`, `ban_unbanstaff`, `ban_unbanreason`) VALUES" +
            "(2, '00009d4c8de84d2b877d759ef23df030', NULL, 'Suertzz', 'Ma raison', '(global)', '2016-03-08 03:56:45', NULL, 1, NULL, NULL, NULL);",
            callback
          )
        },
        // add 1 ban not permanent not active
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_ban` (`ban_id`, `UUID`, `ban_ip`, `ban_staff`, `ban_reason`, `ban_server`, `ban_begin`, `ban_end`, `ban_state`, `ban_unbandate`, `ban_unbanstaff`, `ban_unbanreason`) VALUES" +
            "(3, '00009d4c8de84d2b877d759ef23df030', NULL, 'Suertzz', 'Ma raison', '(global)', '2016-03-08 03:56:45', '2016-03-08 03:56:57', 0, '2016-03-08 03:57:57', 'Suertzz', 'Ma raison de déban');",
            callback
          )
        },
        // add 1 ban not permanent active
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_ban` (`ban_id`, `UUID`, `ban_ip`, `ban_staff`, `ban_reason`, `ban_server`, `ban_begin`, `ban_end`, `ban_state`, `ban_unbandate`, `ban_unbanstaff`, `ban_unbanreason`) VALUES" +
            "(4, '00009d4c8de84d2b877d759ef23df030', NULL, 'Suertzz', 'Ma raison', '(global)', '2016-03-08 03:56:45', '2030-03-08 03:56:45', 1, NULL, NULL, NULL);",
            callback
          )
        },
        // add 1 ban permanent not active
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_mute` (`mute_id`, `UUID`, `mute_ip`, `mute_staff`, `mute_reason`, `mute_server`, `mute_begin`, `mute_end`, `mute_state`, `mute_unmutedate`, `mute_unmutestaff`, `mute_unmutereason`) VALUES" +
            "(1, '00009d4c8de84d2b877d759ef23df030', NULL, 'Suertzz', 'Ma raison', '(global)', '2016-03-08 03:56:45', NULL, 0, '2016-03-08 03:56:57', 'Suertzz', 'Ma raison de déban');",
            callback
          )
        },
        // add 1 ban permanent active
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_mute` (`mute_id`, `UUID`, `mute_ip`, `mute_staff`, `mute_reason`, `mute_server`, `mute_begin`, `mute_end`, `mute_state`, `mute_unmutedate`, `mute_unmutestaff`, `mute_unmutereason`) VALUES" +
            "(2, '00009d4c8de84d2b877d759ef23df030', NULL, 'Suertzz', 'Ma raison', '(global)', '2016-03-08 03:56:45', NULL, 1, NULL, NULL, NULL);",
            callback
          )
        },
        // add 1 ban not permanent not active
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_mute` (`mute_id`, `UUID`, `mute_ip`, `mute_staff`, `mute_reason`, `mute_server`, `mute_begin`, `mute_end`, `mute_state`, `mute_unmutedate`, `mute_unmutestaff`, `mute_unmutereason`) VALUES" +
            "(3, '00009d4c8de84d2b877d759ef23df030', NULL, 'Suertzz', 'Ma raison', '(global)', '2016-03-08 03:56:45', '2016-03-08 03:56:57', 0, '2016-03-08 03:57:57', 'Suertzz', 'Ma raison de déban');",
            callback
          )
        },
        // add 1 ban not permanent active
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_mute` (`mute_id`, `UUID`, `mute_ip`, `mute_staff`, `mute_reason`, `mute_server`, `mute_begin`, `mute_end`, `mute_state`, `mute_unmutedate`, `mute_unmutestaff`, `mute_unmutereason`) VALUES" +
            "(4, '00009d4c8de84d2b877d759ef23df030', NULL, 'Suertzz', 'Ma raison', '(global)', '2016-03-08 03:56:45', '2030-03-08 03:56:45', 1, NULL, NULL, NULL);",
            callback
          )
        },
        // add 1 kick
        function (callback) {
          connection.query(
            "INSERT INTO `ObsiFight_Admin`.`BAT_kick` (`kick_id`, `UUID`, `kick_staff`, `kick_reason`, `kick_server`, `kick_date`) VALUES" +
            "(1, '00009d4c8de84d2b877d759ef23df030', 'roumi1996', 'raison du kick', '(global)', '2016-03-26 15:31:51');"
          , callback)
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
  after('Drop databases', function (next) { // drop database
    return next()
    connection.query(
      'DROP DATABASE IF EXISTS `ObsiFight_Admin`;',
      'DROP DATABASE IF EXISTS `obsiapiv6`;'
    ,
    function (err) {
      if (err) {
        console.error(err)
        process.exit()
      }

      next()
    })
  })

  describe('GET /sanction/bans', function () {
    describe('without limit', function () {
      it('should return 200 code with all bans', function (done) {
        chai.request(app).get('/sanction/bans')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.not.be.empty
          expect(res.body.data.bans).to.be.object
          expect(res.body.data.bans).to.not.be.empty
          expect(res.body.data.bans).to.be.object
          expect(res.body.data.bans.length).to.be.equal(4)

          // 4th ban
          expect(res.body.data.bans[0].id).to.be.equal(4)
          expect(res.body.data.bans[0].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[0].server).to.be.equal('(global)')
          expect(res.body.data.bans[0].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[0].user).to.be.object
          expect(res.body.data.bans[0].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[0].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[0].staff).to.be.object
          expect(res.body.data.bans[0].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[0].end_date).to.be.equal((new Date('2030-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[0].state).to.be.equal(1)
          expect(res.body.data.bans[0].duration).to.be.equal(441763200)
          expect(res.body.data.bans[0].remove_date).to.be.null
          expect(res.body.data.bans[0].remove_staff).to.be.null
          expect(res.body.data.bans[0].remove_reason).to.be.null

          // 3rd ban
          expect(res.body.data.bans[1].id).to.be.equal(3)
          expect(res.body.data.bans[1].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[1].server).to.be.equal('(global)')
          expect(res.body.data.bans[1].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[1].user).to.be.object
          expect(res.body.data.bans[1].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[1].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[1].staff).to.be.object
          expect(res.body.data.bans[1].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[1].end_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.bans[1].state).to.be.equal(0)
          expect(res.body.data.bans[1].duration).to.be.equal(12)
          expect(res.body.data.bans[1].remove_date).to.be.equal((new Date('2016-03-08 03:57:57')).toJSON())
          expect(res.body.data.bans[1].remove_staff).to.be.object
          expect(res.body.data.bans[1].remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[1].remove_reason).to.be.equal('Ma raison de déban')

          // 2nd ban
          expect(res.body.data.bans[2].id).to.be.equal(2)
          expect(res.body.data.bans[2].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[2].server).to.be.equal('(global)')
          expect(res.body.data.bans[2].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[2].user).to.be.object
          expect(res.body.data.bans[2].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[2].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[2].staff).to.be.object
          expect(res.body.data.bans[2].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[2].end_date).to.be.null
          expect(res.body.data.bans[2].state).to.be.equal(1)
          expect(res.body.data.bans[2].duration).to.be.equal('PERMANENT')
          expect(res.body.data.bans[2].remove_date).to.be.null
          expect(res.body.data.bans[2].remove_staff).to.be.null
          expect(res.body.data.bans[2].remove_reason).to.be.null

          // 1st ban
          expect(res.body.data.bans[3].id).to.be.equal(1)
          expect(res.body.data.bans[3].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[3].server).to.be.equal('(global)')
          expect(res.body.data.bans[3].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[3].user).to.be.object
          expect(res.body.data.bans[3].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[3].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[3].staff).to.be.object
          expect(res.body.data.bans[3].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[3].end_date).to.be.null
          expect(res.body.data.bans[3].state).to.be.equal(0)
          expect(res.body.data.bans[3].duration).to.be.equal('PERMANENT')
          expect(res.body.data.bans[3].remove_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.bans[3].remove_staff).to.be.object
          expect(res.body.data.bans[3].remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[3].remove_reason).to.be.equal('Ma raison de déban')

          done()
        })
      })
    })
    describe('with limit', function () {
      it('should return 200 code with 2 last bans', function (done) {
        chai.request(app).get('/sanction/bans?limit=2')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.not.be.empty
          expect(res.body.data.bans).to.be.object
          expect(res.body.data.bans).to.not.be.empty
          expect(res.body.data.bans).to.be.object
          expect(res.body.data.bans.length).to.be.equal(2)

          // 4th ban
          expect(res.body.data.bans[0].id).to.be.equal(4)
          expect(res.body.data.bans[0].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[0].server).to.be.equal('(global)')
          expect(res.body.data.bans[0].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[0].user).to.be.object
          expect(res.body.data.bans[0].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[0].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[0].staff).to.be.object
          expect(res.body.data.bans[0].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[0].end_date).to.be.equal((new Date('2030-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[0].state).to.be.equal(1)
          expect(res.body.data.bans[0].duration).to.be.equal(441763200)
          expect(res.body.data.bans[0].remove_date).to.be.null
          expect(res.body.data.bans[0].remove_staff).to.be.null
          expect(res.body.data.bans[0].remove_reason).to.be.null

          // 3rd ban
          expect(res.body.data.bans[1].id).to.be.equal(3)
          expect(res.body.data.bans[1].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[1].server).to.be.equal('(global)')
          expect(res.body.data.bans[1].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[1].user).to.be.object
          expect(res.body.data.bans[1].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[1].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[1].staff).to.be.object
          expect(res.body.data.bans[1].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[1].end_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.bans[1].state).to.be.equal(0)
          expect(res.body.data.bans[1].duration).to.be.equal(12)
          expect(res.body.data.bans[1].remove_date).to.be.equal((new Date('2016-03-08 03:57:57')).toJSON())
          expect(res.body.data.bans[1].remove_staff).to.be.object
          expect(res.body.data.bans[1].remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[1].remove_reason).to.be.equal('Ma raison de déban')

          done()
        })
      })
    })
  })

  describe('GET /sanction/bans/:id', function () {
    describe('with invalid id', function () {
      it('should return 400 code', function (done) {
        chai.request(app).get('/sanction/bans/invalid_id')
        .end(function (err, res) {
          expect(res).to.have.status(400)
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.be.equal('Missing ban\'s id or invalid id.')

          done()
        })
      })
    })
    describe('with unknown id', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/sanction/bans/10')
        .end(function (err, res) {
          expect(res).to.have.status(404)
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.be.equal('Ban not found.')

          done()
        })
      })
    })
    describe('with valid id', function () {
      it('should return 200 code + ban data', function (done) {
        chai.request(app).get('/sanction/bans/3')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.not.be.empty
          expect(res.body.data.ban).to.be.object
          expect(res.body.data.ban).to.not.be.empty
          expect(res.body.data.ban).to.be.object

          // 3rd ban
          expect(res.body.data.ban.id).to.be.equal(3)
          expect(res.body.data.ban.reason).to.be.equal('Ma raison')
          expect(res.body.data.ban.server).to.be.equal('(global)')
          expect(res.body.data.ban.date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.ban.staff).to.be.object
          expect(res.body.data.ban.staff.username).to.be.equal('Suertzz')
          expect(res.body.data.ban.end_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.ban.state).to.be.equal(0)
          expect(res.body.data.ban.duration).to.be.equal(12)
          expect(res.body.data.ban.remove_date).to.be.equal((new Date('2016-03-08 03:57:57')).toJSON())
          expect(res.body.data.ban.remove_staff).to.be.object
          expect(res.body.data.ban.remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.ban.remove_reason).to.be.equal('Ma raison de déban')

          done()
        })
      })
    })
  })

  describe('POST /sanction/bans', function () {
    describe('without reason', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({type: 'user', server: '(global)', user: {username: 'yolo'}})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `reason`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without type', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({reason: 'Ma raison', server: '(global)', user: {username: 'yolo'}})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `type`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with invalid type', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({reason: 'Ma raison', server: '(global)', type: 'invalid', user: {username: 'yolo'}})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `type` or invalid.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without server', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({type: 'user', reason: 'Ma raison', user: {username: 'yolo'}})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `server`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without user params', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({type: 'user', server: '(global)', reason: 'Ma raison'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `user.uuid` or `user.username`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without ip params with type = ip', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({type: 'ip', server: '(global)', reason: 'Ma raison'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `ip`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with unknown uuid', function () {
      it('should return 404 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({type: 'user', server: '(global)', reason: 'Ma raison', user: {uuid: 'invalid'}})
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
        chai.request(app).post('/sanction/bans')
        .send({
          type: 'user',
          server: '(global)',
          reason: 'Ma raison de ban',
          user: {
            uuid: '00009d4c8de84d2b877d759ef23df030'
          }
        })
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal('Ban has been successfuly added!')
          expect(res).to.have.status(200)

          // check in db
          connection.query('SELECT * FROM `ObsiFight_Admin`.`BAT_ban` WHERE ban_id=5', function (err, rows, fields) {
            if (err) {
              console.error(err)
              return process.exit()
            }

            expect(rows).to.be.not.undefined
            expect(rows).to.be.object
            expect(rows.length).to.be.equal(1)
            expect(rows[0]).to.be.object
            expect(rows[0].ban_id).to.be.equal(5)
            expect(rows[0].UUID).to.be.equal('00009d4c8de84d2b877d759ef23df030')
            expect(rows[0].ban_ip).to.be.null
            expect(rows[0].ban_reason).to.be.equal('Ma raison de ban')
            expect(rows[0].ban_server).to.be.equal('(global)')
            expect((new Date(rows[0].ban_begin)).getTime()).to.be.closeTo((new Date()).getTime(), 2000) // 2 seconds
            expect(rows[0].ban_end).to.be.null
            expect(rows[0].ban_staff).to.be.equal('ApiTest')
            expect(rows[0].ban_state).to.be.equal(1)
            expect(rows[0].ban_unbandate).to.be.null
            expect(rows[0].ban_unbanreason).to.be.null
            expect(rows[0].ban_unbanstaff).to.be.null

            done()
          })
        })
      })
    })
    describe('with unknown username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({type: 'user', server: '(global)', reason: 'Ma raison', user: {username: 'invalid'}})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('User not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with valid username', function () {
      it('should return 200 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({
          type: 'user',
          server: '(global)',
          reason: 'Ma raison de ban',
          user: {
            username: 'Tests'
          }
        })
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal('Ban has been successfuly added!')
          expect(res).to.have.status(200)

          // check in db
          connection.query('SELECT * FROM `ObsiFight_Admin`.`BAT_ban` WHERE ban_id=5', function (err, rows, fields) {
            if (err) {
              console.error(err)
              return process.exit()
            }

            expect(rows).to.be.not.undefined
            expect(rows).to.be.object
            expect(rows.length).to.be.equal(1)
            expect(rows[0]).to.be.object
            expect(rows[0].ban_id).to.be.equal(5)
            expect(rows[0].UUID).to.be.equal('00009d4c8de84d2b877d759ef23df030')
            expect(rows[0].ban_ip).to.be.null
            expect(rows[0].ban_reason).to.be.equal('Ma raison de ban')
            expect(rows[0].ban_server).to.be.equal('(global)')
            expect((new Date(rows[0].ban_begin)).getTime()).to.be.closeTo((new Date()).getTime(), 2000) // 2 seconds
            expect(rows[0].ban_end).to.be.null
            expect(rows[0].ban_staff).to.be.equal('ApiTest')
            expect(rows[0].ban_state).to.be.equal(1)
            expect(rows[0].ban_unbandate).to.be.null
            expect(rows[0].ban_unbanreason).to.be.null
            expect(rows[0].ban_unbanstaff).to.be.null

            done()
          })
        })
      })
    })
    describe('with invalid end date', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({type: 'user', server: '(global)', reason: 'Ma raison', user: {username: 'Tests'}, end_date: 'invalid'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Invalid ban\'s `end_date`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with valid end date', function () {
      it('should return 200 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({
          type: 'user',
          server: '(global)',
          reason: 'Ma raison de ban',
          user: {
            uuid: '00009d4c8de84d2b877d759ef23df030'
          },
          end_date: '2020-01-01 00:00:00'
        })
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal('Ban has been successfuly added!')
          expect(res).to.have.status(200)

          // check in db
          connection.query('SELECT * FROM `ObsiFight_Admin`.`BAT_ban` WHERE ban_id=5', function (err, rows, fields) {
            if (err) {
              console.error(err)
              return process.exit()
            }

            expect(rows).to.be.not.undefined
            expect(rows).to.be.object
            expect(rows.length).to.be.equal(1)
            expect(rows[0]).to.be.object
            expect(rows[0].ban_id).to.be.equal(5)
            expect(rows[0].UUID).to.be.equal('00009d4c8de84d2b877d759ef23df030')
            expect(rows[0].ban_ip).to.be.null
            expect(rows[0].ban_reason).to.be.equal('Ma raison de ban')
            expect(rows[0].ban_server).to.be.equal('(global)')
            expect((new Date(rows[0].ban_begin)).getTime()).to.be.closeTo((new Date()).getTime(), 2000) // 2 seconds
            expect((new Date(rows[0].ban_end)).getTime()).to.be.equal((new Date('2020-01-01 00:00:00')).getTime())
            expect(rows[0].ban_staff).to.be.equal('ApiTest')
            expect(rows[0].ban_state).to.be.equal(1)
            expect(rows[0].ban_unbandate).to.be.null
            expect(rows[0].ban_unbanreason).to.be.null
            expect(rows[0].ban_unbanstaff).to.be.null

            done()
          })
        })
      })
    })
  })

  describe('PUT /sanction/bans/id', function () {
    describe('without id', function () {
      it('should return 404 code', function (done) {
        chai.request(app).put('/sanction/bans')
        .send({})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Method not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with invalid id', function () {
      it('should return 400 code', function (done) {
        chai.request(app).put('/sanction/bans/invalid')
        .send({})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing ban\'s id or invalid id.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without reason and without end_date', function () {
      it('should return 400 code', function (done) {
        chai.request(app).put('/sanction/bans/2')
        .send({})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing ban\'s `end_date` or `remove_reason`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with invalid end_date', function () {
      it('should return 400 code', function (done) {
        chai.request(app).put('/sanction/bans/2')
        .send({end_date: 'invalid'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Invalid ban\'s `end_date`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with end_date inferior at now', function () {
      it('should return 400 code', function (done) {
        chai.request(app).put('/sanction/bans/2')
        .send({end_date: '2015-01-01 00:00:00'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Invalid ban\'s `end_date`. You\'ve try to set `end_date` inferior or equal of now.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with unknown id', function () {
      it('should return 404 code', function (done) {
        chai.request(app).put('/sanction/bans/20')
        .send({end_date: '2020-01-01 00:00:00'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Ban not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with ban already expired', function () {
      it('should return 404 code', function (done) {
        chai.request(app).put('/sanction/bans/1')
        .send({end_date: '2020-01-01 00:00:00'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Ban already expired.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with end_date', function () {
      it('should return 200 code', function (done) {
        chai.request(app).put('/sanction/bans/2')
        .send({end_date: '2020-01-01 00:00:00'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal('Ban has been successfuly edited!')
          expect(res).to.have.status(200)

          // check in db
          connection.query('SELECT * FROM `ObsiFight_Admin`.`BAT_ban` WHERE ban_id=2', function (err, rows, fields) {
            if (err) {
              console.error(err)
              return process.exit()
            }

            expect(rows).to.be.not.undefined
            expect(rows).to.be.object
            expect(rows.length).to.be.equal(1)
            expect(rows[0]).to.be.object
            expect(rows[0].ban_id).to.be.equal(2)
            expect(rows[0].UUID).to.be.equal('00009d4c8de84d2b877d759ef23df030')
            expect(rows[0].ban_reason).to.be.equal('Ma raison')
            expect(rows[0].ban_server).to.be.equal('(global)')
            expect((new Date(rows[0].ban_begin)).getTime()).to.be.equal((new Date('2016-03-08 03:56:45')).getTime())
            expect(rows[0].ban_staff).to.be.equal('Suertzz')
            expect((new Date(rows[0].ban_end)).getTime()).to.be.equal((new Date('2020-01-01 00:00:00')).getTime())
            expect(rows[0].ban_state).to.be.equal(1)
            expect(rows[0].ban_unbandate).to.be.null
            expect(rows[0].ban_unbanstaff).to.be.null
            expect(rows[0].ban_unbanreason).to.be.null

            done()
          })
        })
      })
    })
    describe('with reason', function () {
      it('should return 200 code', function (done) {
        chai.request(app).put('/sanction/bans/2')
        .send({remove_reason: 'Ma raison de déban'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal('Ban has been successfuly edited!')
          expect(res).to.have.status(200)

          // check in db
          connection.query('SELECT * FROM `ObsiFight_Admin`.`BAT_ban` WHERE ban_id=2', function (err, rows, fields) {
            if (err) {
              console.error(err)
              return process.exit()
            }

            expect(rows).to.be.not.undefined
            expect(rows).to.be.object
            expect(rows.length).to.be.equal(1)
            expect(rows[0]).to.be.object
            expect(rows[0].ban_id).to.be.equal(2)
            expect(rows[0].UUID).to.be.equal('00009d4c8de84d2b877d759ef23df030')
            expect(rows[0].ban_reason).to.be.equal('Ma raison')
            expect(rows[0].ban_server).to.be.equal('(global)')
            expect((new Date(rows[0].ban_begin)).getTime()).to.be.equal((new Date('2016-03-08 03:56:45')).getTime())
            expect(rows[0].ban_staff).to.be.equal('Suertzz')
            expect(rows[0].ban_end).to.be.null
            expect(rows[0].ban_state).to.be.equal(0)
            expect((new Date(rows[0].ban_unbandate)).getTime()).to.be.closeTo((new Date()).getTime(), 2000) // 2 seconds
            expect(rows[0].ban_unbanstaff).to.be.equal('ApiTest')
            expect(rows[0].ban_unbanreason).to.be.equal('Ma raison de déban')

            done()
          })
        })
      })
    })
  })

  describe('GET /sanction/mutes', function () {
    describe('without limit', function () {
      it('should return 200 code with all mutes', function (done) {
        chai.request(app).get('/sanction/mutes')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.not.be.empty
          expect(res.body.data.mutes).to.be.object
          expect(res.body.data.mutes).to.not.be.empty
          expect(res.body.data.mutes).to.be.object
          expect(res.body.data.mutes.length).to.be.equal(4)

          // 4th mute
          expect(res.body.data.mutes[0].id).to.be.equal(4)
          expect(res.body.data.mutes[0].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[0].server).to.be.equal('(global)')
          expect(res.body.data.mutes[0].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[0].user).to.be.object
          expect(res.body.data.mutes[0].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[0].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[0].staff).to.be.object
          expect(res.body.data.mutes[0].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[0].end_date).to.be.equal((new Date('2030-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[0].state).to.be.equal(1)
          expect(res.body.data.mutes[0].duration).to.be.equal(441763200)
          expect(res.body.data.mutes[0].remove_date).to.be.null
          expect(res.body.data.mutes[0].remove_staff).to.be.null
          expect(res.body.data.mutes[0].remove_reason).to.be.null

          // 3rd mute
          expect(res.body.data.mutes[1].id).to.be.equal(3)
          expect(res.body.data.mutes[1].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[1].server).to.be.equal('(global)')
          expect(res.body.data.mutes[1].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[1].user).to.be.object
          expect(res.body.data.mutes[1].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[1].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[1].staff).to.be.object
          expect(res.body.data.mutes[1].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[1].end_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.mutes[1].state).to.be.equal(0)
          expect(res.body.data.mutes[1].duration).to.be.equal(12)
          expect(res.body.data.mutes[1].remove_date).to.be.equal((new Date('2016-03-08 03:57:57')).toJSON())
          expect(res.body.data.mutes[1].remove_staff).to.be.object
          expect(res.body.data.mutes[1].remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[1].remove_reason).to.be.equal('Ma raison de déban')

          // 2nd mute
          expect(res.body.data.mutes[2].id).to.be.equal(2)
          expect(res.body.data.mutes[2].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[2].server).to.be.equal('(global)')
          expect(res.body.data.mutes[2].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[2].user).to.be.object
          expect(res.body.data.mutes[2].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[2].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[2].staff).to.be.object
          expect(res.body.data.mutes[2].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[2].end_date).to.be.null
          expect(res.body.data.mutes[2].state).to.be.equal(1)
          expect(res.body.data.mutes[2].duration).to.be.equal('PERMANENT')
          expect(res.body.data.mutes[2].remove_date).to.be.null
          expect(res.body.data.mutes[2].remove_staff).to.be.null
          expect(res.body.data.mutes[2].remove_reason).to.be.null

          // 1st mute
          expect(res.body.data.mutes[3].id).to.be.equal(1)
          expect(res.body.data.mutes[3].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[3].server).to.be.equal('(global)')
          expect(res.body.data.mutes[3].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[3].user).to.be.object
          expect(res.body.data.mutes[3].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[3].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[3].staff).to.be.object
          expect(res.body.data.mutes[3].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[3].end_date).to.be.null
          expect(res.body.data.mutes[3].state).to.be.equal(0)
          expect(res.body.data.mutes[3].duration).to.be.equal('PERMANENT')
          expect(res.body.data.mutes[3].remove_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.mutes[3].remove_staff).to.be.object
          expect(res.body.data.mutes[3].remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[3].remove_reason).to.be.equal('Ma raison de déban')

          done()
        })
      })
    })
    describe('with limit', function () {
      it('should return 200 code with 2 last mutes', function (done) {
        chai.request(app).get('/sanction/mutes?limit=2')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.not.be.empty
          expect(res.body.data.mutes).to.be.object
          expect(res.body.data.mutes).to.not.be.empty
          expect(res.body.data.mutes).to.be.object
          expect(res.body.data.mutes.length).to.be.equal(2)

          // 4th mute
          expect(res.body.data.mutes[0].id).to.be.equal(4)
          expect(res.body.data.mutes[0].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[0].server).to.be.equal('(global)')
          expect(res.body.data.mutes[0].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[0].user).to.be.object
          expect(res.body.data.mutes[0].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[0].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[0].staff).to.be.object
          expect(res.body.data.mutes[0].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[0].end_date).to.be.equal((new Date('2030-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[0].state).to.be.equal(1)
          expect(res.body.data.mutes[0].duration).to.be.equal(441763200)
          expect(res.body.data.mutes[0].remove_date).to.be.null
          expect(res.body.data.mutes[0].remove_staff).to.be.null
          expect(res.body.data.mutes[0].remove_reason).to.be.null

          // 3rd mute
          expect(res.body.data.mutes[1].id).to.be.equal(3)
          expect(res.body.data.mutes[1].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[1].server).to.be.equal('(global)')
          expect(res.body.data.mutes[1].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[1].user).to.be.object
          expect(res.body.data.mutes[1].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[1].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[1].staff).to.be.object
          expect(res.body.data.mutes[1].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[1].end_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.mutes[1].state).to.be.equal(0)
          expect(res.body.data.mutes[1].duration).to.be.equal(12)
          expect(res.body.data.mutes[1].remove_date).to.be.equal((new Date('2016-03-08 03:57:57')).toJSON())
          expect(res.body.data.mutes[1].remove_staff).to.be.object
          expect(res.body.data.mutes[1].remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[1].remove_reason).to.be.equal('Ma raison de déban')

          done()
        })
      })
    })
  })

  describe('GET /sanction/mutes/:id', function () {
    describe('with invalid id', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/sanction/mutes/invalid_id')
        .end(function (err, res) {
          expect(res).to.have.status(400)
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.be.equal('Missing mute\'s id or invalid id.')

          done()
        })
      })
    })
    describe('with unknown id', function () {
      it('should return 400 code', function (done) {
        chai.request(app).get('/sanction/mutes/10')
        .end(function (err, res) {
          expect(res).to.have.status(404)
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.be.equal('Mute not found.')

          done()
        })
      })
    })
    describe('with valid id', function () {
      it('should return 200 code + mute data', function (done) {
        chai.request(app).get('/sanction/mutes/3')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.not.be.empty
          expect(res.body.data.mute).to.be.object
          expect(res.body.data.mute).to.not.be.empty
          expect(res.body.data.mute).to.be.object

          // 3rd ban
          expect(res.body.data.mute.id).to.be.equal(3)
          expect(res.body.data.mute.reason).to.be.equal('Ma raison')
          expect(res.body.data.mute.server).to.be.equal('(global)')
          expect(res.body.data.mute.date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mute.staff).to.be.object
          expect(res.body.data.mute.staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mute.end_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.mute.state).to.be.equal(0)
          expect(res.body.data.mute.duration).to.be.equal(12)
          expect(res.body.data.mute.remove_date).to.be.equal((new Date('2016-03-08 03:57:57')).toJSON())
          expect(res.body.data.mute.remove_staff).to.be.object
          expect(res.body.data.mute.remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mute.remove_reason).to.be.equal('Ma raison de déban')

          done()
        })
      })
    })
  })

  describe('POST /sanction/mutes', function () {
    describe('without reason', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/mutes')
        .send({type: 'user', server: '(global)', user: {username: 'yolo'}})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `reason`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without type', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/mutes')
        .send({reason: 'Ma raison', server: '(global)', user: {username: 'yolo'}})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `type`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with invalid type', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/mutes')
        .send({reason: 'Ma raison', server: '(global)', type: 'invalid', user: {username: 'yolo'}})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `type` or invalid.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without server', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/mutes')
        .send({type: 'user', reason: 'Ma raison', user: {username: 'yolo'}})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `server`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without user params', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/mutes')
        .send({type: 'user', server: '(global)', reason: 'Ma raison'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `user.uuid` or `user.username`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without ip params with type = ip', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/mutes')
        .send({type: 'ip', server: '(global)', reason: 'Ma raison'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing params `ip`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with unknown uuid', function () {
      it('should return 404 code', function (done) {
        chai.request(app).post('/sanction/mutes')
        .send({type: 'user', server: '(global)', reason: 'Ma raison', user: {uuid: 'invalid'}})
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
        chai.request(app).post('/sanction/mutes')
        .send({
          type: 'user',
          server: '(global)',
          reason: 'Ma raison de mute',
          user: {
            uuid: '00009d4c8de84d2b877d759ef23df030'
          }
        })
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal('Mute has been successfuly added!')
          expect(res).to.have.status(200)

          // check in db
          connection.query('SELECT * FROM `ObsiFight_Admin`.`BAT_mute` WHERE mute_id=5', function (err, rows, fields) {
            if (err) {
              console.error(err)
              return process.exit()
            }

            expect(rows).to.be.not.undefined
            expect(rows).to.be.object
            expect(rows.length).to.be.equal(1)
            expect(rows[0]).to.be.object
            expect(rows[0].mute_id).to.be.equal(5)
            expect(rows[0].UUID).to.be.equal('00009d4c8de84d2b877d759ef23df030')
            expect(rows[0].mute_ip).to.be.null
            expect(rows[0].mute_reason).to.be.equal('Ma raison de mute')
            expect(rows[0].mute_server).to.be.equal('(global)')
            expect((new Date(rows[0].mute_begin)).getTime()).to.be.closeTo((new Date()).getTime(), 2000) // 2 seconds
            expect(rows[0].mute_end).to.be.null
            expect(rows[0].mute_staff).to.be.equal('ApiTest')
            expect(rows[0].mute_state).to.be.equal(1)
            expect(rows[0].mute_unmutedate).to.be.null
            expect(rows[0].mute_unmutereason).to.be.null
            expect(rows[0].mute_unmutestaff).to.be.null

            done()
          })
        })
      })
    })
    describe('with unknown username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).post('/sanction/mutes')
        .send({type: 'user', server: '(global)', reason: 'Ma raison', user: {username: 'invalid'}})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('User not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with valid username', function () {
      it('should return 200 code', function (done) {
        chai.request(app).post('/sanction/mutes')
        .send({
          type: 'user',
          server: '(global)',
          reason: 'Ma raison de mute',
          user: {
            username: 'Tests'
          }
        })
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal('Mute has been successfuly added!')
          expect(res).to.have.status(200)

          // check in db
          connection.query('SELECT * FROM `ObsiFight_Admin`.`BAT_mute` WHERE mute_id=5', function (err, rows, fields) {
            if (err) {
              console.error(err)
              return process.exit()
            }

            expect(rows).to.be.not.undefined
            expect(rows).to.be.object
            expect(rows.length).to.be.equal(1)
            expect(rows[0]).to.be.object
            expect(rows[0].mute_id).to.be.equal(5)
            expect(rows[0].UUID).to.be.equal('00009d4c8de84d2b877d759ef23df030')
            expect(rows[0].mute_ip).to.be.null
            expect(rows[0].mute_reason).to.be.equal('Ma raison de mute')
            expect(rows[0].mute_server).to.be.equal('(global)')
            expect((new Date(rows[0].mute_begin)).getTime()).to.be.closeTo((new Date()).getTime(), 2000) // 2 seconds
            expect(rows[0].mute_end).to.be.null
            expect(rows[0].mute_staff).to.be.equal('ApiTest')
            expect(rows[0].mute_state).to.be.equal(1)
            expect(rows[0].mute_unmutedate).to.be.null
            expect(rows[0].mute_unmutereason).to.be.null
            expect(rows[0].mute_unmutestaff).to.be.null

            done()
          })
        })
      })
    })
    describe('with invalid end date', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/sanction/bans')
        .send({type: 'user', server: '(global)', reason: 'Ma raison', user: {username: 'Tests'}, end_date: 'invalid'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Invalid ban\'s `end_date`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with valid end date', function () {
      it('should return 200 code', function (done) {
        chai.request(app).post('/sanction/mutes')
        .send({
          type: 'user',
          server: '(global)',
          reason: 'Ma raison de mute',
          user: {
            uuid: '00009d4c8de84d2b877d759ef23df030'
          },
          end_date: '2020-01-01 00:00:00'
        })
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal('Mute has been successfuly added!')
          expect(res).to.have.status(200)

          // check in db
          connection.query('SELECT * FROM `ObsiFight_Admin`.`BAT_mute` WHERE mute_id=5', function (err, rows, fields) {
            if (err) {
              console.error(err)
              return process.exit()
            }

            expect(rows).to.be.not.undefined
            expect(rows).to.be.object
            expect(rows.length).to.be.equal(1)
            expect(rows[0]).to.be.object
            expect(rows[0].mute_id).to.be.equal(5)
            expect(rows[0].UUID).to.be.equal('00009d4c8de84d2b877d759ef23df030')
            expect(rows[0].mute_ip).to.be.null
            expect(rows[0].mute_reason).to.be.equal('Ma raison de mute')
            expect(rows[0].mute_server).to.be.equal('(global)')
            expect((new Date(rows[0].mute_begin)).getTime()).to.be.closeTo((new Date()).getTime(), 2000) // 2 seconds
            expect((new Date(rows[0].mute_end)).getTime()).to.be.equal((new Date('2020-01-01 00:00:00')).getTime())
            expect(rows[0].mute_staff).to.be.equal('ApiTest')
            expect(rows[0].mute_state).to.be.equal(1)
            expect(rows[0].mute_unmutedate).to.be.null
            expect(rows[0].mute_unmutereason).to.be.null
            expect(rows[0].mute_unmutestaff).to.be.null

            done()
          })
        })
      })
    })
  })

  describe('PUT /sanction/mutes/id', function () {
    describe('without id', function () {
      it('should return 404 code', function (done) {
        chai.request(app).put('/sanction/mutes')
        .send({})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Method not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with invalid id', function () {
      it('should return 400 code', function (done) {
        chai.request(app).put('/sanction/mutes/invalid')
        .send({})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing mute\'s id or invalid id.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('without reason and without end_date', function () {
      it('should return 400 code', function (done) {
        chai.request(app).put('/sanction/mutes/2')
        .send({})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing mute\'s `end_date` or `remove_reason`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with invalid end_date', function () {
      it('should return 400 code', function (done) {
        chai.request(app).put('/sanction/mutes/2')
        .send({end_date: 'invalid'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Invalid mute\'s `end_date`.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with end_date inferior at now', function () {
      it('should return 400 code', function (done) {
        chai.request(app).put('/sanction/mutes/2')
        .send({end_date: '2015-01-01 00:00:00'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Invalid mute\'s `end_date`. You\'ve try to set `end_date` inferior or equal of now.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with unknown id', function () {
      it('should return 404 code', function (done) {
        chai.request(app).put('/sanction/mutes/20')
        .send({end_date: '2020-01-01 00:00:00'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Mute not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with ban already expired', function () {
      it('should return 404 code', function (done) {
        chai.request(app).put('/sanction/mutes/1')
        .send({end_date: '2020-01-01 00:00:00'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Mute already expired.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with end_date', function () {
      it('should return 200 code', function (done) {
        chai.request(app).put('/sanction/mutes/2')
        .send({end_date: '2020-01-01 00:00:00'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal('Mute has been successfuly edited!')
          expect(res).to.have.status(200)

          // check in db
          connection.query('SELECT * FROM `ObsiFight_Admin`.`BAT_mute` WHERE mute_id=2', function (err, rows, fields) {
            if (err) {
              console.error(err)
              return process.exit()
            }

            expect(rows).to.be.not.undefined
            expect(rows).to.be.object
            expect(rows.length).to.be.equal(1)
            expect(rows[0]).to.be.object
            expect(rows[0].mute_id).to.be.equal(2)
            expect(rows[0].UUID).to.be.equal('00009d4c8de84d2b877d759ef23df030')
            expect(rows[0].mute_reason).to.be.equal('Ma raison')
            expect(rows[0].mute_server).to.be.equal('(global)')
            expect((new Date(rows[0].mute_begin)).getTime()).to.be.equal((new Date('2016-03-08 03:56:45')).getTime())
            expect(rows[0].mute_staff).to.be.equal('Suertzz')
            expect((new Date(rows[0].mute_end)).getTime()).to.be.equal((new Date('2020-01-01 00:00:00')).getTime())
            expect(rows[0].mute_state).to.be.equal(1)
            expect(rows[0].mute_unmutedate).to.be.null
            expect(rows[0].mute_unmutestaff).to.be.null
            expect(rows[0].mute_unmutereason).to.be.null

            done()
          })
        })
      })
    })
    describe('with reason', function () {
      it('should return 200 code', function (done) {
        chai.request(app).put('/sanction/mutes/2')
        .send({remove_reason: 'Ma raison de démute'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.success).to.equal('Mute has been successfuly edited!')
          expect(res).to.have.status(200)

          // check in db
          connection.query('SELECT * FROM `ObsiFight_Admin`.`BAT_mute` WHERE mute_id=2', function (err, rows, fields) {
            if (err) {
              console.error(err)
              return process.exit()
            }

            expect(rows).to.be.not.undefined
            expect(rows).to.be.object
            expect(rows.length).to.be.equal(1)
            expect(rows[0]).to.be.object
            expect(rows[0].mute_id).to.be.equal(2)
            expect(rows[0].UUID).to.be.equal('00009d4c8de84d2b877d759ef23df030')
            expect(rows[0].mute_reason).to.be.equal('Ma raison')
            expect(rows[0].mute_server).to.be.equal('(global)')
            expect((new Date(rows[0].mute_begin)).getTime()).to.be.equal((new Date('2016-03-08 03:56:45')).getTime())
            expect(rows[0].mute_staff).to.be.equal('Suertzz')
            expect(rows[0].mute_end).to.be.null
            expect(rows[0].mute_state).to.be.equal(0)
            expect((new Date(rows[0].mute_unmutedate)).getTime()).to.be.closeTo((new Date()).getTime(), 2000) // 2 seconds
            expect(rows[0].mute_unmutestaff).to.be.equal('ApiTest')
            expect(rows[0].mute_unmutereason).to.be.equal('Ma raison de démute')

            done()
          })
        })
      })
    })
  })

  describe('GET /user/:username/sanctions', function () {
    describe('without username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user//sanctions')
        .send({})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Method not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with unknown username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user/unknown/sanctions')
        .send({})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('User not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('without limit', function () {
      it('should return 200 code + all sanctions', function (done) {
        chai.request(app).get('/user/Tests/sanctions')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.not.be.empty
          expect(res.body.data.bans).to.be.object
          expect(res.body.data.bans).to.not.be.empty
          expect(res.body.data.kicks).to.be.object
          expect(res.body.data.kicks).to.not.be.empty
          expect(res.body.data.mutes).to.be.object
          expect(res.body.data.mutes).to.not.be.empty

          // 4th ban
          expect(res.body.data.bans[0].id).to.be.equal(4)
          expect(res.body.data.bans[0].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[0].server).to.be.equal('(global)')
          expect(res.body.data.bans[0].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[0].user).to.be.object
          expect(res.body.data.bans[0].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[0].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[0].staff).to.be.object
          expect(res.body.data.bans[0].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[0].end_date).to.be.equal((new Date('2030-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[0].state).to.be.equal(1)
          expect(res.body.data.bans[0].duration).to.be.equal(441763200)
          expect(res.body.data.bans[0].remove_date).to.be.null
          expect(res.body.data.bans[0].remove_staff).to.be.null
          expect(res.body.data.bans[0].remove_reason).to.be.null

          // 3rd ban
          expect(res.body.data.bans[1].id).to.be.equal(3)
          expect(res.body.data.bans[1].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[1].server).to.be.equal('(global)')
          expect(res.body.data.bans[1].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[1].user).to.be.object
          expect(res.body.data.bans[1].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[1].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[1].staff).to.be.object
          expect(res.body.data.bans[1].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[1].end_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.bans[1].state).to.be.equal(0)
          expect(res.body.data.bans[1].duration).to.be.equal(12)
          expect(res.body.data.bans[1].remove_date).to.be.equal((new Date('2016-03-08 03:57:57')).toJSON())
          expect(res.body.data.bans[1].remove_staff).to.be.object
          expect(res.body.data.bans[1].remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[1].remove_reason).to.be.equal('Ma raison de déban')

          // 2nd ban
          expect(res.body.data.bans[2].id).to.be.equal(2)
          expect(res.body.data.bans[2].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[2].server).to.be.equal('(global)')
          expect(res.body.data.bans[2].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[0].user).to.be.object
          expect(res.body.data.bans[2].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[2].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[2].staff).to.be.object
          expect(res.body.data.bans[2].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[2].end_date).to.be.null
          expect(res.body.data.bans[2].state).to.be.equal(1)
          expect(res.body.data.bans[2].duration).to.be.equal('PERMANENT')
          expect(res.body.data.bans[2].remove_date).to.be.null
          expect(res.body.data.bans[2].remove_staff).to.be.null
          expect(res.body.data.bans[2].remove_reason).to.be.null

          // 1st ban
          expect(res.body.data.bans[3].id).to.be.equal(1)
          expect(res.body.data.bans[3].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[3].server).to.be.equal('(global)')
          expect(res.body.data.bans[3].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[3].user).to.be.object
          expect(res.body.data.bans[3].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[3].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[3].staff).to.be.object
          expect(res.body.data.bans[3].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[3].end_date).to.be.null
          expect(res.body.data.bans[3].state).to.be.equal(0)
          expect(res.body.data.bans[3].duration).to.be.equal('PERMANENT')
          expect(res.body.data.bans[3].remove_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.bans[3].remove_staff).to.be.object
          expect(res.body.data.bans[3].remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[3].remove_reason).to.be.equal('Ma raison de déban')

          // kick
          expect(res.body.data.kicks[0].id).to.be.equal(1)
          expect(res.body.data.kicks[0].reason).to.be.equal('raison du kick')
          expect(res.body.data.kicks[0].server).to.be.equal('(global)')
          expect(res.body.data.kicks[0].date).to.be.equal((new Date('2016-03-26 15:31:51')).toJSON())
          expect(res.body.data.kicks[0].user).to.be.object
          expect(res.body.data.kicks[0].user.username).to.be.equal('Tests')
          expect(res.body.data.kicks[0].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.kicks[0].staff).to.be.object
          expect(res.body.data.kicks[0].staff.username).to.be.equal('roumi1996')

          // 4th mute
          expect(res.body.data.mutes[0].id).to.be.equal(4)
          expect(res.body.data.mutes[0].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[0].server).to.be.equal('(global)')
          expect(res.body.data.mutes[0].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[0].user).to.be.object
          expect(res.body.data.mutes[0].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[0].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[0].staff).to.be.object
          expect(res.body.data.mutes[0].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[0].end_date).to.be.equal((new Date('2030-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[0].state).to.be.equal(1)
          expect(res.body.data.mutes[0].duration).to.be.equal(441763200)
          expect(res.body.data.mutes[0].remove_date).to.be.null
          expect(res.body.data.mutes[0].remove_staff).to.be.null
          expect(res.body.data.mutes[0].remove_reason).to.be.null

          // 3rd mute
          expect(res.body.data.mutes[1].id).to.be.equal(3)
          expect(res.body.data.mutes[1].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[1].server).to.be.equal('(global)')
          expect(res.body.data.mutes[1].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[1].user).to.be.object
          expect(res.body.data.mutes[1].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[1].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[1].staff).to.be.object
          expect(res.body.data.mutes[1].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[1].end_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.mutes[1].state).to.be.equal(0)
          expect(res.body.data.mutes[1].duration).to.be.equal(12)
          expect(res.body.data.mutes[1].remove_date).to.be.equal((new Date('2016-03-08 03:57:57')).toJSON())
          expect(res.body.data.mutes[1].remove_staff).to.be.object
          expect(res.body.data.mutes[1].remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[1].remove_reason).to.be.equal('Ma raison de déban')

          // 2nd mute
          expect(res.body.data.mutes[2].id).to.be.equal(2)
          expect(res.body.data.mutes[2].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[2].server).to.be.equal('(global)')
          expect(res.body.data.mutes[2].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[2].user).to.be.object
          expect(res.body.data.mutes[2].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[2].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[2].staff).to.be.object
          expect(res.body.data.mutes[2].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[2].end_date).to.be.null
          expect(res.body.data.mutes[2].state).to.be.equal(1)
          expect(res.body.data.mutes[2].duration).to.be.equal('PERMANENT')
          expect(res.body.data.mutes[2].remove_date).to.be.null
          expect(res.body.data.mutes[2].remove_staff).to.be.null
          expect(res.body.data.mutes[2].remove_reason).to.be.null

          // 1st mute
          expect(res.body.data.mutes[3].id).to.be.equal(1)
          expect(res.body.data.mutes[3].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[3].server).to.be.equal('(global)')
          expect(res.body.data.mutes[3].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[3].user).to.be.object
          expect(res.body.data.mutes[3].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[3].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[3].staff).to.be.object
          expect(res.body.data.mutes[3].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[3].end_date).to.be.null
          expect(res.body.data.mutes[3].state).to.be.equal(0)
          expect(res.body.data.mutes[3].duration).to.be.equal('PERMANENT')
          expect(res.body.data.mutes[3].remove_date).to.be.equal((new Date('2016-03-08 03:56:57')).toJSON())
          expect(res.body.data.mutes[3].remove_staff).to.be.object
          expect(res.body.data.mutes[3].remove_staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[3].remove_reason).to.be.equal('Ma raison de déban')

          done()
        })
      })
    })
    describe('with limit', function () {
      it('should return 200 code + 3 last sanctions', function (done) {
        chai.request(app).get('/user/Tests/sanctions?limit=3')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.not.be.empty
          expect(res.body.data.bans).to.be.object
          expect(res.body.data.bans).to.not.be.empty
          expect(res.body.data.kicks).to.be.object
          expect(res.body.data.kicks).to.not.be.empty
          expect(res.body.data.mutes).to.be.object
          expect(res.body.data.mutes).to.not.be.empty

          // 4th ban
          expect(res.body.data.bans[0].id).to.be.equal(4)
          expect(res.body.data.bans[0].reason).to.be.equal('Ma raison')
          expect(res.body.data.bans[0].server).to.be.equal('(global)')
          expect(res.body.data.bans[0].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[0].user).to.be.object
          expect(res.body.data.bans[0].user.username).to.be.equal('Tests')
          expect(res.body.data.bans[0].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.bans[0].staff).to.be.object
          expect(res.body.data.bans[0].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.bans[0].end_date).to.be.equal((new Date('2030-03-08 03:56:45')).toJSON())
          expect(res.body.data.bans[0].state).to.be.equal(1)
          expect(res.body.data.bans[0].duration).to.be.equal(441763200)
          expect(res.body.data.bans[0].remove_date).to.be.null
          expect(res.body.data.bans[0].remove_staff).to.be.null
          expect(res.body.data.bans[0].remove_reason).to.be.null

          // kick
          expect(res.body.data.kicks[0].id).to.be.equal(1)
          expect(res.body.data.kicks[0].reason).to.be.equal('raison du kick')
          expect(res.body.data.kicks[0].server).to.be.equal('(global)')
          expect(res.body.data.kicks[0].date).to.be.equal((new Date('2016-03-26 15:31:51')).toJSON())
          expect(res.body.data.kicks[0].user).to.be.object
          expect(res.body.data.kicks[0].user.username).to.be.equal('Tests')
          expect(res.body.data.kicks[0].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.kicks[0].staff).to.be.object
          expect(res.body.data.kicks[0].staff.username).to.be.equal('roumi1996')

          // 4th mute
          expect(res.body.data.mutes[0].id).to.be.equal(4)
          expect(res.body.data.mutes[0].reason).to.be.equal('Ma raison')
          expect(res.body.data.mutes[0].server).to.be.equal('(global)')
          expect(res.body.data.mutes[0].date).to.be.equal((new Date('2016-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[0].user).to.be.object
          expect(res.body.data.mutes[0].user.username).to.be.equal('Tests')
          expect(res.body.data.mutes[0].user.uuid).to.be.equal('00009d4c8de84d2b877d759ef23df030')
          expect(res.body.data.mutes[0].staff).to.be.object
          expect(res.body.data.mutes[0].staff.username).to.be.equal('Suertzz')
          expect(res.body.data.mutes[0].end_date).to.be.equal((new Date('2030-03-08 03:56:45')).toJSON())
          expect(res.body.data.mutes[0].state).to.be.equal(1)
          expect(res.body.data.mutes[0].duration).to.be.equal(441763200)
          expect(res.body.data.mutes[0].remove_date).to.be.null
          expect(res.body.data.mutes[0].remove_staff).to.be.null
          expect(res.body.data.mutes[0].remove_reason).to.be.null

          done()
        })
      })
    })
  })

  describe('GET /user/:username/sanctions/banned', function () {
    describe('without username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user//sanctions/banned')
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Method not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with unknown username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user/unknown/sanctions/banned')
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('User not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with valid username with no bans', function () {
      it('should return 200 code with banned:false', function (done) {
        chai.request(app).get('/user/White/sanctions/banned')
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.be.not.null
          expect(res.body.data.banned).to.be.equal(false)
          expect(res).to.have.status(200)
          done()
        })
      })
    })
    describe('with valid username with ban', function () {
      it('should return 200 code with banned:true', function (done) {
        chai.request(app).get('/user/Tests/sanctions/banned')
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.be.not.null
          expect(res.body.data.banned).to.be.equal(true)
          expect(res).to.have.status(200)
          done()
        })
      })
    })
  })

  describe('GET /user/:username/sanctions/muted', function () {
    describe('without username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user//sanctions/muted')
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Method not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with unknown username', function () {
      it('should return 404 code', function (done) {
        chai.request(app).get('/user/unknown/sanctions/muted')
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('User not found.')
          expect(res).to.have.status(404)
          done()
        })
      })
    })
    describe('with valid username with no mutes', function () {
      it('should return 200 code with muted:false', function (done) {
        chai.request(app).get('/user/White/sanctions/muted')
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.be.not.null
          expect(res.body.data.muted).to.be.equal(false)
          expect(res).to.have.status(200)
          done()
        })
      })
    })
    describe('with valid username with mute', function () {
      it('should return 200 code with muted:true', function (done) {
        chai.request(app).get('/user/Tests/sanctions/muted')
        .end(function (err, res) {
          expect(res.body.status).to.equal(true)
          expect(res.body.data).to.be.object
          expect(res.body.data).to.be.not.null
          expect(res.body.data.muted).to.be.equal(true)
          expect(res).to.have.status(200)
          done()
        })
      })
    })
  })
})
