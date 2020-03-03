module.exports = function (req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({
      retcode: "000002",
      retinfo: "未登录"
    })
  } else {
    next()
  }
}
