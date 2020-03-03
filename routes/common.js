const express = require('express')
const User = require('../models/user')

const ENCRYPT = require('../utils/encrypt')
const checkLogin = require('../utils/checkLogin')

const router = express.Router()

router.use(function (req, res, next) {
  if ((req.url == "/register" || req.url == "/login")) {
    if (!req.body.email || !req.body.password) {
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
  User.findOne({
    email: body.email
  }, function (err, data) {
    if (err) return next(err)

    if (data) return res.status(200).json({
      retcode: "000001",
      retinfo: 'Username already exist'
    })

    // body.password = ENCRYPT(body.password)
    new User(body).save(function (err, user) {
      if (err) {
        console.log(err.message);
        return next(err)
      }

      req.session.user = user
      res.status(200).json({
        retcode: "000000",
        retinfo: 'Succeeded',
        data: {
          email: user.email,
          nick_name: user.nick_name,
          created_name: user.created_name.toLocaleString(),
          last_modified_time: user.last_modified_time.toLocaleString(),
          avatar: user.avatar,
          gender: user.gender,
          status: user.status
        }
      })
    })
  })
})

router.post("/login", function (req, res, next) {
  var body = req.body

  User.findOne({
    email: body.email,
    password: body.password
    // password: ENCRYPT(body.password)
  }, function (err, user) {
    if (err) {
      console.log(err.message);
      return next(err)
    }
    if (!user) return res.status(200).json({
      retcode: "000001",
      retinfo: "Incorrect username or password."
    })

    req.session.user = user
    res.status(200).json({
      retcode: "000000",
      retinfo: 'Succeeded',
      data: {
        email: user.email,
        nick_name: user.nick_name,
        created_name: user.created_name.toLocaleString(),
        last_modified_time: user.last_modified_time.toLocaleString(),
        avatar: user.avatar,
        gender: user.gender,
        status: user.status
      }
    })
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
