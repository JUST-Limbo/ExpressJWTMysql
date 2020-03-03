var entranceLog= require('../utils/entrance')


module.exports=function(app){
  app.use(entranceLog)
  app.use("/common",require('./common'))
}
