var entranceLog= require('../middleware/entrance')

module.exports=function(app){
  app.use(entranceLog())
}
