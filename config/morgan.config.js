const path=require('path')
const fs=require('fs')
const FileStreamRotator = require('file-stream-rotator')

var logDir=path.resolve(__dirname,"../","log")
fs.existsSync(logDir) || fs.mkdirSync(logDir)

var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDir, 'req-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

module.exports={
  logDir,accessLogStream
}
