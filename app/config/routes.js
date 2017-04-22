module.exports = {

  'post /authenticate': 'AuthController.generateToken',

  'get /user/:username': {'function': 'UserController.get', protected: true},
  'get /user/from/uuid/:uuid': {'function': 'UserController.getFromUUID', protected: true},
  'get /user/uuid/from/:username': {'function': 'UserController.getUUIDFromUsername', protected: true},
  'post /user/authenticate': {'function': 'UserController.authenticate', protected: true},
  'get /user/:username/sanctions': {'function': 'SanctionController.getUserSanctions', protected: true},
  'get /user/:username/sanctions/banned': {'function': 'SanctionController.isUserBanned', protected: true},
  'get /user/:username/sanctions/muted': {'function': 'SanctionController.isUserMuted', protected: true},
  'get /user/:username/money/timeline': {'function': 'UserController.getMoneyTimeline', protected: true},
  'get /user/:username/vote/can': 'UserController.canVote',
  'get /users/staff/:premium?': 'UserController.getStaff',
  'get /user/:username/stats': {'function': 'UserController.getStats', protected: true},

  'post /user/find': {'function': 'UserController.findUsers', protected: true},
  'post /user/infos/username': {'function': 'UserController.getUsersInfos', protected: true},
  'get /user/compare/:username1/:username2': {'function': 'UserController.compareUsers', protected: true},

  'get /sanction/bans': {'function': 'SanctionController.getBans', protected: true},
  'get /sanction/bans/:id': {'function': 'SanctionController.getBan', protected: true},
  'post /sanction/bans': {'function': 'SanctionController.addBan', protected: true},
  'put /sanction/bans/:id': {'function': 'SanctionController.editBan', protected: true},
  'get /sanction/mutes': {'function': 'SanctionController.getMutes', protected: true},
  'get /sanction/mutes/:id': {'function': 'SanctionController.getMute', protected: true},
  'post /sanction/mutes': {'function': 'SanctionController.addMute', protected: true},
  'put /sanction/mutes/:id': {'function': 'SanctionController.editMute', protected: true},

  'get /socials/twitter/authorization/request': {'function': 'Socials/TwitterController.requestAuthorization', protected: false},
  'get /socials/twitter/authorization/response': {'function': 'Socials/TwitterController.requestResponse', protected: false}
}
