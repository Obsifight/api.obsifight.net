var init = require('../init.js')
var app = init.app
var chai = init.chai
var expect = chai.expect

// AuthController
describe('AuthController', function () {
  // hooks
  before('Create `obsiapiv6` database', function (next) { // add database
    connection.query(
      'CREATE DATABASE IF NOT EXISTS `obsiapiv6` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;' +
      'USE `obsiapiv6`;' +

      'CREATE TABLE IF NOT EXISTS `api_histories` (' +
      '  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,' +
      '  `user_id` int(11) NOT NULL,' +
      '  `action` varchar(255) NOT NULL,' +
      '  `body` text NOT NULL,' +
      '  `accessToken` varchar(255) NOT NULL DEFAULT \'\',' +
      '  `createdAt` datetime NOT NULL,' +
      '  PRIMARY KEY (`id`)' +
      ') ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;' +

      'CREATE TABLE IF NOT EXISTS `api_users` (' +
      '  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,' +
      '  `username` varchar(20) NOT NULL DEFAULT \'\',' +
      '  `password` varchar(50) NOT NULL DEFAULT \'\',' +
      '  `createdAt` datetime NOT NULL,' +
      '  `lastAccess` datetime DEFAULT NULL,' +
      '  PRIMARY KEY (`id`)' +
      ') ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;',
    function (err) {
      if (err) {
        console.error(err)
        process.exit()
      }
      next()
    })
  })
  beforeEach('Truncate `obsiapiv6` database\'s tables', function (next) { // truncate tables
    connection.query('TRUNCATE api_histories; TRUNCATE api_users;', next)
  })
  after('Drop `obsiapiv6` database', function (next) { // drop database
    connection.query('DROP DATABASE IF EXISTS `obsiapiv6`;', next)
  })
  // POST /authenticate - AuthController.generateToken()
  describe('POST /authenticate', function () {
    describe('without username and password set', function () {
      it('should return 400 code', function (done) {
        chai.request(app).post('/authenticate').end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Missing username or password.')
          expect(res).to.have.status(400)
          done()
        })
      })
    })
    describe('with invalid credentials', function () {
      it('should return 403 code', function (done) {
        chai.request(app).post('/authenticate')
        .send({username: 'false', password: 'false'})
        .end(function (err, res) {
          expect(res.body.status).to.equal(false)
          expect(res.body.error).to.equal('Invalid credentials.')
          expect(res).to.have.status(403)
          done()
        })
      })
    })
    describe('with valid credentials', function () {
      it('should return 200 code + token', function (done) {
        // add user
        connection.query("INSERT INTO `api_users` (`id`, `username`, `password`, `createdAt`, `lastAccess`) VALUES(1, 'true', 'true', '2016-12-08 21:23:00', NULL);", function (err) {
          expect(err).to.be.null

          // request
          chai.request(app).post('/authenticate')
          .send({username: 'true', password: 'true'})
          .end(function (err, res) {
            expect(res.body.status).to.equal(true)
            expect(res.body.data.token).to.be.a('string')
            expect(res).to.have.status(200)
            done()
          })
        })
      })
    })
  })
})
