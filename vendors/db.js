var mysql = require('mysql')

module.exports = {

  connections: {},
  config: {},

  setConfig: function (config) {
    this.config = config
    return this
  },

  get: function (connectionName) {
    if (this.connections[connectionName] === undefined) {
      try {
        this.connections[connectionName] = mysql.createPool({
          host: this.config[connectionName].host,
          user: this.config[connectionName].user,
          password: this.config[connectionName].password,
          database: this.config[connectionName].dbname,
          connectionLimit : 10
        })
      } catch (e) {
        console.error('MySQL error (Connection: ' + connectionName + ') :', e)
      }
    }
    return this.connections[connectionName]
  }

}
