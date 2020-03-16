const jwt = require('jsonwebtoken')

const secret = "2131231"

function createToken(payload) {
  payload.ctime = Date.now()
  // 过期
  // payload.exp=1000*60*24
  return jwt.sign(payload, secret)
}

function checkToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      if (err) { reject('token校验失败') }
      resolve(data)
    })
  })
}

module.exports = {
  createToken, checkToken
}
