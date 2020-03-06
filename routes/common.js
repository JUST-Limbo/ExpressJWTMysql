const express = require('express')

const ENCRYPT = require('../utils/encrypt')
const checkLogin = require('../utils/checkLogin')

const QUERY = require('../utils/query')

const router = express.Router()

router.use(function (req, res, next) {
  if ((req.url == "/register" || req.url == "/login")) {
    if (!req.body.username || !req.body.password) {
      return next({
        retcode: "000001",
        retinfo: "Params error"
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
      return res.status(200).json({
        retcode: "000001",
        retinfo: 'Username already exist'
      })
    } else {
      var sql2 = `insert into userlist set ?`
      var result2 = await QUERY(sql2, [body])
      if (result2.affectedRows > 0) {
        return res.status(200).json({
          retcode: "000000",
          retinfo: 'Succeeded'
        })
      } else {
        return res.status(200).json({
          retcode: "000001",
          retinfo: 'Register failed'
        })
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      retcode: "000001",
      retinfo: 'SQL Failed'
    })
  }
})

router.post("/login", async function (req, res, next) {
  try {
    var body = req.body
    var sql1 = `select * from userlist where username=? and 
  password=?`
    var result1 = await QUERY(sql1, [body.username, body.password])
    if (result1.length == 1) {
      req.session.user = JSON.stringify(result1[0])
      return res.status(200).json({
        retcode: "000000",
        retinfo: 'Succeeded',
        data: {
          username: result1[0].username
        }
      })
    } else {
      return res.status(200).json({
        retcode: "000001",
        retinfo: "Incorrect username or password."
      })
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      retcode: "00000",
      retinfo: 'SQL Failed'
    })
  }
})

router.get("/logout", checkLogin, function (req, res, next) {
  delete req.session.user
  return res.status(200).json({
    retcode: "000000",
    retinfo: 'Succeeded'
  })
})


module.exports = router
