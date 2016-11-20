module.exports = {

  get: function (req, res) {
    if (req.params.username === undefined)
      return res.status(400).json({status: false, error: 'Missing user\'s name.'})

    // Find user
    User.getIds(req.params.username, function (err, ids) {
      if (err || ids.web === 0) return res.status(404).json({status: false, error: 'User not found.'})

      res.json({
        status: true,
        data: {
          ids: ids,
          uuid: '',
          registerDate: '',
          lastConnection: {
            ip: '',
            mac: '',
            date: ''
          },
          adresses: {
            mac: [],
            ip: []
          }
        }
      })
    })
  }

}
