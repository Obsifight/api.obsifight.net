module.exports = {

  get: function (req, res) {
    if (req.params.id === undefined)
      return res.status(400).json({status: false, error: 'Missing user id.'})

    // Find user
    User.getIds(req.params.id, function (err, ids) {
      if (err || ids.web === 0) return res.status(404).json({status: false, error: 'User not found.'})

      res.json({
        status: true,
        data: {
          ids: ids
        }
      })
    })
  }

}
