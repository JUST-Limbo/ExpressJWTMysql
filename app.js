var createError = require('http-errors');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser')

// 自定义模块
var routes = require('./routes')
var { accessLogStream } = require('./config/morgan.config')



var app = express();

// 日志中间件配置
app.use(morgan('short', { stream: accessLogStream }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// 静态文件托管
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './node_modules')));

// 路由挂载
routes(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err)
});

module.exports = app;
