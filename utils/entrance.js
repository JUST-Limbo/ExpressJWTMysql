module.exports = function (req, res, next) {
  console.log("");
  console.log(req.method + " " + req.url+"   "+req.ip);
  if (req.method == "POST") console.log(JSON.stringify(req.body))
  else if (req.method == "GET") console.log(JSON.stringify(req.query));
  // if (req.method == "POST") console.table(req.body)
  // else if (req.method == "GET") console.table(req.query);
  next()
}
