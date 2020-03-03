const express = require('express')

const ENCRYPT = require('../utils/encrypt')
const checkLogin = require('../utils/checkLogin')

const _QUERY = require('../utils/query')

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

router.post("/register", function (req, res, next) {
  var body = req.body
  var sql1 = `select * from userlist where username=? `
  _QUERY(sql1, [body.username])
    .then((result) => {
      if (result.length > 0) {
        return res.status(200).json({
          retcode: "000001",
          retinfo: 'Username already exist'
        })
      } else {
        var sql2 = `insert into userlist set ?`
        return _QUERY(sql2, [body])
      }
    })
    .then((result) => {
      if (result.affectedRows > 0) {
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
    })
    .catch((err) => {
      return res.status(200).send({
        retcode: "000001",
        retinfo: 'SQL Failed'
      })
    })
})

router.post("/login", function (req, res, next) {
  var body = req.body
  pool.query(`select * from userlist where username=? and 
  password=?`, [body.username, body.password], (err, result) => {
    if (err) {
      return res.status(200).send({
        retcode: "00000",
        retinfo: 'SQL Failed'
      })
    };
    if (result.length == 1) {
      req.session.user = result[0].username
      res.status(200).json({
        retcode: "000000",
        retinfo: 'Succeeded',
        data: {
          username: result[0].username
        }
      })
    } else {
      res.status(200).json({
        retcode: "000001",
        retinfo: "Incorrect username or password."
      })
    }
  })
})

router.get("/logout", checkLogin, function (req, res, next) {
  delete req.session.user
  return res.status(200).json({
    retcode: "000000",
    retinfo: 'Succeeded'
  })
})


module.exports = router
