module.exports = {

  'post /authenticate': 'AuthController.generateToken',

  'get /user/:username': {'function': 'UserController.get', protected: true},
  'post /user/authenticate': {'function': 'UserController.authenticate', protected: true},
  'get /user/:username/sanctions': {'function': 'SanctionController.getUserSanctions', protected: true},
  'get /user/:username/vote/can': 'UserController.canVote',

  'get /sanction/bans': {'function': 'SanctionController.getBans', protected: true},
  'get /sanction/bans/:id': {'function': 'SanctionController.getBan', protected: true},
  'post /sanction/bans': {'function': 'SanctionController.addBan', protected: true},
  'put /sanction/bans/:id': {'function': 'SanctionController.editBan', protected: true}
}
