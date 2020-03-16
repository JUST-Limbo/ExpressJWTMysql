const JWT = require('../utils/jwt')

module.exports = (options) => {
  return async function (req, res, next) {
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({
          retinfo: "token required",
          retcode: "000001"
        })
      }
      req.user = await JWT.checkToken(token)
      await next()
    } catch (error) {
      next(error)
    }
  }
}
