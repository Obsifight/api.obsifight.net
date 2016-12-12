var init = require('../init.js')
var app = init.app
var chai = init.chai
var expect = chai.expect
var async = require('async')

// SanctionController
describe('SanctionController', function () {
  describe('GET /sanction/bans', function () {
    describe('without limit', function () {
      it('should return 200 code with all bans')
    })
    describe('with limit', function () {
      it('should return 200 code with last bans')
    })
  })

  describe('GET /sanction/bans/:id', function () {
    describe('without id', function () {
      it('should return 404 code')
    })
    describe('with invalid id', function () {
      it('should return 400 code')
    })
    describe('with unknown id', function () {
      it('should return 404 code')
    })
    describe('with valid id', function () {
      it('should return 200 code + ban data')
    })
  })

  describe('POST /sanction/bans', function () {
    describe('without reason', function () {
      it('should return 400 code')
    })
    describe('without type', function () {
      it('should return 400 code')
    })
    describe('without server', function () {
      it('should return 400 code')
    })
    describe('without user params', function () {
      it('should return 400 code')
    })
    describe('with unknown uuid', function () {
      it('should return 404 code')
    })
    describe('with valid uuid', function () {
      it('should return 200 code')
    })
    describe('with unknown username', function () {
      it('should return 404 code')
    })
    describe('with valid username', function () {
      it('should return 200 code')
    })
    describe('with invalid end date', function () {
      it('should return 400 code')
    })
    describe('with with end date', function () {
      it('should return 400 code')
    })
  })

  describe('PUT /sanction/bans/id', function () {
    describe('without id', function () {
      it('should return 404 code')
    })
    describe('with invalid id', function () {
      it('should return 400 code')
    })
    describe('without reason and without end_date', function () {
      it('should return 400 code')
    })
    describe('with end_date inferior at now', function () {
      it('should return 400 code')
    })
    describe('with end_date equal at now', function () {
      it('should return 400 code')
    })
    describe('with unknown id', function () {
      it('should return 404 code')
    })
    describe('with ban already expired', function () {
      it('should return 404 code')
    })
    describe('with end_date', function () {
      it('should return 200 code')
    })
    describe('with reason', function () {
      it('should return 200 code')
    })
  })

  describe('GET /sanction/mutes', function () {
    describe('without limit', function () {
      it('should return 200 code with all bans')
    })
    describe('with limit', function () {
      it('should return 200 code with last bans')
    })
  })

  describe('GET /sanction/mutes/:id', function () {
    describe('without id', function () {
      it('should return 404 code')
    })
    describe('with invalid id', function () {
      it('should return 400 code')
    })
    describe('with unknown id', function () {
      it('should return 404 code')
    })
    describe('with valid id', function () {
      it('should return 200 code + mute data')
    })
  })

  describe('POST /sanction/mutes', function () {
    describe('without reason', function () {
      it('should return 400 code')
    })
    describe('without type', function () {
      it('should return 400 code')
    })
    describe('without server', function () {
      it('should return 400 code')
    })
    describe('without user params', function () {
      it('should return 400 code')
    })
    describe('with unknown uuid', function () {
      it('should return 404 code')
    })
    describe('with valid uuid', function () {
      it('should return 200 code')
    })
    describe('with unknown username', function () {
      it('should return 404 code')
    })
    describe('with valid username', function () {
      it('should return 200 code')
    })
    describe('with invalid end date', function () {
      it('should return 400 code')
    })
    describe('with with end date', function () {
      it('should return 400 code')
    })
  })

  describe('PUT /sanction/mutes/id', function () {
    describe('without id', function () {
      it('should return 404 code')
    })
    describe('with invalid id', function () {
      it('should return 400 code')
    })
    describe('without reason and without end_date', function () {
      it('should return 400 code')
    })
    describe('with end_date inferior at now', function () {
      it('should return 400 code')
    })
    describe('with end_date equal at now', function () {
      it('should return 400 code')
    })
    describe('with unknown id', function () {
      it('should return 404 code')
    })
    describe('with mute already expired', function () {
      it('should return 404 code')
    })
    describe('with end_date', function () {
      it('should return 200 code')
    })
    describe('with reason', function () {
      it('should return 200 code')
    })
  })

  describe('GET /user/:username/sanctions', function () {
    describe('without username', function () {
      it('should return 404 code')
    })
    describe('with unknown username', function () {
      it('should return 404 code')
    })
    describe('without limit', function () {
      it('should return 200 code + all sanctions')
    })
    describe('with limit', function () {
      it('should return 200 code + last sanctions')
    })
  })
})
