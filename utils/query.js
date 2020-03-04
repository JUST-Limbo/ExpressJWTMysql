const pool = require('../config/database.config')
module.exports = function (sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, result) => {
      if (err) return reject(err)
      else return resolve(result)
    })
  })
}
