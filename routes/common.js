const express = require('express')
const router = express.Router()

const QUERY = require('../utils/query')
const ENCRYPT = require('../utils/encrypt')
const JWT = require('../utils/jwt')
const checkLogin = require('../middleware/checkLogin')

router.use(function (req, res, next) {
  if ((req.url == "/register" || req.url == "/login")) {
    if (!req.body.username || !req.body.password) {
      return res.status(403).json({
        retinfo: "签名错误",
        retcode: "000001"
      })
    }
  }
  next()
})

router.post("/register", async function (req, res, next) {
  try {
    var body = req.body

    var sql1 = `select * from userlist where username=? `
    var result1 = await QUERY(sql1, [body.username])

    if (result1.length > 0) {
      return res.status(403).json({
        retinfo: '不可用的用户名',
        retcode: "000001"
      })
    } else {
      var sql2 = `insert into userlist set ?`
      var result2 = await QUERY(sql2, [body])

      if (result2.affectedRows > 0) {
        var token = JWT.createToken({
          username: body.username
        })
        return res.status(200).json({
          token,
          retcode: "000000",
          retinfo: 'Succeeded'
        })
      } else {
        return res.status(400).json({
          retcode: "000001",
          retinfo: '注册失败'
        })
      }
    }
  } catch (err) {
    return res.status(500).send({
      retcode: "000001",
      retinfo: '注册失败'
    })
  }
})

router.post("/login", async function (req, res, next) {
  try {
    var body = req.body

    var sql1 = `select * from userlist where username=?`
    var result1 = await QUERY(sql1, [body.username])

    if (result1.length == 1) {
      var sql2 = `select * from userlist where username=? and password=?`
      var result2 = await QUERY(sql2, [body.username, body.password])
      if (result2.length == 1) {
        var token = JWT.createToken(JSON.stringify(result2[0].username))
        return res.status(200).json({
          data: {
            token
          },
          retcode: "000000",
          retinfo: 'Succeeded'
        })
      } else {
        return res.status(422).json({
          retinfo: "错误的用户名或密码",
          retcode: "000001"
        })
      }
    } else {
      return res.status(404).send({
        retinfo: "未注册的用户名",
        retcode: "000001"
      })
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send({
      retcode: "000001",
      retinfo: 'SQL查询失败'
    })
  }
})

router.get("/logout", checkLogin(), function (req, res, next) {

})


module.exports = router
