module.exports = (options)=>{
  return function (req, res, next) {
    console.log("");
    console.log(req.method + " " + req.url+"   "+req.ip);
    if (req.method == "POST") console.log(JSON.stringify(req.body))
    else if (req.method == "GET") console.log(JSON.stringify(req.query));
    next()
  }
}
