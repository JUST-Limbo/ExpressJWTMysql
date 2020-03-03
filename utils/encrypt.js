const md5 = require('md5')

module.exports= function ENCRYPT(string){
  return md5(md5(string)+"jiami")
}
