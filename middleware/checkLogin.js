const JWT = require('../utils/jwt')

module.exports = (options) => {
  return async function (req, res, next) {
    try {
      const token = req.headers['authorization']
      if (!token) {
        return res.status(401).json({
          retinfo: "请先登录",
          retcode: "000001"
        })
      }
      req.user = await JWT.checkToken(token)
      next()
    } catch (error) {
      next(error)
    }
  }
}
